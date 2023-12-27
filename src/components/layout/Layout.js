import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onerMenu, adminMenu, doctorMenu } from '../../utils/DataSidebar';
import './style.css';
import { message, Button, Modal } from 'antd';
import { AiFillLeftCircle } from 'react-icons/ai'
import { IoMdNotifications } from 'react-icons/io'
import HeartLine from '../loading/HeartLine';
import { ExclamationCircleFilled } from '@ant-design/icons';
import Snowfall from '../snowFall/Snowfall';
import LogoMedme from '../../assets/img/logo.png'
import { MdOutlineContactSupport } from "react-icons/md";

const Layout = ({ children }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [sideOpen, setSideOpen] = useState(false)

    let admin = localStorage.getItem('admin') || {}
    const SidebarMenu = admin === "doctor" ? doctorMenu : admin === "reception" ? adminMenu : onerMenu



    const OpenSID = () => {
        setSideOpen(i => !i)
    }
    const { LineLoad } = useSelector(state => state.lines)
    let category = localStorage.getItem('ClientLength')
    let doctorName = localStorage.getItem('doctorName')
    let dataFalse = localStorage.getItem('dataFalse')

    function Catigory() {
        if (admin === "doctor") {
            return "Doktor"
        } else if (admin === "reception") {
            return "Resepshin"
        } else if (admin === "owner") {
            return "Derektor"
        }
    }

    // --------------------Log out--------------

    const { confirm } = Modal;
    const showDeleteConfirm = () => {
        confirm({
            title: 'Tizimdan chiqmoqchimisiz?',
            icon: <ExclamationCircleFilled />,
            okText: 'Ha',
            okType: 'danger',
            cancelText: "Yo'q",
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    setTimeout(() => {
                        localStorage.clear()
                        message.success("Logout Successfully")
                        navigate("/")
                    }, 1000);
                }).catch(() => console.log('Oops errors!'));

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <div className='Main-Lay'>
            <div className="Layout">
                <div className="SidCont">
                    <div className={`Sidebar ${sideOpen ? "sideOpen" : "Sidebar"}`}>
                        <div className="SidebarHeader">
                            <button className={`OpenWindowSid ${sideOpen ? "OpenWindowRight" : ""}`} ><AiFillLeftCircle onClick={() => OpenSID()} /></button>

                            <img onClick={() => OpenSID()} className={` ${sideOpen ? "LogoNone" : "noneLogo"}`} width={120} src={LogoMedme} alt="" />
                        </div>
                        <div className="menu">
                            {
                                SidebarMenu?.map((menu, inx) => {
                                    const isActive = location.pathname === menu.path
                                    return (

                                        // <Link to={menu.path} key={inx} className={`menu-item `}>
                                        <Link to={menu.path} key={inx} className={`menu-item ${isActive && "active"}`}>

                                            <i className={menu.icon}></i>

                                            <div className={` ${sideOpen ? "LinkNone" : "noneText"}`} >
                                                {menu.name}
                                            </div>

                                            <p className='MobileSidText'>{menu.name}</p>
                                        </Link>

                                    )
                                })
                            }

                            <Button
                                className='menu-item log'
                                onClick={showDeleteConfirm} type="dashed"

                            >
                                <i className='fa fa-sign-out'></i>

                                <div className={`${sideOpen ? "LinkNone" : "noneText"}`}  >
                                    Tizimdan chiqish
                                </div>
                                <p className='MobileSidText'>Chiqish</p>

                            </Button>



                        </div>
                        <Link
                            to="/support"
                            className='supportBtn'


                        ><MdOutlineContactSupport /> Qo'llab quvvatlash</Link>
                    </div>
                </div>
                <div className="content">
                    <div className="MainNavbar">
                        <b>{Catigory()}: <i style={{ color: 'dodgerblue' }}>{doctorName}</i></b>
                        {admin === "owner"
                            ? "" :
                            <button>
                                <IoMdNotifications />
                                {admin === "doctor" ?
                                    <p className={+category === 0 ? "NotifNone" : "NotifBlock"}>{category}</p>
                                    :
                                    <p className={+dataFalse === 0 ? "NotifNone" : "NotifBlock"}>{dataFalse}</p>
                                }
                            </button>
                        }
                        <Snowfall />
                    </div>
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