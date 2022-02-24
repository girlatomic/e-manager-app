import React from 'react';
import { Link } from 'react-router-dom';

function Repairs(props) {
  return (
    <div className="repairs-view">
      <h1>Repairs</h1>
      <br/>
      <Link to="/add-repair">+ Add Repair</Link>
      <table className="repair-list">
        <thead>
          <tr>
            <th>id</th>
            <th>model</th>
            <th>brand</th>
            <th>client id</th>
            <th>client</th>
            <th>status</th>
            <th>serial number</th>
          </tr>
        </thead>
        <tbody>
          {
            props.repairs.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.model}</td>
                <td>{r.brand}</td>
                <td>{r.client_id}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Repairs;