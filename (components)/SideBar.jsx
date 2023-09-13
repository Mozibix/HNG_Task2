import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SideBar = () => {
  const router = useRouter();
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_inner">
          <Link className="cursor-pointer" href={"/"}>
            <div className="sidebar_logo">
              <img src="/svgs/tv_logo_icon.svg" alt="logo" />
              <span>MovieBox</span>
            </div>
          </Link>

          <div className="sidebar_menu">
            <ul>
              <li>
                <img src="/svgs/home_icon.svg" alt="sidebar_icon" />
                <span>Home</span>
              </li>
              <li className="active" onClick={() => router.reload()}>
                <img src="/svgs/movie_projector_icon.svg" alt="sidebar_icon" />
                <span>Movies</span>
              </li>

              <li>
                <img src="/svgs/tvshow_icon.svg" alt="sidebar_icon" />
                <span>Tv Series</span>
              </li>
              <li>
                <img src="/svgs/calender_icon.svg" alt="sidebar_icon" />
                <span>Upcoming</span>
              </li>
            </ul>
          </div>

          <div className="sidebar_bottom">
            <div className="sidebar_bottom_quotes">
              <p>Play movie quizes and earn free tickets</p>
              <p>50k people are playing now</p>

              <button>Start playing</button>
            </div>
            <ul>
              <li>
                <img src="/svgs/logout_icon.svg" alt="" />
                <span>Log out</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
