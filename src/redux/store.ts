import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dataReducer from './dataSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
