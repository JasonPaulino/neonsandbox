import { configureStore } from '@reduxjs/toolkit';
import sandboxReducer from './features/sandbox/sandboxSlice';
import { RootState } from '@/types/sandbox';

export const store = configureStore({
  reducer: {
    sandbox: sandboxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
