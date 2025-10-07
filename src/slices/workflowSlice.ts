import {
  type Node,
  type Edge,
  type Connection,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@reactflow/core';
import { type StateCreator } from 'zustand';

// The data each node carries
export interface NodeData {
  type: string;
  value: string | number;
}

// Define workflow slice using React Flow’s own Node type
export interface WorkflowSlice {
  nodes: Node<NodeData>[];
  edges: Edge[];
  setNodes: (changes: any) => void;
  setEdges: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
}

// ✅ Use React Flow’s Node<NodeData> directly
export const initialNodes: Node<NodeData>[] = [
  {
    id: '1',
    type: 'triggerNode',
    position: { x: 100, y: 100 },
    data: { type: 'price_above', value: 50000 },
  },
  {
    id: '2',
    type: 'actionNode',
    position: { x: 400, y: 100 },
    data: { type: 'alert', value: 'BTC above $50k' },
  },
];

// Slice implementation stays exactly the same
export const createWorkflowSlice: StateCreator<any, [], [], WorkflowSlice> = (set, get) => ({
  nodes: initialNodes,
  edges: [{ id: 'e1-2', source: '1', target: '2' }],
  setNodes: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  setEdges: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => set({ edges: addEdge(connection, get().edges) }),
  updateNodeData: (id, data) =>
    set({
      nodes: get().nodes.map((node: Node<NodeData>) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }),
});