import { getApiInstance } from '../instance';
import { CreateFeedDto, UpdateFeedDto } from '@/models';

const getFeeds = async () => {
  const api = await getApiInstance();
  return api.get('feeds', {})
    .then(({ data }) => data);
};

const createFeed = async (entry: CreateFeedDto) => {
  const api = await getApiInstance();
  return api.post('feeds', entry)
    .then(({ data }) => data);
};

const updateFeed = async (id: number, goal: UpdateFeedDto) => {
  const api = await getApiInstance();
  return api.put(`feeds/${id}`, goal)
    .then(({ data }) => data);
};

const deleteFeed = async (id: number) => {
  const api = await getApiInstance();
  return api.delete(`feeds/${id}`)
    .then(({ data }) => data);
};

export const Feeds = {
  getFeeds,
  createFeed,
  updateFeed,
  deleteFeed,
};