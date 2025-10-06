// slices/workflowSlice.ts
import { type Node, type Edge, applyNodeChanges, applyEdgeChanges, addEdge, type Connection } from 'reactflow';
import { type StateCreator } from 'zustand';

export interface WorkflowSlice {
  nodes: AppNode[];
  edges: Edge[];
  setNodes: (changes: any) => void;
  setEdges: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  updateNodeData: (id: string, data: Record<string, any>) => void;
}


interface NodeData {
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

export const createWorkflowSlice: StateCreator<any, [], [], WorkflowSlice> = (set, get) => ({
  nodes: triggerNodeData,
  edges: [],
  setNodes: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  setEdges: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => set({ edges: addEdge(connection, get().edges) }),
  updateNodeData: (id, data) =>
    set({
      nodes: get().nodes.map((node: AppNode) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }),
});