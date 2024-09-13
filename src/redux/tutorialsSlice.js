import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Async action to fetch tutorials with pagination
export const fetchTutorials = createAsyncThunk(
  'tutorials/fetchTutorials',
  async (page = 1) => {
    const response = await api.get(`/tutorials?page=${page}`);
    return response.data;
  }
);

const tutorialsSlice = createSlice({
  name: 'tutorials',
  initialState: {
    tutorials: [],
    loading: false,
    error: null,
    pagination: {
      current_page: 1,
      total_pages: 1,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutorials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutorials.fulfilled, (state, action) => {
        state.loading = false;
        state.tutorials = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          total_pages: action.payload.total_pages,
        };
      })
      .addCase(fetchTutorials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tutorialsSlice.reducer;
