import React, {useRef} from 'react';
import './Clients.css'
import { Link } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

function Clients(props) {
  const inputEl = useRef("");
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <Container>
      <h1>Clients</h1>
     <Row>
       <Col className="text-center mt-5 mb-2">
         <Link to="/add-client" className="btn btn-primary" role="button">Add New client</Link>
       </Col>
     </Row>
     <Row>
       <div>
         <input
          ref={inputEl}
          type="text" 
          placeholder="Search"
          value={props.term}
          onChange={getSearchTerm}
         />
       </div>
     </Row>
        <Table bordered>
          <thead>
            <tr>
              <th>id</th>
              <th>first name</th>
              <th>last name</th>
              <th>phone</th>
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
                </tr>
              ))
            }
          </tbody>
        </Table>
    </Container>
  );
}

export default Clients;