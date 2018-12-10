import {
  CREATE_QUEST,
  CREATE_QUEST_FAILED,
  CREATE_QUEST_SUCCESS,
  UPDATE_QUEST,
  UPDATE_QUEST_FAILED,
  UPDATE_QUEST_SUCCESS,
  GET_QUESTS,
  GET_QUESTS_FAILED,
  GET_QUESTS_SUCCESS,
  DELETE_QUEST,
  DELETE_QUEST_FAILED,
  DELETE_QUEST_SUCCESS,
} from '../constants';
import { Quests } from '@/api';
import { CreateQuestDto, UpdateQuestDto } from '@/models';

const getQuests = () => dispatch => {
  dispatch({ type: GET_QUESTS });
  Quests.getQuests()
    .then(quests => dispatch({ type: GET_QUESTS_SUCCESS, data: { quests } }))
    .catch(error => dispatch({ type: GET_QUESTS_FAILED, data: { error } }));
};

const createQuest = (data: CreateQuestDto) => dispatch => {
  dispatch({ type: CREATE_QUEST });
  Quests.createQuest(data)
    .then(quest => dispatch({ type: CREATE_QUEST_SUCCESS, data: { quest } }))
    .catch(error => dispatch({ type: CREATE_QUEST_FAILED, data: { error } }));
};

const updateQuest = (id: number, data: UpdateQuestDto) => dispatch => {
  dispatch({ type: UPDATE_QUEST });
  Quests.updateQuest(id, data)
    .then(quest => dispatch({ type: UPDATE_QUEST_SUCCESS, data: { quest } }))
    .catch(error => dispatch({ type: UPDATE_QUEST_FAILED, data: { error } }));
};

const deleteQuest = (id: number) => dispatch => {
  dispatch({ type: DELETE_QUEST });
  Quests.deleteQuest(id)
    .then(() => dispatch({ type: DELETE_QUEST_SUCCESS, data: { questId: id } }))
    .catch(error => dispatch({ type: DELETE_QUEST_FAILED, data: { error } }));
};

export const QuestsActions = {
  getQuests,
  createQuest,
  updateQuest,
  deleteQuest,
};
