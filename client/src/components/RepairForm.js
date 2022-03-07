import React, { useState, useEffect } from 'react';
import { Container, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import API from "../helpers/API";


const INIT_STATE = {
  model: '',
  brand: '',
  serial_number: '',
  repair_status: '',
  client_id: '',
  assignedto: '',
  notes: ''
};

function RepairForm(props) {
  const [repairFormData, setRepairFormData] = useState(INIT_STATE);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("")
  const [clients, setClients] = useState([]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Only admins can reassign jobs
    </Tooltip>
  );
  
  useEffect(() => {
      setRepairFormData(props.job);
      getUsers();
      getClients();
    }, [props.job]);
  
  const getUsers = async () => {
    let response = await API.getContent('/users');
    if (response.ok) {
      setUsers(response.data)
    }
    else {
      setErrorMsg(response.error)
    }
  }

  const getClients = async () => {
    let response = await API.getContent('/clients');
    if (response.ok) {
      setClients(response.data);
    }
    else {
      setErrorMsg(response.error)
    }
  }

    function handleSubmit(event) {
    event.preventDefault();
    if (props.formType === "Edit") {
      props.editRepairCB(repairFormData);
    }
    else if (props.formType === "Add") {
      props.addRepairCb(repairFormData);
      setRepairFormData(INIT_STATE);
    }
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setRepairFormData(data => ({
      ...data,
      [name]: value
    }));
  }


  return (
    <Container className="addRepairView">

     <form className="row m-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-4 col-6">
          <label htmlFor="inputModel" className="form-label">Model</label>
          <input 
          type="text" 
          name="model"
          value={repairFormData.model}
          onChange={handleChange}
          className="form-control" 
          id="inputEmail4"/>
        </div>
        <div className="mb-4 col-md-6">
          <label htmlFor="inputBrand" className="form-label">Brand</label>
          <input 
          type="text" 
          name="brand"
          value={repairFormData.brand}
          onChange={handleChange}
          className="form-control" 
          id="inputBrand4"/>
        </div>
        <div className="mb-4 col-md-4">
          <label htmlFor="inputSerial" className="form-label">Serial Number</label>
          <input 
          type="text"
          name="serial_number"
          value={repairFormData.serial_number}
          onChange={handleChange}
          className="form-control" 
          id="inputSerialN" 
          placeholder="IMEI"/>
        </div>
        <div className="mb-4 col-md-4">
          <label htmlFor="inputState" className="form-label">Status</label>
          <select id="inputState" className="form-select" name="repair_status" value={repairFormData.repair_status}
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
          <select className="form-select" name="client_id" value={repairFormData.client_id}
           onChange={handleChange} required>
            <option value="">Choose existing client</option>
            {clients.map(c => (
              <option value={c.id}>{c.first_name} {c.last_name}</option>
            ))}
          </select>
          {props.formType === "Add" && (
            <button className="btn btn-primary">Add new client</button>
          )}       
        </div>

       {props.user.usertype === "admin" ? (
          <div className="col-md">
          <label htmlFor="inputuser" className="form-label">Assigned to</label>
          <select className="form-select" name="assignedto" value={repairFormData.assignedto}
           onChange={handleChange} required>
            <option value="">Choose...</option>
            {users.map(u => (
              <option value={u.userid}>{u.username}</option>
            ))}
          </select>
          </div>
       ) : <div className="col-md">
              <div>Assigned to: </div>
              <div>{props.job.assignedto} 
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
              <button className="btn btn-secondary">?</button>
              </OverlayTrigger>
  
              </div></div>} 

        

        <div className="mb-3">
          <label htmlFor="ControlTextarea1" className="form-label">Notes</label>
          <textarea className="form-control" id="ControlTextarea1" rows="3" name="notes" value={repairFormData.notes} onChange={handleChange}></textarea>
        </div>

        <div className="col-md-6 offset-md-5">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>

    </Container>
  )
}

export default RepairForm