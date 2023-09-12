"use client";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
function MovieList() {
  const [movies, setMovies] = useState([]);
  const apiKey = "f2d990ed85300af3d5a6c51e3f08ecf4";

  useEffect(() => {
    async function fetchTopMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          throw new Error("Failed to fetch top movies");
        }
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    }

    fetchTopMovies();
  }, []);

  return (
    <div>
      <h1>Top 10 Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export const MovieCard = ({ movie }) => {
  console.log(movie);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backDropUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`movies/${movie.id}`);
  };

  return (
    <div onClick={handleCardClick}>
      <div className="movie-card">
        <h2>{movie.title}</h2>
        <p>Release Date: {movie.release_date}</p>
        <img src={posterUrl} alt={`${movie.title} Poster`} />
        <p>backdrop:</p>
        <img src={backDropUrl} alt={`${movie.title} Poster`} />
      </div>
    </div>
  );
};

export default MovieList;
