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
import { Quest } from '@/models';

export interface QuestsReducer {
  isLoading: boolean;
  quests: Quest[];
}

const initialState: QuestsReducer = {
  isLoading: false,
  quests: [],
};

export default function quests(state: QuestsReducer = initialState, action: any) {
  const { type, data } = action;
  switch (type) {
    case CREATE_QUEST:
    case UPDATE_QUEST:
    case GET_QUESTS:
    case DELETE_QUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_QUEST_FAILED:
    case UPDATE_QUEST_FAILED:
    case DELETE_QUEST_FAILED:
    case GET_QUESTS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case GET_QUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quests: [...data.quests],
      };
    case CREATE_QUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quests: [...state.quests, data.quest],
      };
    case UPDATE_QUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        quests: [...state.quests.map(itm => {
          return itm.id === data.quest.id
            ? data.quest : itm;
        })],
      };
    }
    case DELETE_QUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quests: [...state.quests.filter(itm => itm.id !== data.questId)]
      };
    default:
      return state;
  }
}