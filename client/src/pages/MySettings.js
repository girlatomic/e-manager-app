import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import API from "../helpers/API";
import { BsCardChecklist } from "react-icons/bs";
import { RiUserSettingsFill } from "react-icons/ri";

const INIT_STATE = {
  newEmail: "",
  oldPassword: "",
  newPassword: "",
};

const MySettings = (props) => {
  const [formData, setFormData] = useState(INIT_STATE);

  const handleEmail = (e) => {
    e.preventDefault();
    let updatedUser = {
      username: props.user.username,
      email: formData.newEmail,
    };
    console.log(updatedUser);
    let route = "/auth/change_email";
    props.updateUserCB(updatedUser, route);
    setFormData(INIT_STATE);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    let updatedUser = {
      username: props.user.username,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    let route = "/auth/changepassword";
    props.updateUserCB(updatedUser, route);
    setFormData(INIT_STATE);
  };

  function handleChange(e) {
    let { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <div className="content">
      <h2 className="mb-5 me-5">
        <RiUserSettingsFill className="me-2" />
        My Settings
      </h2>

      <div className="d-flex flex-column align-items-center">
        <Form onSubmit={(e) => handleEmail(e)} className="user-form mb-4">
          <h4 className="mb-3">Update Email</h4>

          <div className="mb-3">
            <p className="d-block mb-1">Current email:</p>
            <p className="border p-2 text-muted">{props.user.email}</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Enter new email:</label>
            <input
              className="form-control"
              name="newEmail"
              value={formData.newEmail}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </Form>

        <Form className="user-form" onSubmit={(e) => handlePassword(e)}>
          <h4 className="mb-3">Update Password</h4>
          <div className="mb-3">
            <label className="form-label">Enter current password:</label>
            <input
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              className="form-control"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Enter new password:</label>
            <input
              className="form-control"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MySettings;
