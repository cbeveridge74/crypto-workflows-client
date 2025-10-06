import { Handle, Position } from 'reactflow';

export default function ActionNode({ data }: any) {
  return (
    <div className="p-3 bg-green-100 border border-green-400 rounded-lg shadow-sm w-48 text-sm">
      <strong>Action</strong>
      <div>{data.actionType}</div>
      <div>Msg: {data.message}</div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}