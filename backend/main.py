from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any, Optional

app = FastAPI()

# Allow the React dev server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


# ── Pydantic models ──────────────────────────────────────────────────────────

class NodeModel(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[Any] = None
    position: Optional[Any] = None

class EdgeModel(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelinePayload(BaseModel):
    nodes: List[NodeModel]
    edges: List[EdgeModel]


# ── DAG check (iterative DFS / cycle detection) ──────────────────────────────

def is_dag(nodes: List[NodeModel], edges: List[EdgeModel]) -> bool:
    """Return True if the graph formed by nodes+edges is a Directed Acyclic Graph."""
    node_ids = {n.id for n in nodes}

    # Build adjacency list (only include edges between known nodes)
    adj: dict[str, list[str]] = {nid: [] for nid in node_ids}
    for e in edges:
        if e.source in adj and e.target in adj:
            adj[e.source].append(e.target)

    # Iterative DFS with 3-colour marking: 0=white, 1=grey, 2=black
    color = {nid: 0 for nid in node_ids}

    for start in node_ids:
        if color[start] != 0:
            continue
        stack = [(start, False)]          # (node, returning)
        while stack:
            node, returning = stack.pop()
            if returning:
                color[node] = 2           # fully processed → black
                continue
            if color[node] == 1:          # grey → back-edge → cycle!
                return False
            if color[node] == 2:
                continue
            color[node] = 1               # mark grey (in progress)
            stack.append((node, True))    # schedule post-processing
            for neighbour in adj[node]:
                if color[neighbour] == 1:
                    return False          # cycle detected
                if color[neighbour] == 0:
                    stack.append((neighbour, False))

    return True


# ── Endpoint ─────────────────────────────────────────────────────────────────

@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    dag = is_dag(payload.nodes, payload.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }
