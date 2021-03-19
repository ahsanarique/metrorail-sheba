import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

const LoginForm = (props) => {
  const loginIcon = <FontAwesomeIcon icon={faSignInAlt} />;
  const googleIcon = <FontAwesomeIcon icon={faGoogle} />;
  const facebookIcon = <FontAwesomeIcon icon={faFacebookSquare} />;

  const formStyle = {
    width: "30rem",
  };

  const {
    handleSubmit,
    googleSignIn,
    fbSignIn,
    //signOut,
    handleBlur,
  } = props.events;

  //const { user, setUser, newUser, setNewUser } = props.userData;

  //const { isSignedIn, name, email, error, success } = user;

  return (
    <Form
      onSubmit={handleSubmit}
      style={formStyle}
      className="text-white bg-dark p-4 rounded"
    >
      <h1 className="mb-3">Login</h1>
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

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember Me" inline />
        <Form.Label>
          <span className="text-warning">Forgot Password</span>
        </Form.Label>
      </Form.Group>

      <Button className="px-4" variant="warning" type="submit" size="lg" block>
        <span className="mx-2">{loginIcon}</span> Login
      </Button>
      <Form.Label className="mt-2">
        Don't have an account?{" "}
        <Link to="/" className="text-warning">
          Create an account
        </Link>{" "}
      </Form.Label>

      <div className="text-center my-4">
        <h1 className="my-4">"OR"</h1>
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

export default LoginForm;
