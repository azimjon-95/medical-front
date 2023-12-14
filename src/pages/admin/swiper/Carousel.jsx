import React, { useState } from 'react'
import './Carousel.css'
import { FaUserDoctor } from "react-icons/fa6";
import { NumberFormat } from '../../../hook/NumberFormat'
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { FaUsers } from 'react-icons/fa6';
import { TbFilePercent } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from 'react-router-dom';

function DoctorsSlite({ doctor, users }) {

    const [info, setInfo] = useState("")
    let data = doctor.filter((i) => i.docORrecep === "doctor");
    let time = new Date()
    let day = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();


    function DailyMoney(value) {
        return users?.filter(user => user.choseDoctor === value
            && user.view === true
            && user.day === day)
            .map(i => i.paySumm)
            .reduce((a, b) => a + b, 0)
    }

    function PeopleToday(value) {
        return users?.filter(user => user.choseDoctor === value
            && user.view === true
            && user.day === day)
            .map(i => i.paySumm).length

    }

    function Percent(value, percent) {
        return users?.filter(user => user.choseDoctor === value
            && user.view === true
            && user.day === day)
            .map(i => i.paySumm)
            .reduce((a, b) => a + b, 0) % percent
    }

    let total = PeopleToday()

    console.log(total);

    return (
        <div className='carousel'>
            {doctor ?
                data?.map((value, inx) => {
                    return (
                        <Link to={`/doctorSinglePage/${value.specialization}`} key={inx} className='card'>
                            <div className='card-inner'>
                                <FaUserDoctor className='card_icon' />
                                <span className='doctorname'>{value.firstName}.{value.lastName[0]}</span>
                                <b>{value.specialization}</b>
                            </div>
                            <div className="allInfoTotal">
                                <div className="sDay">{day}</div>
                                <div className="CountDay-M">
                                    <LiaMoneyBillWaveSolid />
                                    {
                                        " " +
                                        NumberFormat(DailyMoney(value.specialization))
                                    }
                                </div>
                                <div className="CountDay-M">
                                    <FaUsers />
                                    {" " +
                                        PeopleToday(value.specialization)
                                        // total
                                    }

                                </div>

                                <div className="CountDay-M">
                                    {value.percent ?
                                        <div className='CountDay-Box'>
                                            <div className="CountDay-M"><TbFilePercent /> {value.percent}%</div>
                                            <div className="CountDay-M"><GiTakeMyMoney /> {
                                                NumberFormat(Percent(value.specialization, value.percent))
                                            } so'm</div>
                                        </div>
                                        :
                                        <div className="CountDay-M"><GiTakeMyMoney /> {NumberFormat(value.salary)} so'm</div>
                                    }

                                </div>
                            </div>
                        </Link>
                    )

                })
                :
                <>
                    <div className="cardSkl">
                        <div className="headerSkl">
                            <div className="imgSkl"></div>
                            <div className="details">
                                <span className="nameSkl"></span>
                                <span className="about"></span>
                            </div>
                        </div>
                        <div className="description">
                            <div className="lineSkl line-1"></div>
                            <div className="lineSkl line-2"></div>
                        </div>
                    </div>
                    <div className="cardSkl">
                        <div className="headerSkl">
                            <div className="imgSkl"></div>
                            <div className="details">
                                <span className="nameSkl"></span>
                                <span className="about"></span>
                            </div>
                        </div>
                        <div className="description">
                            <div className="lineSkl line-1"></div>
                            <div className="lineSkl line-2"></div>
                        </div>
                    </div>
                    <div className="cardSkl">
                        <div className="headerSkl">
                            <div className="imgSkl"></div>
                            <div className="details">
                                <span className="nameSkl"></span>
                                <span className="about"></span>
                            </div>
                        </div>
                        <div className="description">
                            <div className="lineSkl line-1"></div>
                            <div className="lineSkl line-2"></div>
                        </div>
                    </div>
                    <div className="cardSkl">
                        <div className="headerSkl">
                            <div className="imgSkl"></div>
                            <div className="details">
                                <span className="nameSkl"></span>
                                <span className="about"></span>
                            </div>
                        </div>
                        <div className="description">
                            <div className="lineSkl line-1"></div>
                            <div className="lineSkl line-2"></div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default DoctorsSlite
