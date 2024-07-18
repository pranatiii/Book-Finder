import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./bookdetail.css";

const BookDetail = () => {
  const { id } = useParams();
  const navigate  = useNavigate();
  const url = "/books";

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try{
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    setBook(data);
  } catch(error){
    console.log("Error fetching the book details:" , error);
  }

    };

    fetchBook();
  }, [id, url]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <><header className="header">
        <button className="back-button" onClick={()=> navigate(-1)}>BACK</button>
    </header>
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <img src={book.src} alt={book.alt} />
      <p>{book.description}</p>
    </div>
    </>
  );
};

export default BookDetail;
