import React from 'react'
import { Tab, Table } from 'react-bootstrap'

function ClientTable() {
  return (
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
  )
}

export default ClientTable