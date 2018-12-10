import { getApiInstance } from '../instance';
import { CreateQuestDto, UpdateQuestDto } from '@/models';

const getQuests = async () => {
  const api = await getApiInstance();
  return api.get('quests', {})
    .then(({ data }) => data);
};

const createQuest = async (goal: CreateQuestDto) => {
  const api = await getApiInstance();
  return api.post('quests', goal)
    .then(({ data }) => data);
};

const updateQuest = async (id: number, goal: UpdateQuestDto) => {
  const api = await getApiInstance();
  return api.put(`quests/${id}`, goal)
    .then(({ data }) => data);
};

const deleteQuest = async (id: number) => {
  const api = await getApiInstance();
  return api.delete(`quests/${id}`)
    .then(({ data }) => data);
};

export const Quests = {
  createQuest,
  getQuests,
  updateQuest,
  deleteQuest,
};