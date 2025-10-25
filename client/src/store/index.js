import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import tasksReducer from './slices/tasksSlice';

const store = configureStore({
  reducer: {
    usersData: usersReducer,
    tasksData: tasksReducer,
  },
});

export default store;
