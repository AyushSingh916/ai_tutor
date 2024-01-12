import React, { useState } from "react";
import "./Login.css";

import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoggle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card">
      <div id="login-outer-card">
        <div className="login">
          <input
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" onClick={signIn}>
            {" "}
            Sign In{" "}
          </button>

          <button className="btn" onClick={signInWithGoggle}>
            Sign In with Goggle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
