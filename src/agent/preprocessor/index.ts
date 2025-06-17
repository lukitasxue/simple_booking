export interface PreprocessedMessage {
  raw: string;
  normalized: string;
}

/**
 * Prepare incoming text for downstream processing.
 */
export function preprocessMessage(message: string): PreprocessedMessage {
  return {
    raw: message,
    normalized: message.trim().toLowerCase(),
  };
}
