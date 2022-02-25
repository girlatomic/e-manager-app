import React from 'react'
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
            e·Manager
          </a>
        </div>
      </nav>
    </div>
  )
}

export default Navbar