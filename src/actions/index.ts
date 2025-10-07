// runtime/actions/index.ts
import type { IAction } from './IAction';

const modules = import.meta.glob('./*.ts', { eager: true });

const allActions: IAction[] = [];

for (const path in modules) {
  const module = modules[path] as Record<string, unknown>;

  Object.values(module).forEach((Exported) => {
    // Type guard: ensure Exported is a constructor function
    if (typeof Exported === 'function') {
      try {
        const instance = new (Exported as { new (): IAction })();
        // Check it actually matches the IAction interface
        if (instance.type && typeof instance.execute === 'function') {
          allActions.push(instance);
        }
      } catch (err) {
        console.warn(`Skipping non-constructable export in ${path}:`, err);
      }
    }
  });
}

export const actionRegistry: Record<string, IAction> = Object.fromEntries(
  allActions.map((action) => [action.type, action])
);