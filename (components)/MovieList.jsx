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
      }
    }

    fetchTopMovies();
  }, []);

  return (
    <>
      <div className="movie_sec_inner">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export const MovieCard = ({ movie }) => {
  console.log("movie", movie);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`movie/${movie.id}`);
  };

  return (
    <>
      <div
        className="movie_card"
        data-testid="movie-card"
        onClick={handleCardClick}
      >
        <div className="movie_card_inner">
          <img
            data-testid="movie-poster"
            src={posterUrl}
            alt={`${movie.title} Poster`}
          />
          <h2 data-testid="movie-title" className="movie_title">
            {movie.title}
          </h2>
          <p>
            Release Date:
            <span data-testid="movie-release-date">{movie.release_date}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieList;
{
  /* <p>backdrop:</p>
<img src={backDropUrl} alt={`${movie.title} Poster`} /> */
}
