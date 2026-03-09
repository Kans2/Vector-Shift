// toolbar.js

import { useState } from 'react';
import { DraggableNode } from './draggableNode';

const allNodes = [
    { type: 'customInput', label: 'Input', emoji: '📥', color: '#10b981' },
    { type: 'llm', label: 'LLM', emoji: '🤖', color: '#8b5cf6' },
    { type: 'customOutput', label: 'Output', emoji: '📤', color: '#f59e0b' },
    { type: 'text', label: 'Text', emoji: '📝', color: '#3b82f6' },
    { type: 'filter', label: 'Filter', emoji: '🔍', color: '#ec4899' },
    { type: 'transform', label: 'Transform', emoji: '⚙️', color: '#06b6d4' },
    { type: 'api', label: 'API', emoji: '🌐', color: '#f97316' },
    { type: 'merge', label: 'Merge', emoji: '🔀', color: '#14b8a6' },
    { type: 'note', label: 'Note', emoji: '🗒️', color: '#eab308' },
];

export const PipelineToolbar = () => {
    const [search, setSearch] = useState('');

    const filtered = allNodes.filter(n =>
        n.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="toolbar">
            <div className="toolbar__brand">
                <span className="toolbar__logo">⚡</span>
                <span className="toolbar__title">VectorShift</span>
            </div>
            <div className="toolbar__nodes">
                <span className="toolbar__section-label">Nodes</span>
                <div className="toolbar__node-grid">
                    {filtered.map(n => (
                        <DraggableNode key={n.type} {...n} />
                    ))}
                </div>
            </div>
            <div className="toolbar__search">
                <span className="toolbar__search-icon">🔍</span>
                <input
                    className="toolbar__search-input"
                    type="text"
                    placeholder="Search nodes…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
};
