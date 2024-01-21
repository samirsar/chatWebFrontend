import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReqType, getUsers, login, signUp } from '../../../services/Apis/userApi';
import { UserType, userDetailsFailure, userDetailsLoadingStart, userDetailsSuccess, userLoginSuccess, userSignUpSuccess, usersLoadingStart, usersSuccess } from './userSlice';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (req:ReqType, { rejectWithValue, dispatch }) => {
      try {
        dispatch(userDetailsLoadingStart());
  
        const response = await login(req);
        dispatch(userLoginSuccess(response.data.message));
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to login';
        dispatch(userDetailsFailure(errorMessage));

        return rejectWithValue(errorMessage);
      }
    }
  );
export const SignUpUser = createAsyncThunk(
    'user/signUpUser',
    async (req:ReqType, { rejectWithValue, dispatch }) => {
      try {
        dispatch(userDetailsLoadingStart());
  
        const response = await signUp(req);
          dispatch(userSignUpSuccess(response.data.message));
  
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to register user';
        dispatch(userDetailsFailure(errorMessage));
  
        return rejectWithValue(errorMessage);
      }
    }
  );
export const GetUsers = createAsyncThunk(
    'user/getUsers',
    async (req:ReqType, { rejectWithValue, dispatch }) => {
      try {
        dispatch(usersLoadingStart());
  
        const response = await getUsers(req);
        const users:UserType[]=response.data.data;
        const total_count=response.data.total_count;
          dispatch(usersSuccess({users:users,total_count:total_count}));
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to register user';
        dispatch(userDetailsFailure(errorMessage));
  
        return rejectWithValue(errorMessage);
      }
    }
  );
export const GetUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (req:ReqType, { rejectWithValue, dispatch }) => {
      try {
        dispatch(userDetailsLoadingStart());
  
        const response = await getUsers(req);
        const users:UserType=response.data.data;
          dispatch(userDetailsSuccess({user:users}));
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to fetch user details';
        dispatch(userDetailsFailure(errorMessage));
  
        return rejectWithValue(errorMessage);
      }
    }
  );
