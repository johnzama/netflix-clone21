import axios from 'axios'; // Import Axios to make HTTP requests


const API_KEY = '0bb4c7f388a86c7f526ef1935cb2c6b0'; // <-- Add your API key here
const BASE_URL = 'https://api.themoviedb.org/3';


const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY, // Automatically include the API key with each request
  },
});

// Function to fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/popular'); // Make a GET request to fetch popular movies
    return response.data.results; // Return the array of movies
  } catch (error) {
    console.error('Error fetching popular movies:', error); // Handle any errors
    return []; // Return an empty array if there’s an error
  }
};

// Function to search for movies by a query
export const searchMovies = async (query) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query }, // Include the search query in the request
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching for movies:', error); // Handle any errors
    return []; // Return an empty array if there’s an error
  }
};

// Function to fetch movie details by ID
export const fetchMovieDetails = async (id) => {
  try {
    const response = await tmdbApi.get(`/movie/${id}`); // Make a GET request to fetch movie details by ID
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error); // Handle any errors
    return null; // Return null if there’s an error
  }
};

export default tmdbApi;

