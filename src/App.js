import React from "react";
import { useCookies } from "react-cookie";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";

function App() {

  const [cookie,setCookie,removeCookie] = useCookies(['user']);

  const authToken = cookie.AuthToken;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {authToken && <Route path="/onboarding" element={<Onboarding />} /> }
          {authToken && <Route path="/dashboard" element={<Dashboard />} /> }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
