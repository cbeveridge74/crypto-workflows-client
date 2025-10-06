import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import { useWorkflowStore } from './store';

const nodeTypes = { triggerNode: TriggerNode, actionNode: ActionNode };

export default function WorkflowEditor() {
  const { nodes, edges, setNodes, setEdges, onConnect } = useWorkflowStore();

  return (
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
  );
}