// src/App.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, addBook, deleteBook } from './booksSlice';

function Book() {
  const { items: books, loading, error } = useSelector(state => state.books);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleAdd = () => {
    const newBook = { bookTitle: title };
    dispatch(addBook(newBook));
    setTitle("");
    //dispatch(fetchBooks()); // Refresh list
  };

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
    //dispatch(fetchBooks()); // Refresh list
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📘 Book List</h1>

      <input
        placeholder="Book title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add Book</button>

      {loading && <p>Loading books...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.bookTitle}
            <button onClick={() => handleDelete(book.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Book;