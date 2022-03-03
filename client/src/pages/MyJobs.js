import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import API from "../helpers/API";

const MyJobs = (props) => {
    const [myRepairs, setMyRepairs] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getRepairs();
    }, []);
    
    const getRepairs = async () => {
        let response = await API.getContent('/repairs');
        if (response.ok) {
            let repairs = response.data;
            let filtered = repairs.filter(r => r.assignedto === props.user.userid)
            setMyRepairs(filtered);
        }
        else {
          setErrorMsg(response.error)
        }
      };

    return (
     <div>
      <h1>My Jobs page</h1>
            
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Brand</th>
            <th>Serial number</th>
            <th>Status</th>
            <th>Client name</th>
          </tr>
        </thead>
        <tbody>
          {
            myRepairs
            .map(r => (
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
     </div>

  )
}

export default MyJobs