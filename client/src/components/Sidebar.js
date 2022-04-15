import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { FaHome } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import { AiFillTool } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { RiUserSettingsFill } from "react-icons/ri";
import { BsGearFill } from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

function Sidebar(props) {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    props.onCollapse(inactive);
  }, [inactive]);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <BsFillArrowRightSquareFill />
          ) : (
            <BsFillArrowLeftSquareFill />
          )}
        </div>
      </div>
      <div className="main-menu">
        <ul>
          {!props.user && (
            <li>
              <NavLink className="menu-item" to="/">
                <div className="menu-icon">
                  <FaHome />
                </div>
                <span>Home</span>
              </NavLink>
            </li>
          )}

          {props.user && props.user.usertype === "admin" && (
            <li>
              <NavLink className="menu-item" to="/manageusers">
                <div className="menu-icon">
                  <RiUserSettingsFill />
                </div>
                <span>Manage Users</span>
              </NavLink>
            </li>
          )}

          {props.user && (
            <div>
              <li>
                <NavLink className="menu-item" to="/myjobs">
                  <div className="menu-icon">
                    <BsCardChecklist />
                  </div>
                  <span>My Jobs</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="menu-item" to="/mysettings">
                  <div className="menu-icon">
                    <BsGearFill />
                  </div>
                  <span>My Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="menu-item" to="/repairs">
                  <div className="menu-icon">
                    <AiFillTool />
                  </div>
                  <span>All Repairs</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="menu-item" to="/clients">
                  <div className="menu-icon">
                    <IoMdPeople />
                  </div>
                  <span>Clients</span>
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
