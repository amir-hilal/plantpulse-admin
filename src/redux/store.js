import { configureStore } from '@reduxjs/toolkit';
import tutorialsReducer from './tutorialsSlice';

const store = configureStore({
  reducer: {
    tutorials: tutorialsReducer
  }
});

export default store;
