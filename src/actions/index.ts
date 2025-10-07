// runtime/actions/index.ts
import type { IAction } from './IAction';

const actionRegistry: Record<string, IAction> = {};

// Use dynamic imports (not eager) for async loading
const modules = import.meta.glob('./*.ts');

export async function loadActions() {
  const entries = Object.entries(modules);

  for (const [path, importer] of entries) {
    try {
      const module = (await importer()) as Record<string, unknown>;

      Object.values(module).forEach((Exported) => {
        // Only handle constructable classes
        if (typeof Exported === 'function') {
          try {
            const instance = new (Exported as { new (): IAction })();
            if (instance.type && typeof instance.execute === 'function') {
              actionRegistry[instance.type] = instance;
            }
          } catch (err) {
            console.warn(`Skipping non-constructable export in ${path}:`, err);
          }
        }
      });
    } catch (err) {
      console.error(`Failed to import ${path}:`, err);
    }
  }
}

export { actionRegistry };