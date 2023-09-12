import Header from "@/(components)/Header";
import React from "react";

const HomePage = () => {
  return (
    <div className="header_hero">
      {/* HEADER  */}
      <Header />
      <section className="hero_sec">
        <div className="hero_inner container_main">
          <div className="hero_left">
            <div className="hero_left_inner">
              <h2>
                John Wick 3 :
                <br />
                Parabellum
              </h2>

              <div className="rating_sec">
                <div className="rating_left">
                  <img src="/svgs/imdb_icon.svg" alt="imdb_icon" />

                  <span className="rating_divide">86.0 / 100</span>
                </div>
                <div className="rating_right">
                  <img src="/svgs/redfruit_icon.svg" alt="redfruit_icon" />
                  <span className="rating_percent">97%</span>
                </div>
              </div>

              <p className="quotes_sec">
                John Wick is on the run after killing a member of the
                international assassins&apos; guild, and with a $14 million
                price tag on his head, he is the target of hit men and women
                everywhere.
              </p>

              <button>
                <span>
                  <img src="/svgs/play_icon.svg" alt="play_icon" />
                </span>
                Watch trailer
              </button>
            </div>
          </div>

          <div className="hero_right"></div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
