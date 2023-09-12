"use client";

import React, { useState, useEffect } from "react";
import { MovieCard } from "./movieList";

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const apiKey = "f2d990ed85300af3d5a6c51e3f08ecf4"; // Replace with your TMDB API key

  const handleSearch = async () => {
    if (query.trim() === "") {
      return; // Do not perform empty searches
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <div>
      <h1>Search Results</h1>
      <div>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="movie-grid">
          {searchResults.map((movie) => (
            <a key={movie.id} href={`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
