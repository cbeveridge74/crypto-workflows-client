// runtime/actions/LogAction.ts
import type { IAction } from '@actions/IAction';
import type { Node } from 'reactflow';
import type { NodeData } from '@slices/workflowSlice';

export class LogAction implements IAction {
  type = 'log';

  constructor (){}

  async execute(node: Node<NodeData>) {
    console.log(`🪵 ACTION: ${node.data.value}`);
  }
}