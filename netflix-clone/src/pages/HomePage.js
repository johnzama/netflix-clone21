// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Navbar from '../components/Navbar';
import { fetchPopularMovies } from '../tmdb';
import { useFavorites } from '../FavoritesContext'; // Import useFavorites

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Use favorites context

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await fetchPopularMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);
      if (page === 1) setFeaturedMovies(fetchedMovies.slice(0, 5));
    };

    fetchMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const isFavorite = (movieId) => favorites.some((movie) => movie.id === movieId); // Check if a movie is in favorites

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Navbar />
      <h1>Featured Movies</h1>
      <Slider {...settings}>
        {featuredMovies.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '10px' }}
              />
            </Link>
          </div>
        ))}
      </Slider>
      <h1>Popular Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
            <h3>{movie.title}</h3>
            <button
              onClick={() =>
                isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie)
              }
            >
              {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default HomePage;

