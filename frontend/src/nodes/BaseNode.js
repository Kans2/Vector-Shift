// BaseNode.js
// Reusable abstraction for all pipeline nodes

import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

// Emoji map for node types
const headerIcons = {
    'Input': '📥',
    'Output': '📤',
    'LLM': '🤖',
    'Text': '📝',
    'Filter': '🔍',
    'Transform': '⚙️',
    'API Request': '🌐',
    'Merge': '🔀',
    'Note': '🗒️',
};

/**
 * BaseNode – a shared shell for every node type.
 *
 * Props:
 *  id          – reactflow node id
 *  title       – label shown in the node header
 *  color       – accent colour for the header strip (hex / css colour)
 *  inputs      – array of { id, label, style? }  → left-side target handles
 *  outputs     – array of { id, label, style? }  → right-side source handles
 *  children    – the node body (fields, selects, textareas, …)
 *  minWidth    – optional override (default 220)
 */
export const BaseNode = ({
    id,
    title,
    color = '#6366f1',
    inputs = [],
    outputs = [],
    children,
    minWidth = 220,
}) => {
    const removeNode = useStore((state) => state.removeNode);
    const icon = headerIcons[title] || '🔷';

    const handleDelete = (e) => {
        e.stopPropagation(); // prevent drag/select on canvas
        removeNode(id);
    };

    return (
        <div
            className="base-node"
            style={{ minWidth }}
        >
            {/* Left-side (target) handles */}
            {inputs.map((input, i) => (
                <Handle
                    key={input.id}
                    type="target"
                    position={Position.Left}
                    id={input.id}
                    style={{
                        top: inputs.length === 1
                            ? '50%'
                            : `${((i + 1) / (inputs.length + 1)) * 100}%`,
                        ...input.style,
                    }}
                    className="node-handle node-handle--target"
                    title={input.label}
                />
            ))}

            {/* Header */}
            <div className="base-node__header" style={{ background: color }}>
                <span className="base-node__icon">{icon}</span>
                <span className="base-node__title">{title}</span>
                <button
                    className="base-node__delete"
                    onClick={handleDelete}
                    title="Remove node"
                >
                    ×
                </button>
            </div>

            {/* Body */}
            <div className="base-node__body">
                {/* Handle labels (left) */}
                {inputs.length > 0 && (
                    <div className="base-node__handle-labels base-node__handle-labels--left">
                        {inputs.map((inp) => (
                            <span key={inp.id} className="base-node__handle-label">
                                {inp.label}
                            </span>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="base-node__content">{children}</div>

                {/* Handle labels (right) */}
                {outputs.length > 0 && (
                    <div className="base-node__handle-labels base-node__handle-labels--right">
                        {outputs.map((out) => (
                            <span key={out.id} className="base-node__handle-label">
                                {out.label}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Right-side (source) handles */}
            {outputs.map((output, i) => (
                <Handle
                    key={output.id}
                    type="source"
                    position={Position.Right}
                    id={output.id}
                    style={{
                        top: outputs.length === 1
                            ? '50%'
                            : `${((i + 1) / (outputs.length + 1)) * 100}%`,
                        ...output.style,
                    }}
                    className="node-handle node-handle--source"
                    title={output.label}
                />
            ))}
        </div>
    );
};
