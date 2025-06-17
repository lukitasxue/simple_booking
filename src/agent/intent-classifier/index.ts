export type IntentType =
  | 'serviceBooking'
  | 'frequentlyAskedQuestion'
  | 'accountManagement'
  | 'generalChitChat'
  | 'unknown';

export interface DetectedIntent {
  type: IntentType;
  entities?: Record<string, string>;
}

/**
 * Basic rule-based multi-intent classifier used during the refactor.
 */
export function detectIntents(text: string): DetectedIntent[] {
  if (!text) return [];
  const normalized = text.toLowerCase();
  const intents: DetectedIntent[] = [];

  if (/(hi|hello|hey|thanks)/i.test(normalized)) {
    intents.push({ type: 'generalChitChat' });
  }

  if (/(book|reserve|appointment|schedule)/i.test(normalized)) {
    intents.push({ type: 'serviceBooking' });
  }

  if (/\?|\b(how|what|when|where|why)\b/i.test(text)) {
    intents.push({ type: 'frequentlyAskedQuestion', entities: { question: text } });
  }

  if (intents.length === 0) {
    intents.push({ type: 'unknown' });
  }

  return intents;
}
