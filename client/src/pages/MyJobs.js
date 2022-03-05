import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import API from "../helpers/API";
import {BsCardChecklist} from 'react-icons/bs';

const MyJobs = (props) => {
    const [myRepairs, setMyRepairs] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getRepairs();
    }, []);
    
    const getRepairs = async () => {
        let userid = props.user.userid;
        let response = await API.getContent(`/repairs/user/${userid}`);
        // Get repairs by userid  
        if (response.ok) {
            let filtered = response.data;
            setMyRepairs(filtered);
        }
        else {
          setErrorMsg(response.error)
        }
      };

    return (
     <div className="container">
      <h2><BsCardChecklist className="me-2" />My Jobs</h2>
      <h3>Jobs in progress</h3>
      <p>[No jobs currently in progress]</p>


      <h3>Completed jobs</h3>      
      <Table bordered>
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