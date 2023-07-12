import { React, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signin from "./components/Signin";
import HomeContainer from "./components/HomeContainer";
import Protected from "./components/Protected";
import Cookies from 'js-cookie';

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const { get: getCookie } = Cookies;

  useEffect(() => {
    const isLoggedInCookie = getCookie("isLoggedIn");
    if (isLoggedInCookie) {
      setisLoggedIn(true);
    }
  }, [getCookie]);

  const handleLoggedIn = () => {
    setisLoggedIn(true);
  };

  const handleLoggedOut = () => {
    setisLoggedIn(false);
    Cookies.remove("isLoggedIn");
  };

  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <Route
            path="/"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <HomeContainer onLoggedOut={handleLoggedOut} />
              </Protected>
            }
          />
        ) : (
          <Route
            path="/"
            element={<Signin onLoggedIn={handleLoggedIn} />}
          />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
