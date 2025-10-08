import { useStore } from '@store/useStore';
import type { ITrigger } from '@triggers/ITrigger';

export class PriceAboveTrigger implements ITrigger {
  type = 'price_above';

  async check(node: any): Promise<boolean> {
    const price = useStore.getState().btcPrice ?? 0;
    return price > node.data.value;
  }
}