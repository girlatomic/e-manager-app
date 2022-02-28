import React from 'react';
import './Sidebar.css';
import { SidebarData } from './SidebarData';

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