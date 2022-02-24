import React from 'react';
import './Clients.css'
import { Link } from 'react-router-dom';

function Clients(props) {
  return (
    <div className="clients-view">
      <h1>Clients</h1>
      <br/>
      <Link to="/add-client">+ Add New client</Link>
      <table className="client-list">
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
      </table>
    </div>
  );
}

export default Clients;