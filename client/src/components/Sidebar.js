import React from 'react';
import './Sidebar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { IoMdHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <>        
        <div className="nav-menu">
            <ul className="nav-menu-items">
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    </>
  )
}

export default Sidebar