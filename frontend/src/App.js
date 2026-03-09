// App.js

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './index.css';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

function App() {
  const { nodes, edges } = useStore(selector, shallow);

  return (
    <div className="app">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <div className="status-bar">
        <div className="status-bar__left">
          <span className="status-bar__item">
            <span className="status-bar__dot" />
            Ready
          </span>
          <span className="status-bar__item">
            📦 {nodes.length} nodes
          </span>
          <span className="status-bar__item">
            🔗 {edges.length} edges
          </span>
        </div>
        <div className="status-bar__right">
          <span className="status-bar__item">
            <span className="status-bar__kbd">Drag</span> to add nodes
          </span>
          <span className="status-bar__item">
            VectorShift Pipeline Builder
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
