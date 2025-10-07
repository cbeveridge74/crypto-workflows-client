import type { Node } from 'reactflow';
import type { NodeData } from './runtimeSlice'; // or wherever NodeData lives

export type ActionHandler = (node: Node<NodeData>) => Promise<void> | void;

export const actionHandlers: Record<string, ActionHandler> = {
  log: async (node) => {
    console.log(`🪵 ACTION: ${node.data.value}`);
  },

  alert: async (node) => {
    alert(`🚨 ACTION: ${node.data.value}`);
  },

  // Example for future expansion:
  // buyBTC: async (node) => {
  //   await fetch('/api/buy', { method: 'POST', body: JSON.stringify(node.data) });
  // }
};