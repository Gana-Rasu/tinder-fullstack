import React, { useState } from "react";

function Authmodal({ setShowModal, isSignup }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmpassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(email, password, confirmpassword);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignup && password !== confirmpassword) {
        setError("password not matched");
      }
      console.log("make a post request to the database");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        Ⓧ
      </div>
      <h1>{isSignup ? "CREATE ACCOUNT" : "LOG IN"}</h1>
      <p>
        By clicking Log In, you agree to our terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignup && (
          <input
            type="confirmpassword"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
        )}
        <input className="secondary-button" type="submit" />
        <p>{error}</p>
      </form>
      <hr />
      {/* <h2>GET THE APP</h2> */}
    </div>
  );
}

export default Authmodal;
