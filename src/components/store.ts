import { create } from 'zustand';
import { type Node, type Edge, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (changes: any) => void;
  setEdges: (changes: any) => void;
  onConnect: (connection: any) => void;
  updateNodeData: (id: string, data: Record<string, any>) => void;
}

export interface NodeData {
  type: string;
  value: number | string;
}

interface Coordinates {
  x: number;
  y: number;
}

interface AppNode extends Node<NodeData> {
  id: string;
  type: string;
  position: Coordinates;
  data: NodeData;
}

const triggerNodeData : AppNode[] = [
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
    data: { type: 'log', value: 'BTC above £50k' },
  }
];

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: triggerNodeData,
  edges: [{ id: 'e1-2', source: '1', target: '2' }],
  setNodes: (changes) => set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),
  setEdges: (changes) => set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),
  onConnect: (connection) => set((state) => ({ edges: addEdge(connection, state.edges) })),
  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    })),
}));