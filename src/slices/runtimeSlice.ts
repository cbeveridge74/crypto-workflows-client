import { type StateCreator } from 'zustand';
import { actionRegistry, loadActions } from '../actions';
import { loadTriggers, triggerRegistry } from '../triggers';
import type { Edge, Node } from 'reactflow';
import type { NodeData } from './workflowSlice';

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
  startWorkflow: async () => {
    if (get().running) return;
    set({ running: true });
  
    await loadTriggers();
    await loadActions();

    console.log('▶️ Workflow started');
  
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await res.json();
        const price = data.bitcoin.usd;
    
        // store centrally
        get().setBtcPrice(price);
    
        console.log('💰 BTC price:', price);
        const context = get(); // pass workflow state to triggers/actions
    
        // check triggers
        const triggers = context.nodes.filter((n:Node<NodeData>) => n.type!.endsWith('Node'));
        for (const triggerNode of triggers) {
          const trigger = triggerRegistry[triggerNode.data.type];
          if (trigger && (await trigger.check(triggerNode, context))) {
            console.log(`🚨 Trigger fired: ${triggerNode.data.type}`);
    
            // execute connected action nodes
            const actionNodes = context.edges
              .filter((e: Edge) => e.source === triggerNode.id)
              .map((e: Edge) => context.nodes.find((n:Node<NodeData>) => n.id === e.target))
              .filter(Boolean) as Node<NodeData>[];
    
            for (const actionNode of actionNodes) {
              const handler =
                actionRegistry[actionNode.data.type];
              if (handler) await handler.execute(actionNode, context);
            }
          }
        }
      } catch(err){
        console.error('Error fetching BTC price', err);
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
  setBtcPrice: (price) => set({ btcPrice: price }),
});