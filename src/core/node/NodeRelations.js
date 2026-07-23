import { RELATION_TYPES } from "./NodeTypes.js";

export class RelationshipGraph {
  constructor() {
    this.nodes = new Map();
    this.edges = [];
  }

  addNode(node) {
    this.nodes.set(node.id, node);
  }

  addEdge(sourceId, targetId, relation = RELATION_TYPES.RELATED_TO) {
    this.edges.push({
      id: `edge-${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId,
      relation,
      createdAt: new Date().toISOString()
    });
  }

  getRelatedNodes(nodeId) {
    const connectedEdges = this.edges.filter(
      (e) => e.source === nodeId || e.target === nodeId
    );

    return connectedEdges.map((e) => {
      const neighborId = e.source === nodeId ? e.target : e.source;
      return {
        node: this.nodes.get(neighborId),
        relation: e.relation
      };
    });
  }
}

export const globalGraph = new RelationshipGraph();
