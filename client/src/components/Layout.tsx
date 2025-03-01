import React from 'react'

import { Outlet } from "react-router"
import Navbar from './Navbar'
import Footer from './Footer'
const Layout: React.FC = () => {
    return (
        <div className={` min-h-screen  w-full `}>
            <Navbar />
            <Outlet />
            <Footer />

        </div>
    )
}

export default Layout