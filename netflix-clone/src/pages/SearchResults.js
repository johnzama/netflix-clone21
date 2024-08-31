// src/pages/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../tmdb';

const SearchResults = () => {
  const { query } = useParams(); // Get the search term from the URL
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await tmdbApi.get('/search/movie', {
          params: { query },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    };

    searchMovies();
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

