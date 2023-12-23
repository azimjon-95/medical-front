
import React, { useState, useEffect } from 'react';
import "./style.css";
import { NumberFormat } from '../../../hook/NumberFormat'
import { GrBottomCorner } from "react-icons/gr";
import CountUp from "react-countup";
import NoMony from '../../../assets/img/nomony.png'
import moment from 'moment';
import { GiMoneyStack } from "react-icons/gi";

const Balans = ({ dataTrue }) => {

    const [selectedDate, setSelectedDate] = useState(moment().startOf('day'));
    let time = new Date()
    let dateChane = (time.getDate() - 1) + "." + (time.getMonth() + 1) + "." + time.getFullYear()
    let change = selectedDate.format('DD.MM.YYYY')

    let base = dataTrue.filter((i) => i.day === change && i.view === true)
    let result = base?.reduce(function (prev, cur) {
        return prev + cur.paySumm
    }, 0);


    const back = () => {
        setSelectedDate(selectedDate.clone().subtract(1, 'day'));
    };
    const forward = () => {
        setSelectedDate(selectedDate.clone().add(1, 'day'));
    };

    // ------------------------------------------------------------
    return (
        <div className="grid-one-item grid-common grid-c1">
            <div className="grid-c1-content">
                <p>Balans</p>
                <div className="lg-value1">
                    {result === 0
                        ?
                        <img src={NoMony} alt="" />
                        :
                        <>
                            <GiMoneyStack /> <CountUp className="lg-value1" end={NumberFormat(result)} decimals="3" suffix=" so'm" />
                        </>
                    }
                </div>


                <div className="card-wrapper">
                    <span className="card-pin-hidden">**** **** **** </span>
                    <span>1234</span>
                </div>
                <div className="card-logo-wrapper">
                    <div>
                        <p className="text text-silver-v1 expiry-text"></p>
                        <div className="changeDate">
                            <p className="text text-sm text-white  text-date">{selectedDate.format('DD.MM.YYYY')}</p>
                            <span>
                                <button onClick={back}><GrBottomCorner className="BottomCorner-1" /></button>
                                {
                                    change <= dateChane ?
                                        <button onClick={forward}><GrBottomCorner className="BottomCorner-2" /></button>
                                        :
                                        ""
                                }
                            </span>
                        </div>
                    </div>
                    <div className="card-logo">
                        <div className="logo-shape1"></div>
                        <div className="logo-shape2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Balans
