"use client";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const MovieList = () => {
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value); // Update the searchQuery state
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="movie_search">
        <div className="movie_search_inner">
          <span>
            <AiOutlineSearch />
          </span>
          <input
            type="text"
            placeholder="What do you want to watch?"
            value={searchQuery}
            onChange={handleSearchInputChange} // Handle input change
          />
        </div>
      </div>
      <div className="movie_sec_inner">
        {filteredMovies.map((movie) => (
          <div className="movie_card_container" key={movie.id}>
            <MovieCard key={movie.id} movie={movie} />
          </div>
        ))}
      </div>
    </>
  );
};

export const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`movie/${movie.id}`);
  };

  return (
    <div
      data-testid="movie-card"
      className="movie_card"
      onClick={handleCardClick}
    >
      <div className="movie_card_inner">
        <div className="movie_card_top">
          <img
            data-testid="movie-poster"
            src={posterUrl}
            alt={`${movie.title} Poster`}
          />
        </div>
        <div className="movie_card_bottom">
          <h3 data-testid="movie-title" className="movie_title">
            {movie.title}
          </h3>
          <p>
            Release Date:{" "}
            <span data-testid="movie-release-date">{movie.release_date}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
