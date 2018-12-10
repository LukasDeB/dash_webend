import { getApiInstance } from '../instance';
import { CreateGoalDto, UpdateGoalDto } from '@/models';

const getGoals = async () => {
  const api = await getApiInstance();
  return api.get('goals', {})
    .then(({ data }) => data);
};

const createGoal = async (goal: CreateGoalDto) => {
  const api = await getApiInstance();
  return api.post('goals', goal)
    .then(({ data }) => data);
};

const updateGoal = async (id: number, goal: UpdateGoalDto) => {
  const api = await getApiInstance();
  return api.put(`goals/${id}`, goal)
    .then(({ data }) => data);
};

const deleteGoal = async (id: number) => {
  const api = await getApiInstance();
  return api.delete(`goals/${id}`)
    .then(({ data }) => data);
};

const completeGoal = async (id: number) => {
  const api = await getApiInstance();
  return api.get(`goals/${id}/complete`)
    .then(({ data }) => data);
};

const failGoal = async (id: number) => {
  const api = await getApiInstance();
  return api.get(`goals/${id}/fail`)
    .then(({ data }) => data);
};

export const Goals = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  completeGoal,
  failGoal,
};