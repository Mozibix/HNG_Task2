"use client";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";

const MovieList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = "f2d990ed85300af3d5a6c51e3f08ecf4";

  useEffect(() => {
    async function fetchTopMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
        );
        setLoading(true);
        if (response.ok) {
          const data = await response.json();
          const top10Movies = data.results.slice(0, 10);
          setMovies(top10Movies);
          setLoading(false);
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
    setSearchQuery(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="movie_search">
        <div className="movie_search_inner">
          {loading ? (
            <BiLoaderCircle className="mr-2 animate-spin" size={22} />
          ) : (
            <span>
              <AiOutlineSearch />
            </span>
          )}

          <input
            type="text"
            placeholder="What do you want to watch?"
            value={searchQuery}
            onChange={handleSearchInputChange} // Handle input change
          />
        </div>
      </div>
      <div className="movie_sec_inner">
        {loading ? (
          <>
            <p className="movie_sec_loading_sec">
              <span>
                <BiLoaderCircle className="mr-2 animate-spin" size={22} />
              </span>
              Loading...
            </p>
          </>
        ) : (
          <>
            {filteredMovies.map((movie) => (
              <div className="movie_card_container" key={movie.id}>
                <MovieCard key={movie.id} movie={movie} />
              </div>
            ))}
          </>
        )}
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
        <div className="movie_card_top relative">
          <div className="heart_icon">
            <img src="/svgs/heart_icon.svg" alt="heart_icon" />
          </div>
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
