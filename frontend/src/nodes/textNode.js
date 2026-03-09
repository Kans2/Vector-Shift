// textNode.js  –  Part 3: auto-resize + {{variable}} dynamic handles

import { useState, useEffect, useRef, useCallback } from 'react';
import { BaseNode } from './BaseNode';

// Extract all valid JS variable names wrapped in {{ }}
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return [...vars];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Parse variables whenever text changes
  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  // Auto-resize textarea height to fit content
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    autoResize();
  }, [currText, autoResize]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Build dynamic input handles from detected variables
  const inputs = variables.map((v) => ({
    id: `${id}-${v}`,
    label: v,
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      color="#3b82f6"
      inputs={inputs}
      outputs={[{ id: `${id}-output`, label: 'output' }]}
      minWidth={240}
    >
      <label className="node-label">
        Text
        <textarea
          ref={textareaRef}
          className="node-textarea"
          value={currText}
          onChange={handleTextChange}
          rows={1}
          style={{ resize: 'none', overflow: 'hidden' }}
        />
      </label>
      {variables.length > 0 && (
        <div className="node-variables">
          {variables.map((v) => (
            <span key={v} className="node-variable-chip">{`{{${v}}}`}</span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
