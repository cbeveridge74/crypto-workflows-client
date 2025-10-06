import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import { useWorkflowStore } from './store';

const nodeTypes = { triggerNode: TriggerNode, actionNode: ActionNode };

export default function WorkflowEditor() {
  const { nodes, edges } = useWorkflowStore();

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
      <MiniMap
  nodeStrokeWidth={2}
  nodeColor={(node) => {
    if (node.type === 'triggerNode') return '#f87171'; // red-400
    if (node.type === 'actionNode') return '#34d399';  // green-400
    return '#d1d5db'; // gray-300
  }}
  maskColor="rgba(0,0,0,0.1)"
/>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}