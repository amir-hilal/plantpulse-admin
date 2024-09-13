import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchTutorials = createAsyncThunk('tutorials/fetchTutorials', async () => {
  const response = await api.get('/tutorials');
  return response.data;
});

const tutorialsSlice = createSlice({
  name: 'tutorials',
  initialState: {
    tutorials: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutorials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutorials.fulfilled, (state, action) => {
        state.loading = false;
        state.tutorials = action.payload;
      })
      .addCase(fetchTutorials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default tutorialsSlice.reducer;
