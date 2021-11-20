import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Customer',
        path: '/customer',
        icon: <IoIcons.IoIosBody />,
        cName: 'nav-text',
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: <IoIcons.IoIosBasket />,
        cName: 'nav-text',
    },
    {
        title: 'Products',
        path: '/products',
        icon: <IoIcons.IoIosShirt />,
        cName: 'nav-text',
    },
]