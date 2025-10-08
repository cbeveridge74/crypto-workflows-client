import type { ITrigger } from './ITrigger';

// Automatically import all classes that end with "Trigger"
const modules = import.meta.glob('./*Trigger.ts', { eager: true }) as Record<
  string,
  { [key: string]: new () => ITrigger }
>;

const allTriggers: ITrigger[] = [];

for (const path in modules) {
  const exported = modules[path];
  for (const key in exported) {
    const maybeTrigger = exported[key];
    if (typeof maybeTrigger === 'function') {
      const instance = new maybeTrigger();
      if ('type' in instance && 'check' in instance) {
        allTriggers.push(instance);
      }
    }
  }
}

export const triggerRegistry: Record<string, ITrigger> = Object.fromEntries(
  allTriggers.map((t) => [t.type, t])
);