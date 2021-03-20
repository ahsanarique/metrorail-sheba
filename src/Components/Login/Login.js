import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./loginManager";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

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
  console.log(loggedInUser);
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

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const loginIcon = <FontAwesomeIcon icon={faSignInAlt} />;
  const googleIcon = <FontAwesomeIcon icon={faGoogle} />;
  const facebookIcon = <FontAwesomeIcon icon={faFacebookSquare} />;

  const formStyle = {
    width: "30rem",
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={formStyle}
      className="text-white bg-dark p-4 rounded"
    >
      <h1 className="mb-3">{newUser ? "Create an Account" : "Login"}</h1>
      {newUser && (
        <Form.Group>
          <Form.Control placeholder="Your name" type="text" required />
        </Form.Group>
      )}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onBlur={handleBlur}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onBlur={handleBlur}
          required
        />
      </Form.Group>
      {newUser && (
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onBlur={handleBlur}
            required
          />
        </Form.Group>
      )}

      {!newUser && (
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me" inline />
          <Form.Label>
            <Button className="ml-auto" size="sm" variant="outline-info">
              Forgot Password
            </Button>
          </Form.Label>
        </Form.Group>
      )}

      <Button
        className="px-4 mt-4"
        variant="warning"
        type="submit"
        size="lg"
        block
      >
        <span className="mx-2">{loginIcon}</span>{" "}
        {!newUser ? "Login" : "Create an Account"}
      </Button>
      <Form.Label className="mt-2">
        {!newUser ? "Don't have an account?" : "Already have an account?"}
        <Button
          className="ml-4"
          onClick={() => setNewUser(!newUser)}
          size="sm"
          variant="outline-info"
        >
          {!newUser ? "Create an account" : "Login"}
        </Button>{" "}
      </Form.Label>
      <div>
        {user.success ? (
          <p style={{ color: "green" }}>
            User {newUser ? "created" : "logged in"} successfully
          </p>
        ) : (
          <p style={{ color: "red" }}>{user.error}</p>
        )}
      </div>

      <div className="text-center my-4">
        <h2 className="my-4">"OR"</h2>
        <Button onClick={() => googleSignIn()} variant="info" size="lg" block>
          <span className="mx-2">{googleIcon}</span> Continue with Google
        </Button>
        <Button onClick={() => fbSignIn()} variant="info" size="lg" block>
          <span className="mx-2">{facebookIcon}</span> Continue with Facebook
        </Button>
      </div>
    </Form>
  );
};

export default Login;
