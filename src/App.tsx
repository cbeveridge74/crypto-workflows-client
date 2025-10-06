import WorkflowEditor from './components/WorkflowEditor';
import RunButton from './components/RunButton';

function App() {
  return (
    <div className="h-full w-full relative">
      <WorkflowEditor />
      <RunButton />
    </div>
  );
}

export default App;