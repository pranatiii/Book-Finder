import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

const initialState = {
  books: [],
  loading: false,
  error: "",
};

const ACTIONS = {
  FETCH_REQUEST: "FETCH_BOOKS_REQUEST",
  FETCH_SUCCESS: "FETCH_BOOKS_SUCCESS",
  FETCH_FAIL: "FETCH_BOOKS_FAILURE",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_REQUEST:
      return { ...state, loading: true, error: "" };
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, books: action.payload };
    case ACTIONS.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Books = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const url = "/books";

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch({ type: ACTIONS.FETCH_REQUEST });
      try {
        const response = await axios.get(url);
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: response.data });
        setFilteredBooks(response.data);
      } catch (error) {
        dispatch({ type: ACTIONS.FETCH_FAIL, payload: error.message });
      }
    };

    fetchBooks();
  }, []);

  const { books, loading, error } = state;

  // Handle input change in search bar
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search button click

  const handleSearchButtonClick = () => {
    if (searchQuery.trim() === "") {
      setFilteredBooks(books); // If search query is empty, show all books
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };
  return (
    

    <div className="app">
      <nav>
        <h1>Book Finder</h1>
        <div className="search-bar">
          <input
            type="text"
            id="search-input"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button id="search-button" onClick={handleSearchButtonClick}>
            Search
          </button>
        </div>
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
                {" "}
                <a href="#">Contact us</a>
              </li>
              
            </ul>
          </div>
          
        </div>
        <p>&copy; 2024 Book Finder. All rights reserved.</p>
      </footer>
    </div>
    
  );
};

export default Books;
