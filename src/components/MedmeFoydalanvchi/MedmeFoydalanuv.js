import React from 'react'
import './MedmeFoydalanuv.css'

const MedmeFoydalanuv = () => {
  return (
    <div className='ContenierMedmeFoydalanuv'>
      <div className="MedmeFoydalanuv">
        <div className="MedmeFoydalanuvNomi">
          <h1>Модме платформаси фойдаланувчилари рақамларда</h1>
        </div>
        <div className="MedmeFoydalanuvSoni1">
          <div className="MedmeFoydalanuvSoniBox1">
            <p>Клиника марказлар сони</p>
            <div className="MedmeFoydalanuvBox">
              <h3>50+</h3>
            </div>
          </div>
          <div className="MedmeFoydalanuvSoniBox1">
            <p>Филиаллар сони</p>
            <div className="MedmeFoydalanuvBox">
              <h3>10+</h3>
            </div>
          </div>
          <div className="MedmeFoydalanuvSoniBox1">
            <p>Пацентлари сони</p>
            <div className="MedmeFoydalanuvBox">
              <h3>10000+</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedmeFoydalanuv;