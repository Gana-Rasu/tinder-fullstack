import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Authmodal from "../components/Authmodal";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setSignup] = useState(true);

  const authToken = false;

  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setSignup(true);
  };

  return (
    <div className="overlay">
      <Navbar
        minimal={false}
        setShowModal={setShowModal}
        setSignup={setSignup}
      />
      <div className="home">
      <h1 className="primary-title">Swipe Right</h1>
      <button className="primary-button" onClick={handleClick}>
        {authToken ? "signout" : "create Account"}
      </button>

      {showModal && (
        <Authmodal
          showModal={showModal}
          setShowModal={setShowModal}
          isSignup={isSignup}
        />
      )}
      </div>
      
    </div>
  );
}

export default Home;
