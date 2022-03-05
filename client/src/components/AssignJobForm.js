import React, {useState, useEffect} from "react";
import API from "../helpers/API";

function AssignJobForm(props) {
    const [assignedTo, setAssignedTo] = useState("");
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getUsers();
    }, []);
    
    const getUsers = async () => {
        let response = await API.getContent('/users');
        if (response.ok) {
            let users = response.data;
            setUsers(users);
        }
        else {
          setErrorMsg(response.error)
        }
      };
    
    const handleChange = (e) => {
        setAssignedTo(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedJob = props.jobToEdit.current;
        updatedJob.assignedto = assignedTo;
        console.log(updatedJob);
    }

    return (
    <div>
            <form onSubmit={e => handleSubmit(e)}>
            <h3>Assign Job</h3>
            
            <select
            name="assignedto"
            onChange={e => handleChange(e)}
            className="form-select"
            value={assignedTo}
            >
            <option value="" hidden>
              Select user
            </option>
            {
                users.map(u => (
                    <option key={u.userid} value={u.userid}>{u.username}</option>
                ))
            }
          </select>

          <button type="submit">OK</button>
        </form>

        Assigned to: {assignedTo}
    </div>
    );
}

export default AssignJobForm;