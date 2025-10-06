import { create } from 'zustand';
import { type Edge, type Node } from 'reactflow';

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
}

// store.ts
export const useWorkflowStore = create<WorkflowState>((set) => ({
    nodes: [
      {
        id: '1',
        type: 'triggerNode',
        position: { x: 100, y: 100 },
        data: { triggerType: 'price_above', value: 50000 },
      },
      {
        id: '2',
        type: 'actionNode',
        position: { x: 400, y: 100 },
        data: { actionType: 'log', message: 'BTC > £50k' },
      },
    ],
    edges: [{ id: 'e1-2', source: '1', target: '2' }],
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
  }));