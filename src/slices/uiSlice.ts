// slices/uiSlice.ts
import { type StateCreator } from 'zustand';

export interface UISlice {
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

export const createUISlice: StateCreator<any, [], [], UISlice> = (set) => ({
  selectedNodeId: null,
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
});