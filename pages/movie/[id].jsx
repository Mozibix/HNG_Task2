import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SideBar from "@/(components)/SideBar";
import Header from "@/(components)/Header";
import Link from "next/link";

function MovieDetailsPage() {
  const router = useRouter();
  const { id } = router.query ?? {};
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "f2d990ed85300af3d5a6c51e3f08ecf4";
  const backDropUrl = `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`;
  const trailerUrl = `${movieDetails?.homepage}`;

  const convertToUTC = (dateString) => {
    const localDate = new Date(dateString);
    const utcDate = new Date(
      localDate.getTime() + localDate.getTimezoneOffset() * 60000
    );
    return utcDate.toISOString();
  };

  useEffect(() => {
    if (id) {
      async function fetchMovieDetails() {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
          );
          if (response.ok) {
            const data = await response.json();
            data.release_date = convertToUTC(data.release_date);
            setMovieDetails(data);
          } else {
            throw new Error("Failed to fetch movie details");
          }
        } catch (error) {
          console.error(error);
          setError("An error occurred while fetching movie details.");
        }
      }

      fetchMovieDetails();
    }
  }, [id]);

  return (
    <div className="movie_id_sec">
      <div className="movie_id_inner">
        <div className="movie_id_header">
          <Header />
        </div>
        <div className="movie_id_sidebar">
          <SideBar />
        </div>

        <div className="movie_id_details">
          {error ? (
            <p className="text-center">Error: {error}</p>
          ) : movieDetails ? (
            <>
              <div className="movie_id_details_inner">
                <div className="movie_id_details_main">
                  <div className="movie_id_details_image">
                    <Link href={trailerUrl} target="_blank">
                      <div className="watch_trailer">
                        <img
                          src="/svgs/big_play_icon.svg"
                          alt="big-play-button"
                        />
                        <p>Watch Trailer</p>
                      </div>
                    </Link>

                    <img src={backDropUrl} alt={movieDetails?.title} />
                  </div>

                  <div className="movie_id_details_text_sec">
                    <ul className="movie_id_details_nav">
                      <li className="font-semibold" data-testid="movie-title">
                        {movieDetails?.title}
                      </li>
                      <span className="diamond_dot"></span>
                      <li
                        className="font-normal"
                        data-testid=" movie-release-date"
                      >
                        {movieDetails?.release_date}
                      </li>
                      <span className="diamond_dot"></span>
                      <li className="font-bold" data-testid=" movie-runtime">
                        {movieDetails?.runtime}{" "}
                        <span className="font-normal text-xl">minutes</span>
                      </li>
                    </ul>

                    <div className="movie_id_details_overview">
                      <div className="movie_id_details_overview_inner">
                        <h3>overview:</h3>

                        <p data-testid=" movie-overview">
                          {movieDetails?.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>Loading...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
