// draggableNode.js

import { useState } from 'react';

const descriptions = {
  customInput: 'Accepts user input data',
  llm: 'AI language model',
  customOutput: 'Pipeline output endpoint',
  text: 'Text with {{variables}}',
  filter: 'Filter data by condition',
  transform: 'Transform data values',
  api: 'External API request',
  merge: 'Merge multiple inputs',
  note: 'Sticky note annotation',
};

export const DraggableNode = ({ type, label, emoji = '', color = '#6366f1' }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  return (
    <div
      className={`draggable-node${isDragging ? ' draggable-node--dragging' : ''}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.target.style.cursor = 'grab';
        setIsDragging(false);
      }}
      style={{ '--node-color': color }}
      draggable
    >
      {emoji && <span className="draggable-node__emoji">{emoji}</span>}
      <span className="draggable-node__label">{label}</span>
      <span className="draggable-node__tooltip">{descriptions[type] || label}</span>
    </div>
  );
};