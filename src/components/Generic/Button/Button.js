import React from 'react'
import './Button.css'

const Button = ({ nameBtn, style, onClick }) => {
    return (
        <button className='buttonGeneric' onClick={onClick} style={style}>{nameBtn}</button>
    )
}

export default Button;