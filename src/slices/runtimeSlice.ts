import { type StateCreator } from 'zustand';
import type { NodeData } from './workflowSlice';
import type { Edge, Node } from 'reactflow';
import { actionRegistry } from '../actions';

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
  
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await res.json();
        const price = data.bitcoin.usd;
        console.log('💰 BTC price:', price);
  
        // --- find trigger nodes whose conditions are met ---
        const triggerNodes = get().nodes.filter((n: Node<NodeData>) => n.type === 'triggerNode');
  
        triggerNodes.forEach((trigger: Node) => {
          if (trigger.data.type === 'price_above' && price > trigger.data.value) {
            console.log(`🚨 Trigger fired: BTC > ${trigger.data.value}`);
  
            // --- execute connected action nodes ---
            const actionNodes = get().edges
              .filter((e: Edge) => e.source === trigger.id)
              .map((e: Edge) => get().nodes.find((n: Node) => n.id === e.target))
              .filter(Boolean) as Node<NodeData>[];
  
            actionNodes.forEach(async (actionNode:Node<NodeData>) => {
              const handler = actionRegistry[actionNode.data.type];
              if (handler) {
                await handler.execute(actionNode, get()); // handler can now be async
              } else {
                console.warn(`⚠️ Unknown action type: ${actionNode.data.type}`);
              }
            });
          }
        });
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