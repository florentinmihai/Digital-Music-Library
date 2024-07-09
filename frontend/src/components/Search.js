import React, { useRef, useState } from "react";

function Search({ onSearch }) {
  const inputEl = useRef(null);
  const [filter, setFilter] = useState("artists");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = () => {
    const query = inputEl.current.value;
    onSearch(filter, query);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setDropdownOpen(false);
    inputEl.current.value = ""; // Clear the search field
    onSearch(value, ""); // Show unfiltered data
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="search-container">
      <input
        className="search"
        type="text"
        placeholder="Search..."
        ref={inputEl}
        onChange={handleSearch}
      />
      <div
        className="dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="dropdown-button">
          Filter:{" "}
          {filter === "artists" ? "🎤" : filter === "albums" ? "💿" : "🎵"} ▼
        </div>
        {dropdownOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => handleFilterChange("artists")}>Artists 🎤</li>
            <li onClick={() => handleFilterChange("albums")}>Albums 💿</li>
            <li onClick={() => handleFilterChange("songs")}>Songs 🎵</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
