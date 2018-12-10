import { getApiInstance } from '../instance';
import { CreateJournalEntryDto, UpdateJournalEntryDto } from '@/models';

const getJournal = async () => {
  const api = await getApiInstance();
  return api.get('journal', {})
    .then(({ data }) => data);
};

const createJournalEntry = async (entry: CreateJournalEntryDto) => {
  const api = await getApiInstance();
  return api.post('journal', entry)
    .then(({ data }) => data);
};

const updateJournalEntry = async (id: number, goal: UpdateJournalEntryDto) => {
  const api = await getApiInstance();
  return api.put(`journal/${id}`, goal)
    .then(({ data }) => data);
};

const deleteJournalEntry = async (id: number) => {
  const api = await getApiInstance();
  return api.delete(`journal/${id}`)
    .then(({ data }) => data);
};

export const Journal = {
  getJournal,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
};