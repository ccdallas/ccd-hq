export const PARSER_TYPES = {
  MARKDOWN: "markdown",
  NOTION: "notion",
  GITHUB: "github",
  WEB_ARTICLE: "web",
  TRANSCRIPT: "transcript"
};

export class ParserRegistry {
  static parseContent(sourceType, rawContent) {
    switch (sourceType) {
      case PARSER_TYPES.MARKDOWN:
        return { text: rawContent.trim(), format: "markdown", tokenCount: rawContent.split(" ").length };
      case PARSER_TYPES.TRANSCRIPT:
        return { text: rawContent, format: "transcript", extractedEntities: ["Clinical AI", "IoMT", "Black Hat"] };
      default:
        return { text: rawContent, format: "raw" };
    }
  }
}
