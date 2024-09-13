import React, { useRef, useState } from "react";
import background from "../images/background.jpeg";
import Header from "./Header";
import "../index.css";
import { checkValidData } from "../utils/Validate";
import { auth } from "../utils/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null
  });
  const [invalidCredentials,setInvalidCredentials] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = (e) => {

    setInvalidCredentials(null);

    e.preventDefault(); // Prevent default form submission

    // Validating the form data
    const validationErrors = checkValidData(
      email.current.value,
      password.current.value,
      confirmPassword.current?.value
    );

    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setErrors({
        email: null,
        password: null,
        confirmPassword: null
      });
      // Proceed with form submission or further processing
    }

    //Sign In/Up 
    if(validationErrors === null)
    {
        if(!isSignInForm)
        {
            //Sign up 
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log('success');
                navigate("/browse");
                setInvalidCredentials(null);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
        }
        else 
        {
            //Sign In
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('success');
                setInvalidCredentials(null);
                navigate("/browse");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setInvalidCredentials(errorMessage);
            });
        }
    }

  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrors({
      email: null,
      password: null,
      confirmPassword: null
    }); // Clear any existing error messages when toggling forms

    setInvalidCredentials(null);

  };

  return (
    <div>
      <Header />
      <div className="absolute inset-0 -z-10">
        <img src={background} alt="background" className="object-cover w-full h-full" />
      </div>
      <form
        className="bg-black/80 p-10 rounded-lg shadow-lg w-[430px] h-[500px] absolute top-[15%] left-1/2 transform -translate-x-1/2 z-10"
      >
        <h2 className="text-white text-2xl font-bold mb-6 text-left">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>
        <div className="mb-4">
          <p className={`text-red-500 text-sm mt-1 mb-4 ${invalidCredentials === null ? 'hidden' : 'block'}`}>{invalidCredentials}</p>
          <input
            placeholder={isSignInForm ? "Email or phone number" : "Enter Email"}
            ref={email}
            type="text"
            className={`w-full p-3.5 rounded border ${
              errors.email ? 'border-red-500' : 'border-gray-500'
            } bg-black/60 text-white focus:outline-none focus:border-white`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <input
            placeholder={isSignInForm ? "Password" : "Set Password"}
            ref={password}
            type="password"
            className={`w-full p-3.5 rounded border ${
              errors.password ? 'border-red-500' : 'border-gray-500'
            } bg-black/60 text-white focus:outline-none focus:border-white`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <div className={`mb-4 ${isSignInForm ? "hidden" : "block"}`}>
          <input
            placeholder="Confirm Password"
            ref={confirmPassword}
            type="password"
            className={`w-full p-3.5 rounded border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-500'
            } bg-black/60 text-white focus:outline-none focus:border-white`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
        <button
          className="w-full mt-2 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleButtonClick}
        >
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
              className="mr-2 appearance-none rounded-sm w-4 h-4 bg-[#333] relative flex items-center justify-center checked:bg-[#4d4c4c] checked:text-white checked:before:content-['✓'] before:absolute"
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
