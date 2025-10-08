import type { IAction } from './IAction';

// Automatically import all classes that end with "Action"
const modules = import.meta.glob('./*Action.ts', { eager: true }) as Record<
  string,
  { [key: string]: new () => IAction }
>;

const allActions: IAction[] = [];

for (const path in modules) {
  const exported = modules[path];
  for (const key in exported) {
    const maybeAction = exported[key];
    if (typeof maybeAction === 'function') {
      const instance = new maybeAction();
      if ('type' in instance && 'execute' in instance) {
        allActions.push(instance);
      }
    }
  }
}

export const actionRegistry: Record<string, IAction> = Object.fromEntries(
  allActions.map((a) => [a.type, a])
);