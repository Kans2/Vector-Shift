// submit.js – Part 4: sends pipeline to backend and shows alert

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            const { num_nodes, num_edges, is_dag } = data;

            alert(
                `✅ Pipeline Analysis\n\n` +
                `📦 Nodes:  ${num_nodes}\n` +
                `🔗 Edges:  ${num_edges}\n` +
                `🔀 Is DAG: ${is_dag ? 'Yes ✓' : 'No ✗'}`
            );
        } catch (err) {
            alert(`❌ Could not reach backend:\n${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="submit-area">
            <div className="submit-stats">
                <span className="submit-stat">
                    <span className="submit-stat__icon">📦</span>
                    <span className="submit-stat__value">{nodes.length}</span> nodes
                </span>
                <span className="submit-stat">
                    <span className="submit-stat__icon">🔗</span>
                    <span className="submit-stat__value">{edges.length}</span> edges
                </span>
            </div>
            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="submit-spinner" />
                        Analysing…
                    </>
                ) : (
                    <>⚡ Submit Pipeline</>
                )}
            </button>
        </div>
    );
};
