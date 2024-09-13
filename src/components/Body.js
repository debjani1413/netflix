import React,{useEffect} from 'react';
import Login from './Login';
import Browse from './Browse';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import {useDispatch} from 'react-redux';
import {addUser,removeUser} from '../utils/UserSlice';

const Body = () => {

    const dispatch = useDispatch();


    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ]);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Extract user details from the user object
          const { uid, email, displayName } = user;
          
          // Dispatch the action with extracted user details
          dispatch(addUser({uid: uid, email: email, displayName: displayName}));
        } else {
          // User is signed out
          // You can handle sign-out state here if needed
          dispatch(removeUser());
        }
      });
    }, []);
    

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
