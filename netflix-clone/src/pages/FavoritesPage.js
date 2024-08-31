// src/pages/FavoritesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../FavoritesContext';

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites(); // Access favorites context

  return (
    <div>
      <h1>Your Favorite Movies</h1>
      <div className="movie-list">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie.id} className="movie-item">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <h3>{movie.title}</h3>
              <button onClick={() => removeFavorite(movie.id)}>Remove from Favorites</button>
            </div>
          ))
        ) : (
          <p>No favorites yet. Start adding some!</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

