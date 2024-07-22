import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from './booksSlice.jsx';
import "./App.css"

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchQuery(query));
  };

  return (
    <div className='search-bar'>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search books..." 
      />
      <button className = "search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
