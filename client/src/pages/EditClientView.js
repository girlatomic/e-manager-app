import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../helpers/API";
import SubmitModal from "../components/Modal";
import { AiOutlineForm } from "react-icons/ai";
import ClientForm from "../components/ClientForm";

const EditClientView = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  let { id } = useParams();
  const [client, setClient] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [modalShow, setModalShow] = useState(false);
  const modalInfo = {
    title: "Client edited!",
    closetext: "Do more edits",
    backtext: "Go back to Clients list",
    backpath: "/clients",
  };

  useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    let response = await API.getContent(`/clients/${id}`);
    if (response.ok) {
      setClient(response.data);
    } else {
      setErrorMsg(response.error);
    }
  };

  const handleEditClient = async (updatedClientObj) => {
    let response = await API.updateContent(`/clients/${id}`, updatedClientObj);
    if (response.ok) {
      console.log("Client edited!");
      setModalShow(true);
    } else {
      setErrorMsg(response.error);
    }
  };

  return (
    <div className="content">
      <div className="me-5 mb-5">
        <h2>
          <AiOutlineForm />
          Edit Client Info
        </h2>
      </div>
      <ClientForm
        client={client}
        editClientCb={(updatedClientObj) => handleEditClient(updatedClientObj)}
        user={props.user}
        formType="Edit"
      />

      <SubmitModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalInfo={modalInfo}
      />
    </div>
  );
};

export default EditClientView;
