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
import { FeedsReducer } from '@/models';

const initialState: FeedsReducer = {
  isLoading: false,
  feeds: [],
};

export default function feeds(state: FeedsReducer = initialState, action: any) {
  const { type, data } = action;
  switch (type) {
    case CREATE_FEED:
    case UPDATE_FEED:
    case GET_FEEDS:
    case DELETE_FEED:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_FEED_FAILED:
    case UPDATE_FEED_FAILED:
    case DELETE_FEED_FAILED:
    case GET_FEEDS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case GET_FEEDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        feeds: [...data.feeds],
      };
    case CREATE_FEED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        feeds: [...state.feeds, data.feed],
      };
    case UPDATE_FEED_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        feeds: [...state.feeds.map(itm => {
          return itm.id === data.feed.id
            ? data.feed : itm;
        })],
      };
    }
    case DELETE_FEED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        feeds: [...state.feeds.filter(itm => itm.id !== data.feedId)]
      };
    default:
      return state;
  }
}