import {
  CREATE_GOAL,
  CREATE_GOAL_FAILED,
  CREATE_GOAL_SUCCESS,
  UPDATE_GOAL,
  UPDATE_GOAL_FAILED,
  UPDATE_GOAL_SUCCESS,
  GET_GOALS,
  GET_GOALS_FAILED,
  GET_GOALS_SUCCESS,
  DELETE_GOAL,
  DELETE_GOAL_FAILED,
  DELETE_GOAL_SUCCESS,
  COMPLETE_GOAL,
  COMPLETE_GOAL_FAILED,
  COMPLETE_GOAL_SUCCESS,
  FAIL_GOAL,
  FAIL_GOAL_FAILED,
  FAIL_GOAL_SUCCESS,
} from '../constants';
import { Goal, GoalStatuses } from '@/models';

export interface GoalsReducer {
  isLoading: boolean;
  goals: Goal[];
}

const initialState: GoalsReducer = {
  isLoading: false,
  goals: [],
};

export default function goals(state: GoalsReducer = initialState, action: any) {
  const { type, data } = action;
  console.log(`ACTION: ${type}`, 'DATA: ', data);
  switch (type) {
    case CREATE_GOAL:
    case UPDATE_GOAL:
    case GET_GOALS:
    case COMPLETE_GOAL:
    case DELETE_GOAL:
    case FAIL_GOAL:
      return {
        ...state,
        isLoading: true,
      };
    case COMPLETE_GOAL_FAILED:
    case FAIL_GOAL_FAILED:
    case CREATE_GOAL_FAILED:
    case UPDATE_GOAL_FAILED:
    case DELETE_GOAL_FAILED:
    case GET_GOALS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case GET_GOALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        goals: [...data.goals],
      };
    case CREATE_GOAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        goals: [...state.goals, data.goal],
      };
    case UPDATE_GOAL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        goals: [...state.goals.map(itm => {
          return itm.id === data.goal.id
            ? data.goal : itm;
        })],
      };
    }
    case DELETE_GOAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        goals: [...state.goals.filter(itm => itm.id !== data.goalId)]
      };
    case FAIL_GOAL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        goals: [...state.goals.map(itm => {
          return itm.id === data.goalId
            ? {
              ...itm,
              status: GoalStatuses.Failed,
            } : itm;
        })],
      };
    }
    case COMPLETE_GOAL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        goals: [...state.goals.map(itm => {
          return itm.id === data.goalId
            ? {
              ...itm,
              status: GoalStatuses.Completed,
            } : itm;
        })],
      };
    }
    default:
      return state;
  }
}