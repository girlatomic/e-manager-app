import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

function Repairs(props) {
  const inputEl = useRef("");
  const getRepairSearchTerm = () => {
    props.searchRepKeyword(inputEl.current.value);
  };

  return (
    <Container>
      <h1>Repairs</h1>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand"></a>
          <form className="d-flex">
            <input
            className="form-control me-2"
            ref={inputEl}
            placeholder="Search..."
            type="text"
            value={props.term}
            onChange={getRepairSearchTerm}
            aria-label="Search"
            />
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