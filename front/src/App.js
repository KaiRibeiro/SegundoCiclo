import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
import Register from "./views/Register/Register";
import Principal from "./views/Principal/Principal";
import UserContext from "./contexts/UserContext";
import Login from "./views/Login/Logins";
import Home from "./views/Home";

function App() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}user`, { withCredentials: true })
      .then((response) => {
          setId(response.data.id);
          setUsername(response.data.username);
      }).catch((error) => {
        setId(null);
        setUsername(null);
      });
  }, []);

  return (
    <CookiesProvider>
      <UserContext.Provider value={{ id, username, setUsername, setId }}>
        <Router>
          {id ? (
            <Routes>
              <Route exact path="*" element={<Home />} />
            </Routes>
          ) : (
            <Routes>
              <Route exact path="*" element={<Principal />} />
              <Route exact path="register" element={<Register />} />
              <Route exact path="login" element={<Login />} />
            </Routes>
          )}
        </Router>
      </UserContext.Provider>
    </CookiesProvider>
  );
}

export default App;
