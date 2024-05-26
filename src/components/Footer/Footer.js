import React from 'react';
import './Footer.css';
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";


export default function App() {
    return (
        <>

            <div className='SwiperBtn'>
                <div className="SorovBtn">
                    <button>ДEМОГА СЎРОВ ҚОЛДИРИНГ</button>
                </div>
                <div className="YozuvBtn">
                    <p>Наманган, Алишер Навоий кўчаси, 36-уй</p>
                    <p>Иш вақти: ҳар куни 10:00 дан 20:00 гача</p>
                </div>
                <div className="NumerBtn">
                    <p>94 432 44 54</p>
                    <p>modme.uz</p>
                </div>
                <div className="IconBtn">
                    <p><AiFillInstagram /></p>
                    <p><FaYoutube /></p>
                    <p><FaTelegramPlane /></p>
                </div>
            </div>

        </>
    );
}