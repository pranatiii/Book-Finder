import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./bookdetail.css";
import { motion } from "framer-motion";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = "/books";

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${url}/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.log("Error fetching the book details:", error);
      }
    };

    fetchBook();
  }, [id, url]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div 
    className="detail-transition"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5 }}>
  
      <header className="header">
        <button className="back-button" onClick={() => navigate("/")}>
          BACK
        </button>
      </header>
      <div className="book-detail">
        <h2>{book.title}</h2>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <img src={book.src} alt={book.alt} />
        <p>{book.description}</p>
      </div>
      </motion.div>
  );
};

export default BookDetail;
