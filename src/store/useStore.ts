// store/useStore.ts
import { create } from 'zustand';
import { createWorkflowSlice, type WorkflowSlice } from '@slices/workflowSlice';
import { createUISlice, type UISlice } from '@slices/uiSlice';
import { createRuntimeSlice, type RuntimeSlice } from '@slices/runtimeSlice';

export type AppStore = WorkflowSlice & UISlice & RuntimeSlice;

export const useStore = create<AppStore>((...args) => ({
  ...createWorkflowSlice(...args),
  ...createUISlice(...args),
  ...createRuntimeSlice(...args),
}));