import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Local from "../helpers/Local";

function Navbar(props) {
  return (
    <nav id="navbar" className="navbar nav sticky-top">
      <div className="container-fluid">
        <div className="logo">
          <Link className="logo" to="/">
            <h3>e·Manager</h3>
          </Link>
        </div>

        {props.user ? (
          <div className="d-flex">
            <div className="d-flex justify-content-center align-items-center me-3">
              Welcome, {props.user.username}!
            </div>
            <Link
              className="btn btn-primary"
              to="/"
              onClick={() => props.logoutCB()}
            >
              Log out
            </Link>
          </div>
        ) : (
          <div>
            <Link className="btn btn-primary me-3" to="/signup">
              Sign up
            </Link>
            <Link className="btn btn-primary" to="/login">
              Log in
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
