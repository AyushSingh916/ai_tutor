import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Login or Sign Up
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Please enter your details to continue
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border 
                border-gray-600 placeholder-gray-500 text-gray-200 rounded-lg 
                bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border 
                border-gray-600 placeholder-gray-500 text-gray-200 rounded-lg 
                bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={signIn}
              className="group relative w-full flex justify-center py-3 px-4 
              border border-transparent text-sm font-medium rounded-lg text-white 
              bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Sign In
            </button>

            <button
              onClick={signInWithGoogle}
              className="group relative w-full flex justify-center py-3 px-4 
              border border-gray-600 text-sm font-medium rounded-lg text-white 
              bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Sign In with Google
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
