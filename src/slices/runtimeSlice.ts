import { type StateCreator } from 'zustand';

export interface RuntimeSlice {
  running: boolean;
  startWorkflow: () => void;
  stopWorkflow: () => void;
}

export const createRuntimeSlice: StateCreator<any, [], [], RuntimeSlice> = (set, get) => ({
  running: false,

  startWorkflow: () => {
    if (get().running) return;
    set({ running: true });
    console.log('▶️ Workflow started');

    const { nodes, edges } = get(); // get both from workflow slice
    const triggerNode = nodes.find((n: any) => n.type === 'triggerNode');
    if (!triggerNode) {
      console.warn('⚠️ No trigger node found.');
      set({ running: false });
      return;
    }

    const threshold = triggerNode.data?.value ?? 0;
    console.log(`📈 Monitoring BTC price > $${threshold}`);

    // --- Find connected Action node(s) ---
    const connectedEdges = edges.filter((e: any) => e.source === triggerNode.id);
    const connectedActionIds = connectedEdges.map((e: any) => e.target);
    const actionNodes = nodes.filter((n: any) =>
      connectedActionIds.includes(n.id)
    );

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await res.json();
        const price = data.bitcoin.usd;
        console.log('💰 BTC price:', price);

        if (price > threshold) {
          console.log(`🚨 Trigger fired: BTC > $${threshold}!`);

          // --- Execute connected action nodes ---
          actionNodes.forEach((action: any) => {
            if (action.type === 'actionNode') {
              const actionType = action.data.actionType || action.data.type; // fallback for legacy data
              const message = action.data.value || 'Action triggered';
            
              switch (actionType) {
                case 'log':
                  console.log(`🪵 ACTION: ${message}`);
                  break;
                case 'alert':
                  alert(`🚨 ACTION: ${message}`);
                  break;
                default:
                  console.warn(`⚠️ Unknown action type: ${actionType}`);
              }
            }
          });
        }
      } catch (err) {
        console.error('Error fetching Bitcoin price', err);
      }
    }, 10000);

    (get() as any)._intervalId = interval;
  },

  stopWorkflow: () => {
    const interval = (get() as any)._intervalId;
    if (interval) clearInterval(interval);
    set({ running: false });
    console.log('⏹️ Workflow stopped');
  },
});