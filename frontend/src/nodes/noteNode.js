// noteNode.js – a sticky note for annotating the pipeline

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
    const [note, setNote] = useState(data?.note || 'Add a note…');

    return (
        <BaseNode
            id={id}
            title="Note"
            color="#eab308"
            inputs={[]}
            outputs={[]}
            minWidth={200}
        >
            <textarea
                className="node-textarea node-textarea--note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                style={{ resize: 'vertical' }}
            />
        </BaseNode>
    );
};
