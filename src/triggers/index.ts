// runtime/triggers/index.ts
import type { ITrigger } from './ITrigger';

const triggerRegistry: Record<string, ITrigger> = {};

const modules = import.meta.glob('./*.ts');

export async function loadTriggers() {
  for (const [path, importer] of Object.entries(modules)) {
    try {
      const module = (await importer()) as Record<string, unknown>;
      Object.values(module).forEach((Exported) => {
        if (typeof Exported === 'function') {
          try {
            const instance = new (Exported as { new (): ITrigger })();
            if (instance.type && typeof instance.check === 'function') {
              triggerRegistry[instance.type] = instance;
            }
          } catch {}
        }
      });
    } catch (err) {
      console.error(`Failed to import trigger ${path}`, err);
    }
  }
}

export { triggerRegistry };