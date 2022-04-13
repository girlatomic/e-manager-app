import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home d-flex" id="home">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h1>Welcome to e·Manager!</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <Link className="btn btn-primary me-3" to="/signup">
              Create New Account
            </Link>
            <Link className="btn btn-primary me-3" to="/login">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
