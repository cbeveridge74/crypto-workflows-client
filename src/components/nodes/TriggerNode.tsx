import { Handle, Position, type NodeProps } from 'reactflow';
import { useStore } from '../../store/useStore';

export default function TriggerNode({ id, data }: NodeProps) {
  const updateNodeData = useStore((s) => s.updateNodeData);

  return (
    <div className="bg-white border rounded-md p-3 w-48 shadow-md">
      <div className="font-semibold text-sm mb-1">Trigger</div>
      <select
        className="w-full border rounded p-1 mb-1"
        value={data.triggerType}
        onChange={(e) => updateNodeData(id, { triggerType: e.target.value })}
      >
        <option value="price_above">Price Above</option>
        <option value="price_below">Price Below</option>
      </select>
      <input
        type="number"
        className="w-full border rounded p-1"
        value={data.value}
        onChange={(e) => updateNodeData(id, { value: +e.target.value })}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}