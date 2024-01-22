import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

export type MessageType = {
  id:string;
  senderId?: string;
  receiverId?: string;
  text?:string;
};
export type MessageState = {
  messages: MessageType[];
  isLoading: boolean;
  error: null | string;
  total_count: number;
};

const initialState: MessageState = {
    messages: [],
    isLoading: false,
    error: null,
    total_count: 0,
};
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    messagesLoadingStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    messagesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      message.error(state.error);
    },
    messagesSuccess: (
      state,
      action: PayloadAction<{ messages: MessageType[]; total_count: number }>
    ) => {
      state.isLoading = false;
      state.error = null;
      state.messages = action.payload.messages;
      state.total_count = action.payload.total_count;
    },
    sendMessagesSuccess: (
      state
    ) => {
      state.isLoading = false;
      state.error = null;
    }
  },
});

export const {
  messagesLoadingStart,messagesFailure,messagesSuccess,sendMessagesSuccess
} = messageSlice.actions;
