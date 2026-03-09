# ⚡ VectorShift – Pipeline Builder

A **visual pipeline builder** for designing AI workflows using a drag-and-drop node-based editor. Built with React, React Flow, Zustand, and Python FastAPI.

![Pipeline Builder UI](./screenshots/pipeline-builder.png)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Node Types](#node-types)
- [Design System](#design-system)
- [Backend API](#backend-api)

---

## Overview

VectorShift Pipeline Builder lets users **visually design data/AI processing pipelines** by dragging nodes onto a canvas, connecting them with edges, and submitting for analysis. The backend validates the pipeline structure, counts nodes/edges, and checks if the graph is a valid **DAG (Directed Acyclic Graph)**.

---

## Features

### Part 1: Node Abstraction
- **`BaseNode.js`** – A reusable abstraction layer that all node types extend
- Configurable props: `title`, `color`, `inputs[]`, `outputs[]`, `children`
- Adding a new node type requires only **~20 lines of code**
- **5 custom nodes** built to demonstrate flexibility: Filter, Transform, API, Merge, Note

### Part 2: Styling
- Professional **dark theme** with glassmorphism effects
- **CSS Design System** with 50+ custom properties (colors, shadows, radii, animations)
- Google Fonts: Inter, Outfit, Fira Code
- Micro-animations: node appear, handle pulse, button shimmer
- Color-coded zoom controls (green/red/blue/amber)
- Responsive empty state with onboarding guidance

### Part 3: Text Node Logic
- **Auto-resizing textarea** – height adjusts dynamically as user types
- **`{{variable}}` detection** – typing `{{name}}` automatically creates a new input Handle on the left side
- Variables displayed as styled pill badges below the textarea

### Part 4: Backend Integration
- Submit button sends `{ nodes, edges }` to FastAPI backend via `POST /pipelines/parse`
- Backend returns `{ num_nodes, num_edges, is_dag }`
- **DAG detection** using iterative DFS with 3-color cycle detection (O(V+E))
- Results displayed in a user-friendly `alert()`
- Loading spinner during API call
- Live node/edge count displayed next to submit button

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 | Component-based UI |
| Canvas | React Flow | Node-based visual editor |
| State | Zustand | Lightweight global store |
| Styling | Vanilla CSS | Custom design system |
| Backend | Python FastAPI | REST API |
| Validation | Pydantic | Request/response models |

---

## Architecture

```
vectorshift/
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js                  # App shell (toolbar + canvas + submit + status bar)
│       ├── toolbar.js              # Node palette with search/filter
│       ├── draggableNode.js        # Draggable node chip with tooltip
│       ├── ui.js                   # React Flow canvas + drag-and-drop handler
│       ├── submit.js               # Submit button + API integration
│       ├── store.js                # Zustand global state store
│       ├── index.css               # Complete design system (CSS custom properties)
│       └── nodes/
│           ├── BaseNode.js         # ⭐ Reusable node abstraction
│           ├── inputNode.js        # Input node (name + type selector)
│           ├── outputNode.js       # Output node (name + type selector)
│           ├── llmNode.js          # LLM node (system + prompt → response)
│           ├── textNode.js         # Text node (auto-resize + {{variable}} handles)
│           ├── filterNode.js       # Filter node (field + condition → pass/fail)
│           ├── transformNode.js    # Transform node (JS expression)
│           ├── apiNode.js          # API node (method + URL → response/error)
│           ├── mergeNode.js        # Merge node (A + B → merged)
│           └── noteNode.js         # Note node (sticky note annotation)
│
└── backend/
    └── main.py                     # FastAPI server with /pipelines/parse endpoint
```

### Data Flow

```
User drags node from Toolbar
        ↓
draggableNode.js (sets dataTransfer)
        ↓
ui.js onDrop() → creates node → store.addNode()
        ↓
React Flow renders node on canvas
        ↓
User connects nodes (edges stored in Zustand)
        ↓
Submit button → POST /pipelines/parse → alert() with results
```

### BaseNode Abstraction Pattern

```jsx
// Creating a new node is simple – just configure BaseNode:
export const FilterNode = ({ id }) => (
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
    {/* Only unique fields go here */}
    <input className="node-input" placeholder="e.g. age" />
  </BaseNode>
);
```

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python 3.8+

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on **http://localhost:3000**

### Backend

```bash
cd backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```

Runs on **http://localhost:8000**

---

## Node Types

| Node | Emoji | Color | Inputs | Outputs | Description |
|---|---|---|---|---|---|
| Input | 📥 | Green | — | value | Entry point for data |
| LLM | 🤖 | Purple | system, prompt | response | AI language model processing |
| Output | 📤 | Amber | value | — | Exit point for results |
| Text | 📝 | Blue | dynamic `{{vars}}` | output | Template with variable detection |
| Filter | 🔍 | Pink | data | pass, fail | Conditional data filtering |
| Transform | ⚙️ | Cyan | input | output | JS expression transformation |
| API | 🌐 | Orange | body | response, error | HTTP request to external API |
| Merge | 🔀 | Teal | A, B | merged | Combines two inputs |
| Note | 🗒️ | Yellow | — | — | Sticky note annotation |

---

## Design System

### Color Palette

```
Background:  #0c0e16 (deep navy-black)
Surfaces:    rgba(18, 22, 36, 0.85) (glassmorphic)
Accent:      #6366f1 (indigo)
Text:        #f0f2f8 / #a0aec7 / #5e6b85 (primary/secondary/muted)
```

### Key Design Features

- **Glassmorphism** – `backdrop-filter: blur(20px)` on toolbar, nodes, controls
- **Layered shadows** – 5 elevation levels from `shadow-xs` to `shadow-xl`
- **Micro-animations** – `nodeAppear`, `handlePulse`, `shimmer`, `subtleBreathe`
- **Color-coded controls** – Zoom In (🟢), Zoom Out (🔴), Fit View (🔵), Lock (🟡)
- **Custom scrollbars** – Thin, themed scrollbars matching design
- **CSS Custom Properties** – 50+ design tokens for consistency

---

## Backend API

### `POST /pipelines/parse`

**Request:**
```json
{
  "nodes": [
    { "id": "llm-1", "type": "llm", "data": {}, "position": { "x": 0, "y": 0 } }
  ],
  "edges": [
    { "id": "e1", "source": "text-1", "target": "llm-1", "sourceHandle": "...", "targetHandle": "..." }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

### DAG Detection Algorithm

Uses **iterative DFS with 3-color marking**:
- ⚪ White (0) = unvisited
- 🔘 Grey (1) = in progress (on current path)
- ⚫ Black (2) = fully processed

If a grey node is encountered during DFS → **cycle detected** → not a DAG.

**Time complexity:** O(V + E)

---

## License

This project was built as part of the VectorShift Frontend Technical Assessment.
