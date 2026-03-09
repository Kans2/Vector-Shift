// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      color="#8b5cf6"
      inputs={[
        { id: `${id}-system`, label: 'system' },
        { id: `${id}-prompt`, label: 'prompt' },
      ]}
      outputs={[{ id: `${id}-response`, label: 'response' }]}
    >
      <p className="node-description">
        Large Language Model node. Connect a system prompt and a user prompt to generate a response.
      </p>
    </BaseNode>
  );
};
