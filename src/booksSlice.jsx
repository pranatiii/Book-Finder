import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = "/books";

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: '', // Add search query state
  },
  reducers: {
    addBook: (state, action) => {
      state.items.push(action.payload);
    },
    removeBook: (state, action) => {
      state.items = state.items.filter(book => book.id !== action.payload);
    },
    clearBooks: (state) => {
      state.items = [];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Action to set search query
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { addBook, removeBook, clearBooks, setSearchQuery } = booksSlice.actions;
export default booksSlice.reducer; 




