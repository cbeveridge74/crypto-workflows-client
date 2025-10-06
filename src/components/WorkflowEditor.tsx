import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
//import { useWorkflowStore } from './store';
import { useStore } from '../store/useStore';

const nodeTypes = { triggerNode: TriggerNode, actionNode: ActionNode };

export default function WorkflowEditor() {
  const { nodes, edges, setNodes, setEdges, onConnect } = useStore();
  const { running, startWorkflow, stopWorkflow } = useStore();

  return (
    <>
      <button
          onClick={() => (running ? stopWorkflow() : startWorkflow())}
          className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            pointerEvents: "all", // 👈 this restores clickability
          }}
        >
          {running ? 'Stop' : 'Run'}
        </button>
      
      <div className="w-full h-screen">
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={setNodes}
          onEdgesChange={setEdges}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap
            nodeColor={(node) =>
              node.type === 'triggerNode' ? '#f87171' : node.type === 'actionNode' ? '#34d399' : '#d1d5db'
            }
          />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
}