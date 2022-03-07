import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import RepairForm from '../components/RepairForm';
import {AiOutlineForm} from 'react-icons/ai';
import API from '../helpers/API';

const EditRepairView = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  let { repair_id } = useParams();
  const [job, setJob] = useState(
    {
        model: '',
        brand: '',
        serial_number: '',
        repair_status: '',
        client_id: '',
        assignedto: '',
        notes: ''
      }
  );
  

  useEffect(() => {
    getJob();
    }, []);

  const getJob = async () => {
    
    let response = await API.getContent(`/repairs/${repair_id}`);
    console.log(`The response was: ${response.ok}`);
    if (response.ok) {
      setJob(response.data[0]);
      console.log(job);
    }
    else {
      setErrorMsg(response.error)
    }
  }
  
  const handleEditRepair = async (updatedRepairObj) => {
      let response = await API.updateContent(`/repairs/${repair_id}`, updatedRepairObj);
      if (response.ok) {
        console.log("Repair edited!")
      }
      else {
        setErrorMsg(response.error)
      }
  }
  
  return (
     <div>
      <div className="mb-5">
          <h2><AiOutlineForm/>Edit Repair Order</h2>
        </div>
      <RepairForm job={job} editRepairCB={(updatedRepairObj) => handleEditRepair(updatedRepairObj)} user={props.user} formType="Edit" />
     </div>

  )
}

export default EditRepairView