// runtime/IAction.ts
import type { Node } from 'reactflow';
import type { NodeData, WorkflowSlice } from '../slices/workflowSlice';

export interface IAction {
  type: string; // unique action identifier
  execute(node: Node<NodeData>, context: WorkflowSlice): Promise<void>;
}