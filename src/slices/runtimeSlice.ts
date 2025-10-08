import { type StateCreator } from 'zustand';
import { actionRegistry } from '@actions/index';
import { triggerRegistry } from '@triggers/index';

export interface RuntimeSlice {
  running: boolean;
  btcPrice?: number;
  startWorkflow: () => void;
  stopWorkflow: () => void;
  setBtcPrice: (price: number) => void;
}

export const createRuntimeSlice: StateCreator<any, [], [], RuntimeSlice> = (set, get) => ({
  running: false,
  btcPrice: undefined,

  setBtcPrice: (price) => set({ btcPrice: price }),

  startWorkflow: () => {
    set({ running: true });

    const run = async () => {
      if (!get().running) return;

      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await res.json();
        const price = data.bitcoin.usd;
        get().setBtcPrice(price);
        console.log('💰 BTC price:', price);

        // get triggers from workflow state
        const { nodes, edges } = get();
        const triggerNodes = nodes.filter((n: any) => n.type === 'triggerNode');
        const actionNodes = nodes.filter((n: any) => n.type === 'actionNode');

        for (const triggerNode of triggerNodes) {
          const trigger = triggerRegistry[triggerNode.data.type];
          if (trigger && (await trigger.check(triggerNode))) {
            console.log(`⚡ Trigger fired: ${triggerNode.data.type}`);

            // find connected action nodes
            const connectedEdges = edges.filter((e: any) => e.source === triggerNode.id);
            for (const edge of connectedEdges) {
              const action = actionNodes.find((n: any) => n.id === edge.target);
              if (action) {
                const handler = actionRegistry[action.data.type];
                if (handler) {
                  await handler.execute(action);
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('Error in workflow loop', err);
      }

      // re-run every 10s
      if (get().running) setTimeout(run, 10000);
    };

    run();
  },

  stopWorkflow: () => set({ running: false }),
});