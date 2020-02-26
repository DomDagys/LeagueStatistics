import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Home from "./components/Home";
import Admin from "./components/Admin";
import { AuthContext } from "./context/auth";
import LoginForm from "./components/loginForm/LoginForm";
import RegisterForm from "./components/registerForm/registerForm";
import NavigationBar from "./components/navigation/NavigationBar";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = data => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <h1>{authTokens}</h1>
          <NavigationBar/>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={RegisterForm} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
