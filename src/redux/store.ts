import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import notesReducer from './notesSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
