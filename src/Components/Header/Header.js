import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSubway } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const trainIcon = <FontAwesomeIcon icon={faSubway} />;

  return (
    <Navbar variant="dark" className="sticky-top p-5" bg="transparent">
      <Link to="/">
        <Navbar.Brand>
          <h4>{trainIcon} MetroRail Sheba</h4>
        </Navbar.Brand>
      </Link>
      <Nav className="ml-auto mr-2" variant="light">
        <Link className="nav-link mx-2" to="/">
          Home
        </Link>

        <Link className="nav-link mx-2" to="/destination">
          Destination
        </Link>

        <Link className="nav-link mx-2" to="/blog">
          Blog
        </Link>

        <Link className="nav-link mx-2" to="/contact">
          Contact
        </Link>

        <Link to="/login">
          <Button className="mx-2 px-5" variant="warning">
            Login
          </Button>
        </Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
