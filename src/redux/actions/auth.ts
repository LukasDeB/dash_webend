import axios from 'axios';
import * as actions from '../constants';
import { LoginDto, User } from '../../models';
import { User as UserAPI } from '@/api/user';

const getToken = (user: LoginDto) => dispatch => {
  dispatch({ type: actions.GET_TOKEN });
  axios.post(`${actions.BASE_URL}auth/login`, user)
    .then(({ data: { accessToken } }) => {
      localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: actions.GET_TOKEN_SUCCESS,
        data: { accessToken },
      });
    })
    .catch(error => dispatch({ type: actions.GET_TOKEN_FAILED, data: { error } }));
};

const logOut = () => ({ type: actions.LOGOUT });

const updateUserInfo = (user: User) => dispatch => dispatch({ type: actions.GET_USER_INFO_SUCCESS, data: { user } });

const getUserInfo = () => dispatch => {
  dispatch({ type: actions.GET_USER_INFO });
  UserAPI.getUserInfo()
    .then(user => dispatch(updateUserInfo(user)))
    .catch(error => dispatch({ type: actions.GET_USER_INFO_FAILED, data: { error } }));
};

export const AuthActions = {
  getToken,
  getUserInfo,
  updateUserInfo,
};
