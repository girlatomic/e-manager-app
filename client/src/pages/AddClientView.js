import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';

const INIT_STATE = {
    first_name: '',
    last_name: '',
    phone: ''
};

function AddClientView(props) {
    const [formData, setFormData] = useState(INIT_STATE);

    function handleSubmit(event) {
      event.preventDefault();
      props.addClientCb(formData);
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
     <Container className="addClientView">
        
        <form className="row m-4 rounded" onSubmit={handleSubmit}>
          <div className="mb-5 col-md-7 offset-md-2">
            <h2>New Client Form</h2>
          </div>
          <div className="mb-4 col-md-7 offset-md-2">
            <label htmlFor="inputName" className="form-label">First Name</label>
              <input
              type="text"
              name="first_name"
              value={formData.first_name}
              className="form-control"
              onChange={handleChange}
              />
            </div>
            <div className="mb-4 col-md-7 offset-md-2">
              <label htmlFor="inputLastName" className="form-label">Last Name</label>
              <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="form-control"
              />
            </div>
            <div className="mb-4 col-md-7 offset-md-2">
              <label htmlFor="inputPhone" className="form-label">Phone Number</label>
              <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              />
            </div>

            <div className="col-md-6 offset-md-5">
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
        </form>
      </Container>
    );
}

export default AddClientView;