import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

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
     <div>
        <h2>New Client Form</h2>
        <Form onSubmit={handleSubmit}>
            <input
            placeholder="First Name"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            />
    
            <input
            placeholder="Last Name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            />

            <input
            placeholder="Phone number"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            />
    
            <button type="submit">Add</button>
        </Form>
      </div>
    );
}

export default AddClientView;