import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './features/users/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { jwtCookieMiddleware } from './middlewares/jwtCookiesMiddleWare';
import { messageSlice } from './features/messages/messageSlice';

const store = configureStore({
  reducer: {
    userSlice:userSlice.reducer,
    messageSlice:messageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(jwtCookieMiddleware),
});

export default store;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;