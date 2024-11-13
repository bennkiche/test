import React from "react";

function Search({ onSearchChange }) {
  function handleChange(e) {
    onSearchChange(e.target.value);
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Labs:</label>
      <input
        type="text"
        id="search"
        placeholder="Type test or sample to search..."
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;