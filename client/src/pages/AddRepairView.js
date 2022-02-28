import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const INIT_STATE = {
  model: '',
  brand: '',
  serial_number: '',
  repair_status: '',
  client_id: '',
};

function AddRepairView(props) {
  const [repairForm, setRepairForm] = useState(INIT_STATE);

  function handleSubmit(event) {
    event.preventDefault();
    props.addRepairCb(repairForm);
    setRepairForm(INIT_STATE);
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setRepairForm(data => ({
      ...data,
      [name]: value
    }));
  }


  return (
    <Container className="addRepairView">
     
     <form className="row m-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-5">
          <h2>New Repair Order</h2>
        </div>
        <div className="mb-4 col-6">
          <label htmlFor="inputModel" className="form-label">Model</label>
          <input 
          type="text" 
          name="model"
          value={repairForm.model}
          onChange={handleChange}
          className="form-control" 
          id="inputEmail4"/>
        </div>
        <div className="mb-4 col-md-6">
          <label htmlFor="inputBrand" className="form-label">Brand</label>
          <input 
          type="text" 
          name="brand"
          value={repairForm.brand}
          onChange={handleChange}
          className="form-control" 
          id="inputBrand4"/>
        </div>
        <div className="mb-4 col-md-4">
          <label htmlFor="inputSerial" className="form-label">Serial Number</label>
          <input 
          type="text"
          name="serial_number"
          value={repairForm.serial_number}
          onChange={handleChange}
          className="form-control" 
          id="inputSerialN" 
          placeholder="IMEI"/>
        </div>
        <div className="mb-4 col-md-4">
          <label htmlFor="inputState" className="form-label">Status</label>
          <select id="inputState" className="form-select" name="repair_status" value={repairForm.repair_status}
           onChange={handleChange} required>
            <option value="">Choose...</option>
            <option>Not started</option>
            <option>In progress</option>
            <option>Can't be repaired</option>
            <option>Repaired</option>
          </select>
        </div>

        <div className="col-md">
          <label htmlFor="inputclient" className="form-label">Client</label>
          <input 
          type="text"
          name="client_id"
          value={repairForm.client_id}
          onChange={handleChange}
          className="form-control" 
          id="inputclient" 
          placeholder="client id"/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Problem reported by client</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div className="col-md-6 offset-md-5">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
    
    </Container>
  )
}

export default AddRepairView