// runtime/actions/AlertAction.ts
import type { IAction } from './IAction';
import type { Node } from 'reactflow';
import type { NodeData, WorkflowSlice } from '../slices/workflowSlice';

export class AlertAction implements IAction {
  type = 'alert';

  constructor (){}

  async execute(node: Node<NodeData>, context: WorkflowSlice) {
    alert(`🚨 ACTION: ${node.data.value}`);
  }
}