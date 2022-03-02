import React from 'react'
import { Container } from 'react-bootstrap'

const Home = () => {
  return (
     <div className='home d-flex flex-column justify-content-center align-items-center'>
      <h1>Welcome to e·Manager!</h1>
      <div className="d-flex">
      <button className="btn btn-primary me-3">Create New Account</button>
      <button className="btn btn-primary">Log In</button>
      </div>
      
     </div>

  )
}

export default Home