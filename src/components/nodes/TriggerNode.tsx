import { Handle, Position } from 'reactflow';

export default function TriggerNode({ data }: any) {
  return (
    <div className="p-3 bg-yellow-100 border border-yellow-400 rounded-lg shadow-sm w-48 text-sm">
      <strong>Trigger</strong>
      <div>{data.triggerType}</div>
      <div>Value: {data.value}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}