// filterNode.js – filters data based on a condition

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || '');
    const [field, setField] = useState(data?.field || '');

    return (
        <BaseNode
            id={id}
            title="Filter"
            color="#ec4899"
            inputs={[{ id: `${id}-data`, label: 'data' }]}
            outputs={[
                { id: `${id}-pass`, label: 'pass' },
                { id: `${id}-fail`, label: 'fail' },
            ]}
        >
            <label className="node-label">
                Field
                <input
                    className="node-input"
                    type="text"
                    placeholder="e.g. age"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                />
            </label>
            <label className="node-label">
                Condition
                <input
                    className="node-input"
                    type="text"
                    placeholder="e.g. > 18"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                />
            </label>
        </BaseNode>
    );
};
