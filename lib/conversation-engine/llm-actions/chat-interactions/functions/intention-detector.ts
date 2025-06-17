export type GoalType = 'serviceBooking' | 'frequentlyAskedQuestion' | 'accountManagement' | 'generalChitChat' | 'unknown';
export type GoalAction = 'create' | 'update' | 'delete' | 'view' | 'none';

export interface AnalyzedIntent {
  goalType: GoalType;
  goalAction: GoalAction;
  contextSwitch: boolean;
  confidence: number;
  extractedInformation: Record<string, any>;
}

import { OpenAIChatMessage } from '@/lib/conversation-engine/llm-actions/chat-interactions/openai-config/openai-core';
import { UserContext } from '@/lib/database/models/user-context';
import { detectIntents } from '@agent/intent-classifier';

/**
 * Simple multi-intent analyzer that delegates to the lightweight
 * `detectIntents` heuristics. History and userContext are currently
 * ignored but kept for API compatibility.
 */
export async function analyzeConversationIntents(
  message: string,
  _history: OpenAIChatMessage[],
  _userContext: UserContext | null
): Promise<AnalyzedIntent[]> {
  const results = detectIntents(message);
  return results.map(intent => ({
    goalType: intent.type as GoalType,
    goalAction: intent.entities?.action as GoalAction || 'none',
    contextSwitch: false,
    confidence: 0.6,
    extractedInformation: intent.entities || {}
  }));
}

export function getFallbackIntent(): AnalyzedIntent {
  return {
    goalType: 'unknown',
    goalAction: 'none',
    contextSwitch: false,
    confidence: 0,
    extractedInformation: {}
  };
}
