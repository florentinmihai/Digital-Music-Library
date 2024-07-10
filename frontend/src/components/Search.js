import React, { useRef, useState } from "react";

function Search({ onSearch, allArtists, allAlbums, allSongs }) {
  const inputEl = useRef(null);
  const [filter, setFilter] = useState("artists");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  // Handle filter change and show unfiltered data
  const handleFilterChange = (value) => {
    setFilter(value);
    setDropdownOpen(false);
    setQuery("");
    setSuggestions([]);
    onSearch(value, "");
  };

  const fetchSuggestions = async (query) => {
    // Simulating an API call with a state list
    const allSuggestions = {
      artists: allArtists,
      albums: allAlbums,
      songs: allSongs,
    };
    const filteredSuggestions = allSuggestions[filter].filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  // Handle search input changes
  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.trim() === "") {
      setSuggestions([]); // Clear suggestions if the query is empty
    } else {
      fetchSuggestions(newQuery);
    }

    onSearch(filter, newQuery); // Update the list with the current query and filter
  };

  // Clear the search input and reset suggestions
  const handleClearSearch = () => {
    setQuery("");
    setSuggestions([]);
    onSearch(filter, ""); // Reset the search results
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    onSearch(filter, suggestion); // Perform the search with the selected suggestion
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          ref={inputEl}
          value={query}
          onChange={handleSearchChange}
        />
        {query.trim() !== "" && (
          <button className="clear-button" onClick={handleClearSearch}>
            <b>X</b>
          </button>
        )}
      </div>

      {query.trim() !== "" && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div
        className="dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="dropdown-button">
          Filter:{" "}
          {filter === "artists" ? "🎤" : filter === "albums" ? "💿" : "🎧"} ▼
        </button>
        {dropdownOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => handleFilterChange("artists")}>Artists 🎤</li>
            <li onClick={() => handleFilterChange("albums")}>Albums 💿</li>
            <li onClick={() => handleFilterChange("songs")}>Songs 🎧</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
