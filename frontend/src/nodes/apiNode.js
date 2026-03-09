// apiNode.js – makes an HTTP request to an external endpoint

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.url || '');
    const [method, setMethod] = useState(data?.method || 'GET');

    return (
        <BaseNode
            id={id}
            title="API Request"
            color="#f97316"
            inputs={[{ id: `${id}-body`, label: 'body' }]}
            outputs={[
                { id: `${id}-response`, label: 'response' },
                { id: `${id}-error`, label: 'error' },
            ]}
        >
            <label className="node-label">
                Method
                <select
                    className="node-select"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                >
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>DELETE</option>
                </select>
            </label>
            <label className="node-label">
                URL
                <input
                    className="node-input"
                    type="text"
                    placeholder="https://api.example.com/data"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </label>
        </BaseNode>
    );
};
