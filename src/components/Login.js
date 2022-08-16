import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Login.css";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../Firebase";
import images from "../variables";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential.user);
        if (userCredential) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        if (userCredential) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
      });
  };

  return (
    <div className="login">
      <NavLink to="/">
        <img className="login_logo" src={images.amazonLogin} alt="amazon" />
      </NavLink>
      <div className="login_container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            autoFocus={true}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login_signInButton" type="submit" onClick={signIn}>
            Sign In
          </button>
        </form>
        <p>
          By Signing-in you agree to Amazon Clone's Condition of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <small className="Login_new">
          <h6>
            <span>New to Amazon ?</span>
          </h6>
        </small>
        <button onClick={register} className="login_registerButton">
          Create Your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
