import React, { useEffect, useState } from "react";

const INIT_STATE = {
  first_name: "",
  last_name: "",
  phone: "",
};

function ClientForm(props) {
  const [formData, setFormData] = useState(INIT_STATE);

  useEffect(() => {
    setFormData(props.client);
  }, [props.client]);

  function handleSubmit(event) {
    event.preventDefault();
    if (props.formType === "Edit") {
      props.editClientCb(formData);
    } else if (props.formType === "Add") {
      props.addClientCb(formData);
      setFormData(INIT_STATE);
    }
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <form className="row m-4 rounded" onSubmit={handleSubmit}>
      <div className="mb-4 col-md-7 offset-md-2">
        <label htmlFor="inputName" className="form-label">
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4 col-md-7 offset-md-2">
        <label htmlFor="inputLastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-4 col-md-7 offset-md-2">
        <label htmlFor="inputPhone" className="form-label">
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="col-md-6 offset-md-5">
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
}

export default ClientForm;
