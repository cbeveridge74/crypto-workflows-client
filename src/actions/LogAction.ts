// runtime/actions/LogAction.ts
import type { IAction } from './IAction';
import type { Node } from 'reactflow';
import type { NodeData, WorkflowSlice } from '../slices/workflowSlice';

export class LogAction implements IAction {
  type = 'log';

  async execute(node: Node<NodeData>, context: WorkflowSlice) {
    console.log(`🪵 ACTION: ${node.data.value}`);
  }
}