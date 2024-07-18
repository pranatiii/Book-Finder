import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./Books";
import BookDetail from "./BookDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/bookDetail/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
