import { useWorkflowStore } from './store';

export default function RunButton() {
  const { nodes, edges } = useWorkflowStore();

  const runWorkflow = async () => {
    const workflow = { nodes, edges };
    console.log('Workflow definition:', workflow);
    // later: POST to backend at /api/run-workflow
  };

  return (
    <button
      onClick={runWorkflow}
      className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700"
    >
      Run Workflow
    </button>
  );
}