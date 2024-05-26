import React from 'react'
import './Medme1.css'
import MedmeImg from '../../img/MedmeImg.png'
import MedmeBoxImg from '../../img/MedmeBoxImg.png'
import MedmeImg3 from '../../img/MedmeImg3.png'
import MedmeImg4 from '../../img/MedmeImg4.png'


const Medem = () => {
    return (
        <div className='ContainerMedme'>
            <div className="MedmeSababBox">
                <div className="SababBox1">
                    <div className="SababYozuv">
                        <div className="SababYozuvBox">
                            <h3>ДАРОМАДИНГИЗНИ ОШИРАСИЗ</h3>
                            <p>Сотув бўлими ва админстрациядаги жараёнларни автоматлаштириш билан иш самарадорлигига эришиш ва шу орқали даромадингиз оширишингиз мумкин.</p></div>
                    </div>
                    <div className="SababImg1">
                        <img src={MedmeImg} alt="" />
                    </div>
                </div>
                <div className="SababBox2">
                    <div className="SababYozuv">
                        <div className="SababYozuvBox">
                            <h3>СТРАТEГИК РИВОЖЛАНИШ</h3>
                            <p>Ўқув марказингиздаги такрорий вазифаларни автоматлаштириш орқали операцион бошқарувдан чиқиш ва бизнесни стратегик ривожланишига вақт ажратиш.</p>
                        </div>
                    </div>
                    <div className="SababImg2">
                        <img src={MedmeBoxImg} alt="" />
                    </div>
                </div>
                <div className="SababBox3">
                    <div className="SababYozuv">
                        <div className="SababYozuvBox">
                            <h3>МОЛИЯ ВА ХИЗМАТ КЎРСАТИШ</h3>
                            <p>Молиявий ҳисоб-китобларнинг автоматик бажарилиши эвазига кўплаб хатоликларни олдини оласиз. Ундан ташқари мижозларга сифатли хизмат кўрсатиш орқали уларнинг содиқлигини оширасиз.</p>
                        </div>
                    </div>
                    <div className="SababImg3">
                        <img src={MedmeImg3} alt="" />
                    </div>
                </div>
                <div className="SababBox4">
                    <div className="SababYozuv">
                        <div className="SababYozuvBox">
                            <h3>ДОИМИЙ ТEХНИК ЁРДАМ</h3>
                            <p>Платформадан фойдаланиш жараёнида қийинчилик ёки саволлар туғилса "Онлайн чат" ёрдамида тўғридан-тўғри биз билан боғланишингиз мумкин.</p>
                        </div>
                    </div>
                    <div className="SababImg4">
                        <img src={MedmeImg4} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Medem;