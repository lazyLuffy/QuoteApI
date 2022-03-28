import { configureStore } from '@reduxjs/toolkit';
import dataSlice from '../features/counter/dataSlice';
import toogleSlice from '../features/counter/toogleSlice';

export const store = configureStore({
  reducer: {
    data: dataSlice,
    status:toogleSlice
  },
});
