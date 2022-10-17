import React from "react";
import whiteLogo from "../images/tinder-logo-white.png";
import colorLogo from "../images/color-logo-tinder.png";

function Navbar({ minimal, authToken }) {
  return (
    <nav>
      <div className="logo-container">
        <img
          className="logo"
          src={minimal ? colorLogo : whiteLogo}
          alt="logo"
        />
      </div>

      {!authToken && !minimal && <button className="nav-button">LOG IN </button>}
    </nav>
  );
}

export default Navbar;
