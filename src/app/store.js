import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/invoices/counterSlice';
import booksReducer from '../features/books/booksSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: booksReducer,
  },
});

export default store;