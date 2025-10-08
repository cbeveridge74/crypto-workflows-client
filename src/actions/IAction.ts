// runtime/IAction.ts
import type { Node } from 'reactflow';
import type { NodeData } from '../slices/workflowSlice';

export interface IAction {
  type: string; // unique action identifier
  execute(node: Node<NodeData>): Promise<void>;
}