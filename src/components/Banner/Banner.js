import React from 'react'
import './Banner.css'
import Input from '../Generic/Input/Input'
import Button from '../Generic/Button/Button'

const Banner = () => {
  const Style = {
    width: "300px",
    height: "46px",
    borderRadius: "8px",
    fontSize: "18px",
  }
  return (

    <div className='ContenierBanner'>
      <div className="BannerMalumot">
        <h1>Medme нима?</h1>
        <p>Хусусий клиникалар учун тиббиёт соҳасида автоматлаштириш тизими клиника фаолиятини электронлаштириш учун мўлжалланган.</p>
      </div>
      <div className="BannerInputBtn">
        <div className='BannerMalumoth1'>
          <h2>Демога сўров қолдирш</h2>
          <p>ва Медме ҳақида батафсил ПРEЗИНТАЦИЯГА эга бўлинг!</p>
        </div>
        <Input placeholder="Ismingiz" style={Style} type="text" />
      </div>
    </div>
  )
}

export default Banner;