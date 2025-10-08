// runtime/actions/AlertAction.ts
import type { IAction } from '@actions/IAction';
import type { Node } from 'reactflow';
import type { NodeData } from '@slices/workflowSlice';

export class AlertAction implements IAction {
  type = 'alert';

  constructor (){}

  async execute(node: Node<NodeData>) {
    alert(`🚨 ACTION: ${node.data.value}`);
  }
}