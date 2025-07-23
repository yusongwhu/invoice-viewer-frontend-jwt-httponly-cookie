// src/features/books/booksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

// Async thunk to fetch books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await API.get('/Books');
  return await response.data;
});

// Async thunk to add a book
export const addBook = createAsyncThunk('books/addBook', async (newBook) => {
  const res = await API.post('/books', newBook, { withCredentials: true });
  return res.data;
});

// Async thunk to delete a book
export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  await API.delete(`/books/${id}`, { withCredentials: true });
  return id;

});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.items = state.items.filter(book => book.id !== action.payload);
      });
  }
});

export default booksSlice.reducer;