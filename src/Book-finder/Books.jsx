import React, { useEffect, useState } from "react";
import "./bookfinder.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../Store/booksSlice.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchBar from "./Searchbar.jsx";


const Books = () => {
  const dispatch = useDispatch();
  const {
    items: books,
    loading,
    error,
    searchQuery,
  } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      className="app"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="app">
        <nav>
          <h1>Book Finder</h1>
          <SearchBar />
        </nav>

        <main>
       
          <div className="book-list">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : filteredBooks.length > 0 ? (
              <>
                {filteredBooks.map((book) => (
                  <div className="book" key={book.id}>
                    <Link
                      to={`/bookDetail/${book.id}`}
                      key={book.id}
                      className="book-item-link"
                    >
                      <img className="img" src={book.src} alt={book.alt} />
                    </Link>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                  </div>
                ))}
              </>
            ) : (
              <p>Book Not Found</p>
            )}
          </div>
        </main>

        <footer>
          <div className="row">
            <div className="footer-col">
              <h6>book finder</h6>
            </div>
            <div className="footer-col">
              <h4>company</h4>
              <ul>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Product</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>support</h4>
              <ul>
                <li>
                  <a href="#">Contact us</a>
                </li>
              </ul>
            </div>
          </div>
          <p>&copy; 2024 Book Finder. All rights reserved.</p>
        </footer>
      </div>
    </motion.div>
  );
};

export default Books;
