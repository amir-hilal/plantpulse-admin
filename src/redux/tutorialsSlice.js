import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

// Async thunk to fetch tutorials
export const fetchTutorials = createAsyncThunk(
  'tutorials/fetchTutorials',
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tutorials?page=${page}`);
      return response.data; // Assuming the API returns data with pagination
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tutorialsSlice = createSlice({
  name: 'tutorials',
  initialState: {
    tutorials: [],
    currentPage: 1,
    loading: false,
    error: null,
    hasMore: true,
  },
  reducers: {
    resetTutorials(state) {
      state.tutorials = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutorials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutorials.fulfilled, (state, action) => {
        state.tutorials = [...state.tutorials, ...action.payload.data];
        state.loading = false;
        state.hasMore = action.payload.next_page_url !== null;
        state.currentPage += 1;
      })
      .addCase(fetchTutorials.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetTutorials } = tutorialsSlice.actions;

export default tutorialsSlice.reducer;
