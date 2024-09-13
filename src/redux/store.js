import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tutorialsReducer from './tutorialsSlice';
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    tutorials: tutorialsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(logger);
  },
});

export default store;
