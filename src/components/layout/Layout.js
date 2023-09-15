import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onerMenu, adminMenu, doctorMenu } from '../../utils/DataSidebar';
import './style.css';
import { Badge, message } from 'antd';

const Layout = ({ children }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)

    let admin = localStorage.getItem('admin') || {}

    const SidebarMenu = admin === "doctor" ? doctorMenu : admin === "Reception" ? adminMenu : onerMenu

    const handleLogout = () => {
        localStorage.clear()
        message.success("Logout Successfully")
        navigate("/login")
    }

    // const SidebarMenu = onerMenu

    return (
        <div className='Main-Lay'>
            <div className="Layout">
                <div className="Sidebar">
                    <div className="login">
                        <h6>DOC APP</h6>
                        <hr />
                    </div>
                    <div className="menu">
                        {/* {adminMenu.map((menu, inx) => { */}
                        {
                            SidebarMenu?.map((menu, inx) => {
                                const isActive = location.pathname === menu.path
                                return (

                                    <div key={inx} className={`menu-item ${isActive && "active"}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>
                                            {menu.name}
                                        </Link>
                                    </div>

                                )
                            })
                        }
                        <div className={`menu-item `} onDoubleClick={handleLogout}>
                            <i className='fa fa-sign-out'></i>
                            <Link to="/login">
                                Tizimdan chiqish
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        <div className="header-content">
                            <Badge count={user && user.notifcation.length} onClick={() => { navigate("/notification") }}>
                                <i style={{ cursor: 'pointer' }} className="fa fa-bell" aria-hidden="true"></i>
                            </Badge>
                            <Link to="/profilr">{user?.name}</Link>
                        </div>
                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
    )
}
export default Layout