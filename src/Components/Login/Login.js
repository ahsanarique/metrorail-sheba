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

  const [formData, updateFormData] = useState({});
  const [passwordError, setPasswordError] = useState("");

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password === formData.confirmPassword) {
      if (newUser && formData.email && formData.password) {
        createUserWithEmailAndPassword(
          formData.name,
          formData.email,
          formData.password
        ).then((res) => {
          handleResponse(res, true);
        });
      }
    } else {
      setPasswordError("Password doesn't match.");
    }

    if (!newUser && formData.email && formData.password) {
      signInWithEmailAndPassword(formData.email, formData.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
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

  console.log(user);

  return (
    <div className="text-white bg-dark mt-4 p-4 rounded">
      {!loggedInUser.success && (
        <p className="text-danger">{loggedInUser.error}</p>
      )}
      {newUser && <p className="text-danger">{passwordError}</p>}
      <Form onSubmit={handleSubmit} style={formStyle}>
        <h1 className="mb-3">{newUser ? "Create an Account" : "Login"}</h1>
        {newUser && (
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              placeholder="Your name"
              type="text"
              pattern="^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$"
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            placeholder="Password"
            minLength="8"
            onChange={handleChange}
            required
          />
        </Form.Group>

        {newUser && (
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        {!newUser && (
          <Form.Group>
            <Form.Check type="checkbox" label="Remember Me" inline />

            <Button className="ml-auto" size="sm" variant="outline-info">
              Forgot Password
            </Button>
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
        <div className="mt-2">
          {!newUser ? "Don't have an account?" : "Already have an account?"}
          <Button
            onClick={() => {
              setNewUser(!newUser);
            }}
            className="ml-4"
            size="sm"
            variant="outline-warning"
          >
            {!newUser ? "Create an account" : "Login"}
          </Button>{" "}
        </div>
      </Form>

      <div className="text-center my-4">
        <h2 className="my-4">"OR"</h2>
        <Button onClick={() => googleSignIn()} variant="info" size="lg" block>
          <span className="mx-2">{googleIcon}</span> Continue with Google
        </Button>
        <Button onClick={() => fbSignIn()} variant="info" size="lg" block>
          <span className="mx-2">{facebookIcon}</span> Continue with Facebook
        </Button>
      </div>
    </div>
  );
};

export default Login;
