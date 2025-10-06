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
    if (get().running) return; // prevent double-starts
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

        // --- Example trigger condition ---
        if (price > 125300) {
          console.log('🚨 Trigger fired: BTC > $60k!');
          // Here you could later call an Action node
        }
      } catch (err) {
        console.error('Error fetching Bitcoin price', err);
      }
    }, 10000); // every 10s

    // store interval ID so we can stop later
    (get() as any)._intervalId = interval;
  },

  stopWorkflow: () => {
    const interval = (get() as any)._intervalId;
    if (interval) {
      clearInterval(interval);
      console.log('⏹️ Workflow stopped');
    }
    set({ running: false });
  },
});