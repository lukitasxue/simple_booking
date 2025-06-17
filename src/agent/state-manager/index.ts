import { DetectedIntent, IntentType } from '../intent-classifier';

export interface GoalSlot {
  name: string;
  value?: string;
}

export interface ActiveGoal {
  type: IntentType;
  slots: GoalSlot[];
}

/**
 * Tracks progress of active conversation goals.
 */
export class DialogueStateManager {
  private goals: ActiveGoal[] = [];

  addGoal(goal: ActiveGoal) {
    this.goals.push(goal);
  }

  updateFromIntents(intents: DetectedIntent[]) {
    for (const intent of intents) {
      if (intent.type === 'unknown') continue;
      let goal = this.goals.find(g => g.type === intent.type);
      if (!goal) {
        goal = { type: intent.type, slots: this.createSlots(intent.type) };
        this.goals.push(goal);
      }
      if (intent.entities) {
        for (const [name, value] of Object.entries(intent.entities)) {
          const slot = goal.slots.find(s => s.name === name);
          if (slot) {
            slot.value = value;
          } else {
            goal.slots.push({ name, value });
          }
        }
      }
    }
  }

  private createSlots(type: IntentType): GoalSlot[] {
    switch (type) {
      case 'serviceBooking':
        return [
          { name: 'service' },
          { name: 'date' },
          { name: 'time' },
        ];
      case 'frequentlyAskedQuestion':
        return [{ name: 'question' }];
      case 'accountManagement':
        return [{ name: 'action' }];
      default:
        return [];
    }
  }

  getGoals(): ActiveGoal[] {
    return this.goals;
  }
}
