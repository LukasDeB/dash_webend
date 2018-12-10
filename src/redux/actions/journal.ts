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
import { Journal } from '@/api';
import { UpdateJournalEntryDto, CreateJournalEntryDto } from '@/models';

const getJournal = () => dispatch => {
  dispatch({ type: GET_JOURNAL });
  Journal.getJournal()
    .then(entries => dispatch({ type: GET_JOURNAL_SUCCESS, data: { entries } }))
    .catch(error => dispatch({ type: GET_JOURNAL_FAILED, data: { error } }));
};

const createEntry = (data: CreateJournalEntryDto) => dispatch => {
  dispatch({ type: CREATE_JOURNAL_ENTRY });
  Journal.createJournalEntry(data)
    .then(entry => dispatch({ type: CREATE_JOURNAL_ENTRY_SUCCESS, data: { entry } }))
    .catch(error => dispatch({ type: CREATE_JOURNAL_ENTRY_FAILED, data: { error } }));
};

const updateEntry = (id: number, data: UpdateJournalEntryDto) => dispatch => {
  dispatch({ type: UPDATE_JOURNAL_ENTRY });
  Journal.updateJournalEntry(id, data)
    .then(entry => dispatch({ type: UPDATE_JOURNAL_ENTRY_SUCCESS, data: { entry } }))
    .catch(error => dispatch({ type: UPDATE_JOURNAL_ENTRY_FAILED, data: { error } }));
};

const deleteEntry = (id: number) => dispatch => {
  dispatch({ type: DELETE_JOURNAL_ENTRY });
  Journal.deleteJournalEntry(id)
    .then(() => dispatch({ type: DELETE_JOURNAL_ENTRY_SUCCESS, data: { entryId: id } }))
    .catch(error => dispatch({ type: DELETE_JOURNAL_ENTRY_FAILED, data: { error } }));
};

export const JournalActions = {
  getJournal,
  createEntry,
  updateEntry,
  deleteEntry,
};

export interface JournalActions {
  getJournal: () => void;
  createEntry: (entry: CreateJournalEntryDto) => void;
  updateEntry: (entry: UpdateJournalEntryDto) => void;
  deleteEntry: () => void;
}