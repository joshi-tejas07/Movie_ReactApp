import React, { useState, useEffect } from 'react';
import './SearchResult.css'; 
import Cards from '../../components/card/card';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>
      <div className="movie__list">
        {movies.map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
