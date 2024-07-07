import React, { useRef } from "react";

function Search() {
  const inputEl = useRef(null);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search albums..."
      ref={inputEl}
    />
  );
}

export default Search;
