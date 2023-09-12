import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
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
              <input type="text" placeholder="What do you want to watch?" />
              <span>
                <AiOutlineSearch />
              </span>
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
