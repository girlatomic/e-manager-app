import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import {AiFillTool} from 'react-icons/ai';
import API from "../helpers/API";
import AssignJobForm from '../components/AssignJobForm';

function Repairs(props) {
  const [input, setInput] = useState("");
  const [repairs, setRepairs] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [jobToEdit, setJobToEdit] = useState({});
  const [showReassign, setShowReassign] = useState(false)

  useEffect(() => {
    getRepairs();
  }, []);

  const getRepairs = async () => {
    let response = await API.getContent('/repairs');
    if (response.ok) {
      setRepairs(response.data)
    }
    else {
      setErrorMsg(response.error)
    }
  };

  const handleSearch = (e) => {
    setInput(e.target.value)
  };


  const handleReassign = async (id) => {
    let response = await API.getContent(`/repairs/${id}`);
    if (response.ok) {
      setJobToEdit(response.data[0]);
    }
    else {
      setErrorMsg(response.error)
    }
    setShowReassign(true);
  }

  const updateJobList = async (updatedJob, jobid) => {
    let response = await API.updateContent(`/repairs/${jobid}`, updatedJob);
    if (response.ok) {
      setRepairs(response.data)
    }
    else {
      setErrorMsg(response.error);
    }
    setShowReassign(false);
  }

  return (
    <Container>
      <h2><AiFillTool/>Repairs</h2>
      <Row>
        <Col className="text-start mt-5 mb-5">
          <Link to="/add-repair" className="btn btn-primary" role="button">+ Add Repair</Link>
        </Col>
        <Col>
       <div className="input-group mt-5 mb-5">
                <input
                className="form-control me-2"
                name="input"
                placeholder="Search..."
                type="text"
                value={input}
                onChange={(e) => handleSearch(e)}
                aria-label="Search"
                />
            </div>
        </Col>
     </Row>

      <Table bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Brand</th>
            <th>Serial number</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Client name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            repairs
            .filter(r => {
              if (input === "") {
                return r
              } 
              else if (r.model.toLowerCase().includes(input.toLowerCase())) {
                return r
              }
              else if (r.brand.toLowerCase().includes(input.toLowerCase())) {
                return r
              }
              else if (r.serial_number.toLowerCase().includes(input.toLowerCase())) {
                return r
              }
              else if (r.first_name.toLowerCase().includes(input.toLowerCase())) {
                return r
              }
              else if (r.last_name.toLowerCase().includes(input.toLowerCase())) {
                return r
              }
            })
            .map(r => (
              <tr key={r.repair_id}>
                <td>{r.repair_id}</td>
                <td>{r.model}</td>
                <td>{r.brand}</td>
                <td>{r.serial_number}</td>
                <td>{r.repair_status}</td>
                <td>{r.username}</td>
                <td>{r.first_name} {r.last_name}</td>
                <td><button className="btn btn-primary me-3" onClick={e => handleReassign(r.repair_id)}>Reassign</button><button className="btn btn-primary">Edit</button></td>
              </tr>
            ))
          }
        </tbody>
      </Table>

    {showReassign && jobToEdit && <AssignJobForm jobToEdit={jobToEdit} updateJobListCB={(updatedJob, jobid) => updateJobList(updatedJob, jobid)} /> }
    
    </Container>
  );
}

export default Repairs;