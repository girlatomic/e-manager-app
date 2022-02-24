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
      </table>
    </div>
  );
}

export default Repairs;