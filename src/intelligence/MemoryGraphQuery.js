import { globalGraph } from "../core/node/NodeRelations.js";

export class MemoryGraphQuery {
  static query(keyword) {
    const results = [];
    globalGraph.nodes.forEach((node) => {
      if (
        node.title.toLowerCase().includes(keyword.toLowerCase()) ||
        JSON.stringify(node.metadata).toLowerCase().includes(keyword.toLowerCase())
      ) {
        results.push(node);
      }
    });

    return {
      query: keyword,
      matchCount: results.length,
      confidenceScore: results.length > 0 ? 0.95 : 0.40,
      evidence: results.map((r) => `Matched node [${r.type}]: "${r.title}" (Patient Impact: ${r.patientImpact})`),
      nodes: results
    };
  }
}
