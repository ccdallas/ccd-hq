import { ParserRegistry } from "./ParserRegistry.js";
import { CCD_SDK } from "../sdk/index.js";

export class IngestionEngine {
  static async ingest({ sourceName, sourceType, rawContent, patientImpact = "High", missionId = null }) {
    const parsed = ParserRegistry.parseContent(sourceType, rawContent);
    
    // Convert parsed ingestion payload into a Node in the Universal Graph
    const knowledgeNode = CCD_SDK.createNode({
      type: "knowledge",
      title: `[Ingested] ${sourceName}`,
      patientImpact,
      metadata: {
        sourceType,
        format: parsed.format,
        content: parsed.text,
        ingestedAt: new Date().toISOString()
      }
    });

    if (missionId) {
      CCD_SDK.linkNodes(missionId, knowledgeNode.id, "SUPPORTS");
    }

    return {
      success: true,
      nodeId: knowledgeNode.id,
      summary: `Ingested ${parsed.tokenCount || 0} words from ${sourceName}`
    };
  }
}
