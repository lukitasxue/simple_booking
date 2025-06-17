import { DetectedIntent } from '../intent-classifier';

export interface GoalSlot {
  name: string;
  value?: string;
}

export interface ActiveGoal {
  type: string;
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
    // TODO: implement real logic
  }

  getGoals(): ActiveGoal[] {
    return this.goals;
  }
}
