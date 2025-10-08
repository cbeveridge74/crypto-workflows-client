# 🧠 Crypto Workflow Designer

A modular, extensible **workflow automation builder** built with **React**, **Zustand**, **React Flow**, and **Vite**.  
This app demonstrates how to create a visual trigger–action workflow system (like _n8n_ or _Zapier_) for crypto-related tasks such as monitoring Bitcoin prices and performing actions when conditions are met.

---

## 🚀 Features

- **Visual Workflow Editor** using [React Flow](https://reactflow.dev)
  - Drag and connect Trigger and Action nodes
  - Live minimap and controls
- **Modular Architecture** with [Zustand](https://zustand-demo.pmnd.rs/)
  - Separate state slices for workflow, UI, and runtime logic
  - Decoupled trigger/action execution
- **Dynamic Action and Trigger Registration**
  - Actions and triggers auto-registered via Vite’s `import.meta.glob`
  - Easily extendable with new modules — no central registry updates needed
- **Runtime Engine**
  - Executes connected workflows
  - Supports async triggers (e.g. BTC price monitoring)
  - Modular `ITrigger` and `IAction` classes for extensibility
- **TypeScript-first** with strict typing and reusable interfaces
- **Tailwind CSS** integration for lightweight styling

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React 18 + Vite |
| State Management | Zustand |
| Visualization | React Flow |
| Styling | Tailwind CSS |
| Language | TypeScript |

---

## 🧩 Example Flow

- **Trigger:** “BTC price above $50,000”  
- **Action:** “Alert user”

When the workflow runs:
1. The `PriceAboveTrigger` periodically fetches Bitcoin’s price.
2. Once the price exceeds the defined threshold, it fires an event.
3. Connected Action nodes execute via the `actionRegistry` (e.g., console log or alert).

---

## 🧠 Architecture Overview

- **Zustand Slices:**  
  - `workflowSlice` manages the graph structure and node data.
  - `runtimeSlice` runs triggers and executes actions.
- **Trigger/Action Registry:**  
  - Each `ITrigger` and `IAction` implements its own `type` and `execute` method.
  - `import.meta.glob` dynamically loads all implementations from `/runtime/triggers` and `/runtime/actions`.

This pattern makes it easy to add new automations — just drop in a new class, and it’s registered automatically.

---

## 🧪 Development

### 1️⃣ Install dependencies
```bash
npm install
npm run dev
http://localhost:5173

```
### Add an Action

Create a new file in src/runtime/actions/:
```
// MyCustomAction.ts
import type { IAction } from './IAction';

export class MyCustomAction implements IAction {
  type = 'myCustom';
  async execute(node) {
    alert(`🔥 Custom action: ${node.data.value}`);
  }
}
```
The system auto-registers it via import.meta.glob.

### Add a Trigger

Create a new file in src/runtime/triggers/:
```
// MyTrigger.ts
import type { ITrigger } from './ITrigger';

export class MyTrigger implements ITrigger {
  type = 'myTrigger';
  async checkCondition(node, context) {
    return Math.random() > 0.5;
  }
}
```


## 🧭 Roadmap

- Add persistent workflow storage (localStorage or backend API) 
- Add draggable/resizable custom node types 
- Implement multiple trigger types (timers, webhooks, etc.) 
- Add “Test Action” and “Run Once” features 
- Export/import workflow definitions as JSON 


## 📜 License

MIT © 2025
