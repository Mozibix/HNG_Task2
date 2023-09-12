import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer_inner">
          <div className="footer_socials">
            <img src="/svgs/fb_icon.svg" alt="social_icon" />
            <img src="/svgs/ig_icon.svg" alt="social_icon" />
            <img src="/svgs/twitter_icon.svg" alt="social_icon" />
            <img src="/svgs/yt_icon.svg" alt="social_icon" />
          </div>

          <div className="footer_links">
            <ul>
              <li>Conditions of Use</li>
              <li>Privacy & Policy</li>
              <li>Press Room</li>
            </ul>
          </div>

          <div className="footer_bottom">
            <p>© 2021 MovieBox by Adriana Eka Prayudha</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
