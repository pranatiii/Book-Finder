import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice.jsx';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
