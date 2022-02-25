import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

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
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="First Name"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last Name"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                placeholder="Phone number"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
      
          <Button variant="primary" type="submit">Add</Button>
        </Form>
      </div>
    );
}

export default AddClientView;