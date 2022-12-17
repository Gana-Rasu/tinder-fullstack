import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

function Authmodal({ setShowModal, isSignup }) {
 
  let navigate = useNavigate()
   
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmpassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookie,setCookie,removeCookie] = useCookies(['user']);

  console.log(email, password, confirmpassword);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup && password !== confirmpassword) {
        setError("password not matched");
        return
      }
     const response = await axios.post(`http://localhost:4000/${isSignup ? 'signup' : 'login'}`,{email,password});
     console.log(response);
    //  to save values as cookies

     setCookie('AuthToken',response.data.token)
     setCookie('UserId',response.data.userId)

     const success = response.status === 201;
     if(success && isSignup) navigate("/onboarding");
     if(success && !isSignup) navigate("/dashboard")

     window.location.reload();

      
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
