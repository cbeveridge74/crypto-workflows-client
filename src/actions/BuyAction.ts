// runtime/actions/LogAction.ts
import type { IAction } from '@actions/IAction';


export class LogAction implements IAction {
  type = 'buy';

  constructor (){}

  async execute() {
    console.log(`🪵 ACTION: Buying the asset`);
  }
}