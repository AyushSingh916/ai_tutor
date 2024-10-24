// Login.js
import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Login or Sign Up</h2>
          <p>Please enter your details to continue</p>
        </div>
        
        <div className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button onClick={signIn} className="btn primary">
              Sign In
            </button>
            <button onClick={signInWithGoogle} className="btn secondary">
              Sign In with Google
            </button>
          </div>
        </div>

        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;