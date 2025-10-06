// slices/runtimeSlice.ts
import { type StateCreator } from 'zustand';

export interface RuntimeSlice {
  running: boolean;
  startWorkflow: () => void;
  stopWorkflow: () => void;
}

export const createRuntimeSlice: StateCreator<any, [], [], RuntimeSlice> = (set) => ({
  running: false,
  startWorkflow: () => set({ running: true }),
  stopWorkflow: () => set({ running: false }),
});