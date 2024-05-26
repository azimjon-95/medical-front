import React from 'react'
import './MedmeSuma.css'
import Marketing from "../../img/Marketing.png"
import Moliya from '../../img/Moliya.png'
import Sotuv from '../../img/Sotuv.png'
import Xizmat from '../../img/Xizmat.png'
import { Link } from 'react-router-dom'

const MedmeSuma = () => {
    return (
        <div className='ContenierMedmeSuma'>
            <div className="MedmeSuma">
                <div className="MedmeMarketing">
                    <img src={Marketing} alt="" />
                    <h2>МАРКEТИНГ</h2>
                    <p>Платформ﻿а ёрдамида маркетинг бўлимини автоматлаштиришингиз ва самарадорлигини оширишингиз, ўлчашингиз мумкин</p>
                </div>
                <div className="MedmeMoliya">
                    <img src={Moliya} alt="" />
                    <h2>МОЛИЯ</h2>
                    <p>Молия бўлимида барча тўловлар, харажатлар ва ойлик иш ҳақи ҳамда қарздорликларнинг ҳисоб-китоби автоматик амалга оширилади</p>
                </div>
                <div className="MedmeSotuv">
                    <img src={Sotuv} alt="" />

                    <h2>СОТУВ</h2>
                    <p>Платформа ёрдамида сизга келиб тушаётган сўровларни бир жойга йиғишингиз, уларга тез ва сифатли алоқага чиқишингиз мумкин</p>
                </div>
                <div className="MedmeXizmatKorsatish">
                    <img src={Xizmat} alt="" />
                    <h3>ХИЗМАТ КЎРСАТИШ</h3>
                    <p>Сиз доимий мижозларингиз билан кунлик алоқани яхшилаш, смс-хабарлар юбориш ва кўплаб хизматлар кўрсатишингиз мумкин.</p>
                </div>
            </div>
            <div className="MedemBtn">
                <button>НАРХЛАРНИ БИЛШ</button>
            </div>
        </div>
    )
}

export default MedmeSuma;