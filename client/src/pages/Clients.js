import React, {useState, useEffect} from 'react';
import './Clients.css';
import API from "../helpers/API";
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import * as IoIcons from 'react-icons/io';


function Clients(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
      let response = await API.getContent('/clients');
      console.log(response.data);
      if (response.ok) {
        setClients(response.data)
      }
      else {
        setErrorMsg(response.error)
      }
    };

  if (errorMsg) {
    return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
  }

  if (!clients) {
    return <h2>Loading...</h2>;
  } 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  };

  return (
    <Container>
      <h2><IoIcons.IoMdPeople />Clients</h2>
     <Row>
       <Col className="text-start mt-5 mb-5">
         <Link to="/add-client" className="btn btn-primary" role="button"> + Add new client</Link>
       </Col>
       <Col>
       <div className="input-group mt-5 mb-5">
         <input
          className="form-control me-2"
          type="text" 
          placeholder="Search"
          name="search-term"
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
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
              clients
                .filter (c => {
                  if (searchTerm === "") {
                    return c
                  }
                  else if (c.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return c
                  }
                  else if (c.last_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return c
                  }
                  else if (c.phone.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return c
                  }
                }
                  )
                .map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.first_name}</td>
                  <td>{c.last_name}</td>
                  <td>{c.phone}</td>
                  <td>
                    <Link to={`/edit-client/${c.id}`} type="button" className="btn btn-primary btn-sm">Edit</Link>
                    <button className="btn btn-danger btn-sm">Delete</button>
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