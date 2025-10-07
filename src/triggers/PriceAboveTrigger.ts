// runtime/triggers/PriceAboveTrigger.ts
import type { ITrigger } from './ITrigger';
import type { NodeData } from '../slices/workflowSlice';
import type { Node } from 'reactflow';
import { useStore } from '../store/useStore';

export class PriceAboveTrigger implements ITrigger {
  type = 'price_above';

  check(node: Node<NodeData>): boolean {
    const price = useStore.getState().btcPrice ?? 0;
    return price > ( node.data.value as number);
  }
}