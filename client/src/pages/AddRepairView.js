import React, { useState } from "react";
import RepairForm from "../components/RepairForm";
import { AiOutlineForm } from "react-icons/ai";
import API from "../helpers/API";
import SubmitModal from "../components/Modal";
import { Container } from "react-bootstrap";

const AddRepairView = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [job, setJob] = useState({
    model: "",
    brand: "",
    serial_number: "",
    repair_status: "",
    client_id: "",
    assignedto: "",
    notes: "",
  });

  const modalInfo = {
    title: "Repair added!",
    closetext: "Add another repair",
    backtext: "Go back to Repairs list",
    backpath: "/repairs",
  };

  const handleAddRepair = async (newRepairObj) => {
    let response = await API.addContent("/repairs", newRepairObj);
    if (response.ok) {
      console.log("Repair added!");
      setModalShow(true);
    } else {
      setErrorMsg(response.error);
    }
  };

  return (
    <Container>
      <div className="mb-5">
        <h2>
          <AiOutlineForm />
          New Repair Order
        </h2>
      </div>
      <RepairForm
        user={props.user}
        job={job}
        addRepairCb={(newRepairObj) => handleAddRepair(newRepairObj)}
        formType="Add"
      />

      <SubmitModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalInfo={modalInfo}
      />
    </Container>
  );
};

export default AddRepairView;
