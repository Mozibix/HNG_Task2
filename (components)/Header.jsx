import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";

const Header = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const apiKey = "f2d990ed85300af3d5a6c51e3f08ecf4";

  const handleSearch = async () => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
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

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <nav className="nav">
        <div className="nav_inner container_main">
          <div className="nav_left">
            <img src="/svgs/tv_logo_icon.svg" alt="logo" />
            <p>MovieBox</p>
          </div>

          <div className="nav_middle">
            <div className="nav_middle_inner">
              <input
                type="text"
                placeholder="What do you want to watch?"
                value={query}
                onChange={handleInputChange}
              />
              {loading ? (
                <BiLoaderCircle className="mr-2 animate-spin" size={22} />
              ) : (
                <span onClick={handleSearch}>
                  <AiOutlineSearch />
                </span>
              )}
            </div>

            <div className="nav_middle_dropdown">
              {loading ? (
                <>
                  <p className="nav_middle_loading_sec">
                    <span>
                      <BiLoaderCircle className="mr-2 animate-spin" size={22} />
                    </span>
                    Loading...
                  </p>
                </>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div className="nav_movie_container">
                  {searchResults.map((movie) => (
                    <a key={movie.id} href={`/movie/${movie.id}`}>
                      <MovieCard key={movie.id} movie={movie} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="nav_right">
            <div className="nav_right_inner">
              <p>sign in</p>

              <span>
                <img src="/svgs/hamburger_icon.svg" alt="hamburger" />
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

export const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`movies/${movie.id}`);
  };

  return (
    <div className="nav_movie_card" onClick={handleCardClick}>
      <div className="nav_movie_card_inner">
        <div className="nav_movie_card_left">
          <img src={posterUrl} alt={`${movie.title} Poster`} />
        </div>

        <div className="nav_movie_card_right">
          <h4>{movie.title}</h4>
          <p>
            Release Date:
            <span>{movie.release_date}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
