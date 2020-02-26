import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";
function LoginForm(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const referer = "/admin";

  function postLogin() {
    axios
      .post("https://www.somePlace.com/auth/login", {
        userName,
        password
      })
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          console.log(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          required
          placeholder="Enter user name"
        />
        <input
          type="pasword"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          required
          placeholder="Enter pasword"
        />
        <button onClick={postLogin}>Sign in</button>
      </form>
      <Link to="/signup">Don't have an account?</Link>
    </div>
  );
}

export default LoginForm;
