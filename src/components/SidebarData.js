import React from 'react'
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Customers',
        path: '/customers',
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