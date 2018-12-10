import {
  GET_JOURNAL,
  GET_JOURNAL_FAILED,
  GET_JOURNAL_SUCCESS,
  CREATE_JOURNAL_ENTRY,
  CREATE_JOURNAL_ENTRY_FAILED,
  CREATE_JOURNAL_ENTRY_SUCCESS,
  UPDATE_JOURNAL_ENTRY,
  UPDATE_JOURNAL_ENTRY_FAILED,
  UPDATE_JOURNAL_ENTRY_SUCCESS,
  DELETE_JOURNAL_ENTRY,
  DELETE_JOURNAL_ENTRY_FAILED,
  DELETE_JOURNAL_ENTRY_SUCCESS,
} from '../constants';
import { JournalEntry } from '@/models';

export interface JournalReducer {
  isLoading: boolean;
  entries: JournalEntry[];
}

const initialState: JournalReducer = {
  isLoading: false,
  entries: [],
};

export default function journal(state: JournalReducer = initialState, action: any) {
  const { type, data } = action;
  switch (type) {
    case CREATE_JOURNAL_ENTRY:
    case UPDATE_JOURNAL_ENTRY:
    case GET_JOURNAL:
    case DELETE_JOURNAL_ENTRY:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_JOURNAL_ENTRY_FAILED:
    case UPDATE_JOURNAL_ENTRY_FAILED:
    case DELETE_JOURNAL_ENTRY_FAILED:
    case GET_JOURNAL_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case GET_JOURNAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entries: [...data.entries],
      };
    case CREATE_JOURNAL_ENTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entries: [...state.entries, data.entry],
      };
    case UPDATE_JOURNAL_ENTRY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        entries: [...state.entries.map(itm => {
          return itm.id === data.entry.id
            ? data.entry : itm;
        })],
      };
    }
    case DELETE_JOURNAL_ENTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entries: [...state.entries.filter(itm => itm.id !== data.entryId)]
      };
    default:
      return state;
  }
}