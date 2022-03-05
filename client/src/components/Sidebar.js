import React from 'react';
import './Sidebar.css';
import {FaHome} from 'react-icons/fa';
import {BsCardChecklist} from 'react-icons/bs';
import {IoMdPeople} from 'react-icons/io';
import {AiFillTool} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

function Sidebar(props) {
  return (  
    <nav className="nav-menu">
            
            <div className="nav-menu-items">
                    <div className="d-flex"><NavLink className={({ isActive }) => (isActive ? 'active sb-link text-light ps-3' : 'sb-link text-light ps-3')} to="/" ><FaHome className="me-2"/>Home</NavLink></div> 
                    {props.user && props.user.usertype === "admin" && (
                      <div className="d-flex align-items-center justify-content-center"><NavLink className={({ isActive }) => (isActive ? 'active sb-link text-light ps-3' : 'sb-link text-light ps-3')} to="/manageusers" ><BsCardChecklist className="me-2"/>Manage Users</NavLink></div>
                    )}
                    
                    {props.user && (
                    <div>
                    <div className="d-flex align-items-center justify-content-center"><NavLink className={({ isActive }) => (isActive ? 'active sb-link text-light ps-3' : 'sb-link text-light ps-3')} to="/myjobs" ><BsCardChecklist className="me-2"/>My Jobs</NavLink></div> 
                    <div className="d-flex align-items-center justify-content-center"><NavLink className={({ isActive }) => (isActive ? 'active sb-link text-light ps-3' : 'sb-link text-light ps-3')} to="/repairs" ><AiFillTool className="me-2"/>All Repairs</NavLink></div> 
                    <div className="d-flex align-items-center justify-content-center"><NavLink className={({ isActive }) => (isActive ? 'active sb-link text-light ps-3' : 'sb-link text-light ps-3')} to="/clients" ><IoMdPeople className="me-2"/>Clients</NavLink></div>
                    </div> 
                    )
                    }
            </div>
        </nav>      
      
  )
}

export default Sidebar

        