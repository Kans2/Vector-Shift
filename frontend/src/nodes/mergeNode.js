// mergeNode.js – merges two inputs into one combined output

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
    const [strategy, setStrategy] = useState(data?.strategy || 'concat');

    return (
        <BaseNode
            id={id}
            title="Merge"
            color="#14b8a6"
            inputs={[
                { id: `${id}-a`, label: 'A' },
                { id: `${id}-b`, label: 'B' },
            ]}
            outputs={[{ id: `${id}-merged`, label: 'merged' }]}
        >
            <label className="node-label">
                Strategy
                <select
                    className="node-select"
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value)}
                >
                    <option value="concat">Concatenate</option>
                    <option value="json">JSON Merge</option>
                    <option value="sum">Sum</option>
                </select>
            </label>
        </BaseNode>
    );
};
