// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import FavoritesPage from './pages/FavoritesPage'; // Import the FavoritesPage
import { FavoritesProvider } from './FavoritesContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/favorites" element={<FavoritesPage />} /> {/* Define the Favorites route */}
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;

