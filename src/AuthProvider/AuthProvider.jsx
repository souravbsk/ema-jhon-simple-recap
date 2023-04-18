import React from "react";
import { createContext } from "react";
import app from "../firebase/firebase.init";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

export const authProvider = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loader,setLoader] = useState(true);



  const googleProvider = new GoogleAuthProvider();

  //user create
  const createUser = (email, password) => {
    setLoader(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const login = (email, password) => {
    setLoader(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const googleSignIn = () => {
    setLoader(true)
    return signInWithPopup(auth, googleProvider);
  };

  //sign out user 
  const logOut = () => {
    return signOut(auth);
  }

  //getUser from firebase
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false)
    });
    return () => unSubscribe();
  }, []);

  const authInfo = {
    createUser,
    login,
    googleSignIn,
    user,
    logOut,
    loader
  };
  return (
    <authProvider.Provider value={authInfo}>{children}</authProvider.Provider>
  );
};

export default AuthProvider;
