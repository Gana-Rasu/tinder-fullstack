import React from "react";
import Navbar from "../components/Navbar";

function Home() {

  const authToken = false;

   const handleClick = ()=>{
    console.log("clicked")
   }

    return (
      <div className="overlay">
        <Navbar minimal={false} authToken={authToken}/>
        <h1>swipe right</h1>
        <button className="primary-button" onClick={handleClick}>
      {authToken ? "signout" : "create Account"}
        </button>
      </div>
    );
  }
  
  export default Home;
  