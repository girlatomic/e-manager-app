import React, {useRef} from 'react';
import './Clients.css'
import { Link } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import * as IoIcons from 'react-icons/io';


function Clients(props) {
  const inputEl = useRef("");
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <Container>
      <h2><IoIcons.IoMdPeople />Clients</h2>
     <Row>
       <Col className="text-start mt-5 mb-5">
         <Link to="/add-client" className="btn btn-primary" role="button"> + Add New client</Link>
       </Col>
       <Col>
       <div className="input-group mt-5 mb-5">
         <input
          className="form-control me-2"
          ref={inputEl}
          type="text" 
          placeholder="Search"
          value={props.term}
          onChange={getSearchTerm}
         />
       </div>
       </Col>
     </Row>
        <Table bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              props.clients.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.first_name}</td>
                  <td>{c.last_name}</td>
                  <td>{c.phone}</td>
                  <td>
                    <Link to={`/edit-client/${c.id}`} type="button" className="btn btn-primary btn-sm">Edit</Link>
                    <Link to={`/edit-client/${c.id}`} type="button" className="btn btn-danger btn-sm">Delete</Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
    </Container>
  );
}

export default Clients;