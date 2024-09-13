import { configureStore } from '@reduxjs/toolkit';
import tutorialsReducer from './tutorialsSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    tutorials: tutorialsReducer,
    auth: authReducer,
  },
});

export default store;
