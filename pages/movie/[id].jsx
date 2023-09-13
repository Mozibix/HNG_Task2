import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SideBar from "@/(components)/SideBar";

function MovieDetailsPage() {
  const router = useRouter();
  const { id } = router.query ?? {};
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "f2d990ed85300af3d5a6c51e3f08ecf4";

  useEffect(() => {
    if (id) {
      async function fetchMovieDetails() {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
          );
          if (response.ok) {
            const data = await response.json();
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
        <div className="movie_id_sidebar">
          <SideBar />
        </div>

        <div className="movie_id_details">
          {error ? (
            <p>Error: {error}</p>
          ) : movieDetails ? (
            <>
              <div>
                <h1>{movieDetails.title}</h1>
                <p>Release Date: {movieDetails.release_date}</p>
                <p>Runtime: {movieDetails.runtime} minutes</p>
                <p>Overview: {movieDetails.overview}</p>
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
