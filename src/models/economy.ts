import * as moment from 'moment';
import { Quest } from './quests';

export interface Transaction {
  id: string;
  amount: number;
  description?: string;
  date: moment.Moment;
}

export interface SavingsGoal {
  id: string;
  title?: string;
  amount: number;
  progress: number;
  reason: string;
  relatedQuests: Quest[];
  dueDate?: moment.Moment;
}