import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

function Repairs(props) {

  return (
    <Container>
      <h1>Repairs</h1>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand"></a>
          <form className="d-flex">
            <input 
            type="text" 
            aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
     </nav>
     <Row>
      <Col className="text-center mt-5 mb-2">
        <Link to="/add-repair" className="btn btn-primary" role="button">Add Repair</Link>
      </Col>
     </Row>
      <Table bordered>
        <thead>
          <tr>
            <th>id</th>
            <th>model</th>
            <th>brand</th>
            <th>serial number</th>
            <th>status</th>
            <th>client name</th>
          </tr>
        </thead>
        <tbody>
          {
            props.repairs.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.model}</td>
                <td>{r.brand}</td>
                <td>{r.serial_number}</td>
                <td>{r.repair_status}</td>
                <td>{r.first_name} {r.last_name}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default Repairs;