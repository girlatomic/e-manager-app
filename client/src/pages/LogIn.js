import React, {useState} from 'react';
import { Container } from 'react-bootstrap'

const INIT_STATE = {
    username: '',
    password: ''
};

const LogIn = (props) => {
    const [formData, setFormData] = useState(INIT_STATE);

    function handleSubmit(event) {
      event.preventDefault();
      props.logInCb(formData.username, formData.password);
      setFormData(INIT_STATE);
    }
  
    function handleChange(event) {
      let { name, value } = event.target;
      setFormData(data => ({
        ...data,
        [name]: value
      }));
    }
  
    return (
     <div>
      <form className="row m-4 rounded" onSubmit={handleSubmit}>
          <div className="mb-5 col-md-7 offset-md-2">
            <h2>Log In</h2>
          </div>
          <div className="mb-4 col-md-7 offset-md-2">
            <label htmlFor="username" className="form-label">Username</label>
              <input
              type="text"
              name="username"
              value={formData.username}
              className="form-control"
              onChange={handleChange}
              />
            </div>
            <div className="mb-4 col-md-7 offset-md-2">
              <label htmlFor="password" className="form-label">Password</label>
              <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              />
            </div>
        
            <div className="col-md-6 offset-md-5">
              <button type="submit" className="btn btn-primary">Log In</button>
            </div>
        </form>
     </div>

  )
}

export default LogIn