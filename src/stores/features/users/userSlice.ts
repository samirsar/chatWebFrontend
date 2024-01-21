import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

export type UserType = {
  id:string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userName?: string;
  userType?: string;
};
export type UsersState = {
  users: UserType[];
  isLoading: boolean;
  error: null | string;
  total_count: number;
};
export type UserDetailState = {
  user: UserType | undefined;
  isLoading: boolean;
  error: null | string;
};
export type UserState = {
  userDetails: UserDetailState;
  users: UsersState;
};

const initialState: UserState = {
  userDetails: {
    user: undefined,
    isLoading: false,
    error: null,
  },
  users: {
    users: [],
    isLoading: false,
    error: null,
    total_count: 0,
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    usersLoadingStart: (state) => {
      state.users.isLoading = true;
      state.users.error = null;
    },
    usersFailure: (state, action: PayloadAction<string>) => {
      state.users.isLoading = false;
      state.users.error = action.payload;
      message.error(state.users.error);
    },
    usersSuccess: (
      state,
      action: PayloadAction<{ users: UserType[]; total_count: number }>
    ) => {
      state.users.isLoading = false;
      state.users.error = null;
      state.users.users = action.payload.users;
      state.users.total_count = action.payload.total_count;
    },
    userDetailsLoadingStart: (state) => {
      state.userDetails.isLoading = true;
      state.userDetails.error = null;
    },
    userDetailsFailure: (state, action: PayloadAction<string>) => {
      state.userDetails.isLoading = false;
      state.userDetails.error = action.payload;
      message.error(state.userDetails.error);
    },
    userDetailsSuccess: (
      state,
      action: PayloadAction<{ user: UserType; }>
    ) => {
      state.userDetails.isLoading = false;
      state.userDetails.error = null;
      state.userDetails.user = action.payload.user;
    },
    userLoginSuccess: (state, action: PayloadAction<string>) => {
      state.userDetails.isLoading = false;
      state.userDetails.error = null;
      message.success(action.payload);
    },
    userSignUpSuccess: (state, action: PayloadAction<string>) => {
      (state.userDetails.isLoading = false), (state.userDetails.error = null);
      message.success(action.payload);
    },
  },
});

export const {
  usersLoadingStart,
  usersFailure,
  usersSuccess,
  userDetailsLoadingStart,
  userDetailsFailure,
  userDetailsSuccess,
  userLoginSuccess,
  userSignUpSuccess
} = userSlice.actions;
