import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Navigate to the search results page with the search query
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://cdn.iconscout.com/icon/free/png-256/free-cinema-film-video-clip-movie-multimedia-short-1-18284.png"
            alt="IMDB Logo"
          />
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
      </div>
      <div className="headerRight">
        <input
          type="text"
          className="header__searchInput"
          placeholder="Search movies..."
          value={query}
          onChange={handleChange}
        />
        <button className="header__searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
