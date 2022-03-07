import React, {useState} from 'react';
import RepairForm from '../components/RepairForm';
import {AiOutlineForm} from 'react-icons/ai';
import API from '../helpers/API';

const AddRepairView = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [job, setJob] = useState({
    model: '',
    brand: '',
    serial_number: '',
    repair_status: '',
    client_id: '',
    assignedto: '',
    notes: ''
  })

  const handleAddRepair = async (newRepairObj) => {
      let response = await API.addContent('/repairs', newRepairObj);
      if (response.ok) {
        console.log("Repair added!")
      }
      else {
        setErrorMsg(response.error)
      }
  }
  
  return (
     <div>
      <div className="mb-5">
          <h2><AiOutlineForm/>New Repair Order</h2>
        </div>
      <RepairForm user={props.user} job={job} addRepairCb={(newRepairObj) => handleAddRepair(newRepairObj)} formType="Add" />
     </div>

  )
}

export default AddRepairView