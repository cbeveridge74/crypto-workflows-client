import { Handle, Position, type NodeProps } from 'reactflow';
import { nodeDefinitions } from '@config/nodeDefinitions';
import { useStore } from '@store/useStore';
import type { NodeData } from '@slices/workflowSlice';  

export default function AppNode({ id, type, data }: NodeProps<NodeData>) {
  const updateNodeData = useStore((s) => s.updateNodeData);
  const def = nodeDefinitions[type as keyof typeof nodeDefinitions];

  if (!def) {
    return <div className="p-2 bg-red-100 text-red-700">Unknown node type</div>;
  }

  return (
    <div className="bg-white border rounded-md p-3 w-48 shadow-md">
      <div className="font-semibold text-sm mb-1">{def.label}</div>

      <select
        className="w-full border rounded p-1 mb-2"
        value={data.type || ''}
        onChange={(e) => updateNodeData(id, { type: e.target.value })}
      >
        {def.options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <input
        className="w-full border rounded p-1"
        value={data.value ?? ''}
        onChange={(e) => updateNodeData(id, { value: e.target.value })}
        placeholder="Value"
      />

      <Handle
        type={def.handleType}
        position={def.handleType === 'source' ? Position.Right : Position.Left}
        style={{ background: def.color }}
      />
    </div>
  );
}