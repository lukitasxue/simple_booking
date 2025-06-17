export interface ConversationContext {
  history: string[];
}

/**
 * Manages retrieval and update of conversation history.
 */
export class ContextManager {
  private context: ConversationContext = { history: [] };

  addMessage(message: string) {
    this.context.history.push(message);
  }

  getContext(): ConversationContext {
    return this.context;
  }
}
