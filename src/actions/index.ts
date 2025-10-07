// runtime/actions/index.ts
import { LogAction } from './LogAction';
import { AlertAction } from './AlertAction';
import type { IAction } from './IAction';

const allActions: IAction[] = [new LogAction(), new AlertAction()];

export const actionRegistry: Record<string, IAction> = Object.fromEntries(
  allActions.map((action) => [action.type, action])
);