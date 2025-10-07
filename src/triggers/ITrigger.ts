// runtime/ITrigger.ts
import type { Node } from 'reactflow';
import type { NodeData, WorkflowSlice } from '../slices/workflowSlice';

export interface ITrigger {
  type: string; // unique trigger identifier
  check(node: Node<NodeData>, context: WorkflowSlice): Promise<boolean> | boolean;
}