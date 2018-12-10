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
import { AuthActions } from './auth';
import { Goals } from '@/api';
import { User, CreateGoalDto, UpdateGoalDto } from '@/models';

const getGoals = () => dispatch => {
  dispatch({ type: GET_GOALS });
  Goals.getGoals()
    .then(goals => dispatch({ type: GET_GOALS_SUCCESS, data: { goals } }))
    .catch(error => dispatch({ type: GET_GOALS_FAILED, data: { error } }));
};

const createGoal = (data: CreateGoalDto) => dispatch => {
  dispatch({ type: CREATE_GOAL });
  Goals.createGoal(data)
    .then(goal => dispatch({ type: CREATE_GOAL_SUCCESS, data: { goal } }))
    .catch(error => dispatch({ type: CREATE_GOAL_FAILED, data: { error } }));
};

const updateGoal = (id: number, data: UpdateGoalDto) => dispatch => {
  dispatch({ type: UPDATE_GOAL });
  Goals.updateGoal(id, data)
    .then(goal => dispatch({ type: UPDATE_GOAL_SUCCESS, data: { goal } }))
    .catch(error => dispatch({ type: UPDATE_GOAL_FAILED, data: { error } }));
};

const deleteGoal = (id: number) => dispatch => {
  dispatch({ type: DELETE_GOAL });
  Goals.deleteGoal(id)
    .then(() => dispatch({ type: DELETE_GOAL_SUCCESS, data: { goalId: id } }))
    .catch(error => dispatch({ type: DELETE_GOAL_FAILED, data: { error } }));
};

const completeGoal = (id: number) => dispatch => {
  dispatch({ type: COMPLETE_GOAL });
  Goals.completeGoal(id)
    .then((user: User) => {
      dispatch({ type: COMPLETE_GOAL_SUCCESS, data: { goalId: id } });
      dispatch(AuthActions.updateUserInfo(user));
    })
    .catch(error => dispatch({ type: COMPLETE_GOAL_FAILED, data: { error } }));
};

const failGoal = (id: number) => dispatch => {
  dispatch({ type: FAIL_GOAL });
  Goals.failGoal(id)
    .then((user: User) => {
      dispatch({ type: FAIL_GOAL_SUCCESS, data: { goalId: id } });
      dispatch(AuthActions.updateUserInfo(user));
    })
    .catch(error => dispatch({ type: FAIL_GOAL_FAILED, data: { error } }));
};

export const GoalsActions = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  completeGoal,
  failGoal,
};
