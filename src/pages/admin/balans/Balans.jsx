import React, { useState, useEffect } from 'react';
import "./style.css";
import { NumberFormat } from '../../../hook/NumberFormat'
import { GrBottomCorner } from "react-icons/gr";
import CountUp from "react-countup";
import NoMony from '../../../assets/img/nomony.png'
import moment from 'moment';
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineBedroomChild } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";



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


    console.log(dataTrue?.room);
    return (
        <div className="grid-one-item grid-common grid-c1">
            <div className="grid-c1-content">
                <div className="balansBox">
                    <p>Balans</p>
                    <div className="bedrom">
                        <div><TbUsersGroup /> - {base.length}</div>
                        <div><MdOutlineBedroomChild /> - 60</div>
                    </div>
                </div>

                <div className="lg-value1">
                    {result === 0
                        ?
                        <img src={NoMony} alt="" />
                        :
                        <div className='payCaounting'>
                            <div><GiMoneyStack /> Jami:</div>
                            <div className="">
                                <CountUp className="lg-value1" end={NumberFormat(result)} decimals="3" suffix=" so'm" />
                            </div>
                        </div>
                    }
                </div>
                <div className="lg-value1">
                    {result === 0
                        ?
                        <img src={NoMony} alt="" />
                        :
                        <div className='payCaounting'>
                            <div><GiMoneyStack /> Bemorlar:</div>
                            <div className="">
                                <CountUp className="lg-value1" end={NumberFormat(result)} decimals="3" suffix=" so'm" />
                            </div>
                        </div>
                    }
                </div>  <div className="lg-value1">
                    {result === 0
                        ?
                        <img src={NoMony} alt="" />
                        :
                        <div className='payCaounting'>
                            <div><GiMoneyStack /> Xonalar:</div>
                            <div className="">
                                <CountUp className="lg-value1" end={NumberFormat(result)} decimals="3" suffix=" so'm" />
                            </div>
                        </div>
                    }
                </div>

                <div className="card-logo-wrapper">
                    <div>

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
