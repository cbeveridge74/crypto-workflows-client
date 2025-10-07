import type { ITrigger } from './ITrigger';
import type { NodeData, WorkflowSlice } from '../slices/workflowSlice';
import type { Node } from 'reactflow';
import { useStore } from '../store/useStore';

export class PriceBelowTrigger implements ITrigger {
  type = 'price_below';

  check(node: Node<NodeData>, context: WorkflowSlice): boolean {
    const price = useStore.getState().btcPrice ?? 0;
    return price < ( node.data.value as number);
  }
}