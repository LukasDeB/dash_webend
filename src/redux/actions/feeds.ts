import {
  GET_FEEDS,
  GET_FEEDS_FAILED,
  GET_FEEDS_SUCCESS,
  CREATE_FEED,
  CREATE_FEED_FAILED,
  CREATE_FEED_SUCCESS,
  UPDATE_FEED,
  UPDATE_FEED_FAILED,
  UPDATE_FEED_SUCCESS,
  DELETE_FEED,
  DELETE_FEED_FAILED,
  DELETE_FEED_SUCCESS,
} from '../constants';
import { Feeds } from '@/api';
import { UpdateFeedDto, CreateFeedDto } from '@/models';

const getFeeds = () => dispatch => {
  dispatch({ type: GET_FEEDS });
  Feeds.getFeeds()
    .then(feeds => dispatch({ type: GET_FEEDS_SUCCESS, data: { feeds } }))
    .catch(error => dispatch({ type: GET_FEEDS_FAILED, data: { error } }));
};

const createFeed = (data: CreateFeedDto) => dispatch => {
  dispatch({ type: CREATE_FEED });
  Feeds.createFeed(data)
    .then(feed => dispatch({ type: CREATE_FEED_SUCCESS, data: { feed } }))
    .catch(error => dispatch({ type: CREATE_FEED_FAILED, data: { error } }));
};

const updateFeed = (id: number, data: UpdateFeedDto) => dispatch => {
  dispatch({ type: UPDATE_FEED });
  Feeds.updateFeed(id, data)
    .then(feed => dispatch({ type: UPDATE_FEED_SUCCESS, data: { feed } }))
    .catch(error => dispatch({ type: UPDATE_FEED_FAILED, data: { error } }));
};

const deleteFeed = (id: number) => dispatch => {
  dispatch({ type: DELETE_FEED });
  Feeds.deleteFeed(id)
    .then(() => dispatch({ type: DELETE_FEED_SUCCESS, data: { feedId: id } }))
    .catch(error => dispatch({ type: DELETE_FEED_FAILED, data: { error } }));
};

export const FeedsActions = {
  getFeeds,
  createFeed,
  updateFeed,
  deleteFeed,
};

export interface FeedsActions {
  getFeeds: () => void;
  createFeed: (feed: CreateFeedDto) => void;
  updateFeed: (id: number, entry: UpdateFeedDto) => void;
  deleteFeed: (id: number) => void;
}