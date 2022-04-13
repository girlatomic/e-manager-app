import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import API from "../helpers/API";
import { BsCardChecklist } from "react-icons/bs";

const MyJobs = (props) => {
  const [myRepairs, setMyRepairs] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [filter, setFilter] = useState("Show all");

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
    } else {
      setErrorMsg(response.error);
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="content">
      <div className="mb-5 me-5">
        <h2>
          <BsCardChecklist className="me-2" />
          My Jobs
        </h2>
      </div>

      <div className="mt-5 mb-4">
        <label className="me-2">Filter by status:</label>
        <select onChange={(e) => handleFilter(e)}>
          <option value="Show all">Show all</option>
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
          <option value="Can't be repaired">Can't be repaired</option>
          <option value="Repaired">Repaired</option>
        </select>
      </div>

      <div className="me-5">
        <Table bordered responsive>
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
            {myRepairs
              .filter((r) => {
                if (filter === "Show all") {
                  return r;
                } else if (r.repair_status === filter) {
                  return r;
                }
              })
              .map((r) => (
                <tr key={r.repair_id}>
                  <td>{r.repair_id}</td>
                  <td>{r.model}</td>
                  <td>{r.brand}</td>
                  <td>{r.serial_number}</td>
                  <td>{r.repair_status}</td>
                  <td>
                    {r.first_name} {r.last_name}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyJobs;
