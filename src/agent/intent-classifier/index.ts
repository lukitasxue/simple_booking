export interface DetectedIntent {
  type: string;
  entities?: Record<string, string>;
}

/**
 * Placeholder multi-intent classifier.
 */
export function detectIntents(text: string): DetectedIntent[] {
  // TODO: Replace with ML model or LLM call
  if (!text) return [];
  return [{ type: 'unknown' }];
}
