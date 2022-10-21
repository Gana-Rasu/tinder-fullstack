import React from "react";
import whiteLogo from "../images/tinder-logo-white.png";
import colorLogo from "../images/color-logo-tinder.png";

function Navbar({ minimal, showModal, setShowModal, setSignup }) {
  const handleClick = () => {
    setShowModal(true);
    setSignup(false);
  };

  const authToken =false;

  return (
    <nav>
      <div className="logo-container">
        <img
          className="logo"
          src={minimal ? colorLogo : whiteLogo}
          alt="logo"
        />
      </div>

      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in{" "}
        </button>
      )}
    </nav>
  );
}

export default Navbar;
