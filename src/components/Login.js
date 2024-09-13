import React, { useState } from "react";
import background from "../images/background.jpeg";
import Header from "./Header";

import "../index.css";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute inset-0 -z-10">
        <img src={background} alt="background" />
      </div>
      <form className="bg-black/80 p-10 rounded-lg shadow-lg w-[430px] h-[500px] absolute top-[15%] left-1/2 transform -translate-x-1/2 z-10">
        <h2 className="text-white text-2xl font-bold mb-6 text-left">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>
        <input
          placeholder={isSignInForm ? "Email or phone number" : "Enter Email"}
          type="text"
          className="w-full p-3.5 mb-4 rounded border border-gray-500 bg-black/60 text-white focus:outline-none focus:border-white"
        />
        <input
          placeholder={isSignInForm ? "Password" : "Set Password"}
          type="password"
          className="w-full p-3.5 mb-4 rounded border border-gray-500 bg-black/60 text-white focus:outline-none focus:border-white"
        />
        <input
          placeholder="Confirm Password"
          type="password"
          className={`w-full p-3.5 mb-4 rounded border border-gray-500 bg-black/60 text-white focus:outline-none focus:border-white ${
            isSignInForm ? "hidden" : "block"
          }`}
        />
        <button className="w-full mt-2 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div
          className={`flex justify-between items-center mt-4 text-gray-500 text-sm ${
            isSignInForm ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              className="mr-2 appearance-none rounded-sm w-4 h-4 
                                    bg-[#333] relative flex items-center justify-center 
                                    checked:bg-[#4d4c4c] checked:text-white 
                                    checked:before:content-['✓'] before:absolute "
            />
            <label htmlFor="rememberMe" className="text-gray-500 text-xs">
              Remember me
            </label>
          </div>
          <a href="#" className="text-gray-500 hover:underline text-xs">
            Need Help?
          </a>
        </div>
        <p className="mt-8 text-gray-500 text-sm text-center">
          {isSignInForm
            ? `New to NetflixGPT?${" "}`
            : `Already have an account?${" "}`}
          <a href="#" className="text-red-500" onClick={toggleSignInForm}>
            {isSignInForm ? "Sign up now." : "Sign in now."}
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
