import React, { useEffect } from 'react';
import './style.css';

const Snowfall = () => {
    useEffect(() => {
        const container = document.getElementById('container');
        const count = 90;

        for (let i = 0; i < count; i++) {
            let leftSnow = Math.floor(Math.random() * container.clientWidth);
            let topSnow = Math.floor(Math.random() * container.clientHeight);
            let widthSnow = Math.floor(Math.random() * 25);
            let timeSnow = Math.floor((Math.random() * 5) + 5);
         

            let div = document.createElement('div');
            div.classList.add('snow');
            div.style.left = leftSnow + 'px';
            div.style.top = topSnow + 'px';
            div.style.width = widthSnow + 'px';
            div.style.height = widthSnow + 'px';
            div.style.animationDuration = timeSnow + 's';
            container.appendChild(div);
        }
    }, []); 

    return (
        <div id="container" >
            
        </div>
    );
};

export default Snowfall;