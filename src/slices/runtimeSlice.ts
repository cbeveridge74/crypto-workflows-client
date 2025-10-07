// slices/runtimeSlice.ts
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

    const { nodes } = get(); // <-- get all nodes from workflow slice
    const triggerNode = nodes.find((n: any) => n.type === 'triggerNode');

    if (!triggerNode) {
      console.warn('⚠️ No trigger node found, aborting workflow.');
      set({ running: false });
      return;
    }

    const threshold = triggerNode.data?.value ?? 0;
    console.log(`📈 Monitoring BTC price > $${threshold}`);

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
          // In future: look up connected Action node and execute it
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