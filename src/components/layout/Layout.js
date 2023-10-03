import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onerMenu, adminMenu, doctorMenu } from '../../utils/DataSidebar';
import './style.css';
import { Badge, message } from 'antd';
import { AiFillLeftCircle } from 'react-icons/ai'

import HeartLine from '../loading/HeartLine';

const Layout = ({ children }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const [sideOpen, setSideOpen] = useState(false)

    let admin = localStorage.getItem('admin') || {}

    const SidebarMenu = admin === "doctor" ? doctorMenu : admin === "Reception" ? adminMenu : onerMenu

    const handleLogout = () => {
        localStorage.clear()
        message.success("Logout Successfully")
        navigate("/login")
        console.log('Ok');
    }

    const OpenSID = () => {
        setSideOpen(i => !i)
    }
    const { LineLoad } = useSelector(state => state.lines)

    return (
        <div className='Main-Lay'>
            <div className="Layout">
                <div className="SidCont">
                    <div className={`Sidebar ${sideOpen ? "sideOpen" : "Sidebar"}`}>
                        <div className="SidebarHeader">
                            <h6 className={` ${sideOpen ? "LinkNone" : "noneText"}`}>DOC APP</h6>
                            <button className={`OpenWindowSid ${sideOpen ? "OpenWindowRight" : ""}`} ><AiFillLeftCircle onClick={() => OpenSID()} /></button>
                            <p className='MobileSidText'>DOC APP</p>
                        </div>
                        <div className="menu">
                            {
                                SidebarMenu?.map((menu, inx) => {
                                    const isActive = location.pathname === menu.path
                                    return (

                                        // <Link to={menu.path} key={inx} className={`menu-item `}>
                                        <Link to={menu.path} key={inx} className={`menu-item ${isActive && "active"}`}>

                                            <i className={menu.icon}></i>

                                            <Link className={` ${sideOpen ? "LinkNone" : "noneText"}`} to={menu.path}>
                                                {menu.name}
                                            </Link>

                                            <p className='MobileSidText'>{menu.name}</p>
                                        </Link>

                                    )
                                })
                            }

                            <Link className={`menu-item `} onDoubleClickCapture={handleLogout} to="/login">
                                <i className='fa fa-sign-out'></i>

                                <Link className={`${sideOpen ? "LinkNone" : "noneText"}`} onClick={handleLogout} to="/login">
                                    Tizimdan chiqish
                                </Link>
                                <p className='MobileSidText'>Chiqish</p>

                            </Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {LineLoad ?
                        <div className="BoxLine">
                            <div>
                                <HeartLine />
                            </div>
                        </div>
                        :
                        <div className="body">{children}</div>
                    }
                </div>
            </div>
        </div >
    )
}
export default Layout