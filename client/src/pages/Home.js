import React from 'react'
import {Link} from 'react-router-dom';

const Home = () => {
  return (
     <div className='home d-flex flex-column justify-content-center align-items-center'>
      <h1>Welcome to e·Manager!</h1>
      <div className="d-flex">
      <Link className="btn btn-primary me-3" to="/signup">Create New Account</Link>
      <Link className="btn btn-primary" to="/login">Log In</Link>
      </div>
      
     </div>

  )
}

export default Home