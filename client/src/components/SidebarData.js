import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Clients',
        path: '/clients',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },

    {
      title: 'Repairs',
      path: '/repairs',
      icon: <AiIcons.AiFillTool />,
      cName: 'nav-text'
    }
];