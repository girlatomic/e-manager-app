import React from 'react';
import './Sidebar.css';
import { SidebarData } from './SidebarData';
import {FaHome} from 'react-icons/fa';
import {BsCardChecklist} from 'react-icons/bs';
import {IoMdPeople} from 'react-icons/io';
import {AiFillTool} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

function Sidebar(props) {
  return (  
    <nav className="nav-menu">
            
            <div className="nav-menu-items">
                    <div className="nav-text"><NavLink to="/" ><FaHome className="me-2"/>Home</NavLink></div> 
                    {props.user && (
                    <div>
                    <div className="nav-text"><NavLink to="/myjobs" ><BsCardChecklist className="me-2"/>My Jobs</NavLink></div> 
                    <div className="nav-text"><NavLink to="/repairs" ><AiFillTool className="me-2"/>All Repairs</NavLink></div> 
                    <div className="nav-text"><NavLink to="/clients" ><IoMdPeople className="me-2"/>Clients</NavLink></div>
                    </div> 
                    )
                    }
            </div>
        </nav>      
      
  )
}

export default Sidebar

        