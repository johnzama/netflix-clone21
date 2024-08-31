// src/pages/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook to access route parameters
import tmdbApi from '../tmdb'; // Import the tmdbApi instance

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details when the component mounts
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdbApi.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>; // Show loading indicator while fetching data

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

export default MovieDetails;

