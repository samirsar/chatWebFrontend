import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReqType } from '../../../services/Apis/userApi';
import { messagesFailure, messagesLoadingStart, messagesSuccess, sendMessagesSuccess } from './messageSlice';
import { getMessageBetweenSenderAndReceiver, sendMessage } from '../../../services/Apis/messageApi';
export const GetMessages = createAsyncThunk(
    'message/getMessages',
    async (req:ReqType, { rejectWithValue, dispatch }) => {
      try {
        dispatch(messagesLoadingStart());
  
        const response = await getMessageBetweenSenderAndReceiver(req);
        dispatch(messagesSuccess({messages:response.data.data,total_count:response.data.total_count}));
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to get messages';
        dispatch(messagesFailure(errorMessage));

        return rejectWithValue(errorMessage);
      }
    }
  );
export const SendMessages = createAsyncThunk(
    'message/sendMessages',
    async (req:ReqType, { rejectWithValue, dispatch }) => {
      try {
        dispatch(messagesLoadingStart());
  
        const response = await sendMessage(req);
          dispatch(sendMessagesSuccess());
  
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to send message';
        dispatch(messagesFailure(errorMessage));
  
        return rejectWithValue(errorMessage);
      }
    }
  );
