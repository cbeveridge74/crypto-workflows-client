import { Handle, Position, type NodeProps } from 'reactflow';
import { useStore } from '../../store/useStore';

export default function ActionNode({ id, data } : NodeProps) {
  const updateNodeData = useStore((s) => s.updateNodeData);

  return (
    <div className="bg-white border rounded-md p-3 w-48 shadow-md">
      <div className="font-semibold text-sm mb-1">Action</div>
      <select
        className="w-full border rounded p-1 mb-1"
        value={data.actionType}
        onChange={(e) => updateNodeData(id, { actionType: e.target.value })}
      >
        <option value="log">Log</option>
        <option value="alert">Alert</option>
      </select>
      <input
        type="text"
        className="w-full border rounded p-1"
        value={data.message}
        onChange={(e) => updateNodeData(id, { message: e.target.value })}
      />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}