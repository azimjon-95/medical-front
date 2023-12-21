import React from 'react';
import './style.css';
import Loea from './heartline.png'

const HeartLine = () => {
    return (
        <div className='heart-Line'>
            <div className="heart-rate">
                <img src={Loea} alt="" />
                <div className="fade-in"></div>
                <div className="fade-out"></div>
            </div >
        </div >
    )
}

export default HeartLine
