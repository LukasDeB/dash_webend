import * as types from '../constants';
import { User } from '@/models';

export interface State {
  isLoading: boolean;
  accessToken: string | null;
  isLoggedIn: boolean;
  currentUser: User | null;
}
const initialState = {
  isLoading: false,
  accessToken: null,
  isLoggedIn: false,
  currentUser: null,
};

const authReducer = (state: State = initialState, action: any): State => {
  const { type, data } = action;
  switch (type) {
    case types.GET_TOKEN:
    case types.GET_USER_INFO:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_TOKEN_FAILED:
      return {
        ...initialState,
      };
    case types.GET_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accessToken: data.accessToken,
      };
    case types.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: data.user,
      };
    default: return state;
  }
};
export default authReducer;