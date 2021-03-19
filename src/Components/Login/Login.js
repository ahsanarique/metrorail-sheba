import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./loginManager";

import LoginForm from "./LoginForm";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    newUser: false,
    isSignedIn: false,
    name: "",
    email: "",
    error: "",
    success: false,
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  const handleBlur = (e) => {
    let isFieldValid;

    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const validPassword = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = validPassword && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const events = {
    handleSubmit: handleSubmit,
    googleSignIn: googleSignIn,
    fbSignIn: fbSignIn,
    signOut: signOut,
    handleBlur: handleBlur,
  };

  const userData = {
    user: user,
    setUser: setUser,
    newUser: newUser,
    setNewUser: setNewUser,
  };

  return <LoginForm events={events} userData={userData} />;
};

export default Login;
