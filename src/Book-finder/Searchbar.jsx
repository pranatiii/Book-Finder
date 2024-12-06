import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, clearSearch, fetchBooks } from '../Store/booksSlice';
import "./bookfinder.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { filteredItems, searchQuery, loading, error } = useSelector(state => state.books);

  const handleSearch = (e) => {
    if(e.target.value !== ""){
    dispatch(setSearchQuery (e.target.value));
  }
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  return (
    <>
      <div className='search-bar'>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleSearch} 
          placeholder="Search books..." 
        />
        <button className = "search-button" onClick={handleSearch}>Search</button>
        <button className='clear-button' onClick={handleClearSearch}>Clear</button>
      </div>
    
    </>
  );
};

export default SearchBar;




