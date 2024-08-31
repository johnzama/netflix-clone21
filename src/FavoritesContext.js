// src/FavoritesContext.js
import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext(); // Create a context

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // State to store favorite movies

  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]); // Add a movie to favorites
  };

  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId) // Remove a movie from favorites
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext); // Custom hook for using favorites context

