import React from 'react'
import './Navbar.css'
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import Logo from '../../img/LogoOneMed.png'

const Navbar = () => {
    return (
        <div className='ContenierNav'>
            <div className="Navbar">
                <div className="NavbarMedme">
                    <img width={180} src={Logo} alt="" />
                    <p>Electronicization of clinic activities</p>
                </div>
                <div className="NavbarIcon">
                    <div className="NavbarManzil">
                        <h5>+998 94 432 44 54</h5>
                        <h5>Наманган, Алишер Навоий кўчаси, 36-уй</h5>
                    </div>
                    <div className="NavIcon">
                        <div className="NavbarInsta">
                            <a href="https://www.instagram.com/">
                                <AiFillInstagram />
                            </a>
                        </div>
                        <div className="NavbarInsta">
                            <a href="https://www.youtube.com/">
                                <FaYoutube />
                            </a>
                        </div>
                        <div className="NavbarInsta">
                            <a href="https://web.telegram.org/k/">
                                <FaTelegramPlane />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;