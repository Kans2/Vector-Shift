// transformNode.js – applies a JS-style transform expression to incoming data

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
    const [expression, setExpression] = useState(data?.expression || 'x.toUpperCase()');

    return (
        <BaseNode
            id={id}
            title="Transform"
            color="#06b6d4"
            inputs={[{ id: `${id}-input`, label: 'input' }]}
            outputs={[{ id: `${id}-output`, label: 'output' }]}
        >
            <label className="node-label">
                Expression
                <textarea
                    className="node-textarea"
                    rows={2}
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    placeholder="e.g. x.toUpperCase()"
                    style={{ resize: 'vertical' }}
                />
            </label>
            <p className="node-description">Use <code>x</code> to refer to input value.</p>
        </BaseNode>
    );
};
