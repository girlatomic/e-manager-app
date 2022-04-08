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
      if (props.loginError) {console.log(props.loginError)}
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
     <div className="container d-flex justify-content-center">
      <form className="user-form" onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <h2>Log In</h2>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
              <input
              type="text"
              name="username"
              value={formData.username}
              className="form-control"
              onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              />
            </div>
        
            <div>
              <button type="submit" className="btn btn-primary">Log In</button>
            </div>
        </form>
        
        {/* <SubmitModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalInfo={modalInfo}
            /> */}
     </div>

  )
}

export default LogIn