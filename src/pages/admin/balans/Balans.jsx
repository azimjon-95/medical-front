import React, { useState } from "react";
import "./style.css";
import { NumberFormat } from '../../../hook/NumberFormat'
import { GrBottomCorner } from "react-icons/gr";
import CountUp from "react-countup";
import NoMony from '../../../assets/img/nomony.png'

const Balans = ({ dataTrue }) => {

    const [change, setChange] = useState(0)
    let time = new Date()
    let date = (time.getDate() + change) + "." + (time.getMonth() + 1) + "." + time.getFullYear()
    let dateKech = (time.getDate() - 1) + "." + (time.getMonth() + 1) + "." + time.getFullYear()
    let dateChane = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear()
    console.log(dateKech);
    function Disabled() {
        if (dateChane <= date) {
            return "disabled"
        }
    }
    // console.log(dataTrue);
    // console.log(dataTrue.filter((i) => i.view === true));

    let base = dataTrue.filter((i) => i.day === date && i.view === true)
    let baseKech = dataTrue.filter((i) => i.day === dateKech && i.view === true)
    let result = base?.reduce(function (prev, cur) {
        return prev + cur.paySumm
    }, 0);
    let resultKech = baseKech?.reduce(function (prev, cur) {
        return prev + cur.paySumm
    }, 0);
    return (
        <div className="grid-one-item grid-common grid-c1">
            <div className="grid-c1-content">
                <p>Balans</p>
                <div className="lg-value1">
                    Bugun:  {result === 0
                        ?
                        <img src={NoMony} alt="" />
                        :
                        <CountUp className="lg-value1" end={NumberFormat(result)} decimals="3" suffix=" so'm" />
                    }
                </div>
                <div className="lg-value2">
                    Kechagi: {result === 0
                        ?
                        <img src={NoMony} alt="" />
                        :
                        <CountUp className="lg-value2" end={NumberFormat(resultKech)} decimals="3" suffix=" so'm" />
                    }
                </div>

                <div className="card-wrapper">
                    <span className="card-pin-hidden">**** **** **** </span>
                    <span>1234</span>
                </div>
                <div className="card-logo-wrapper">
                    <div>
                        <p className="text text-silver-v1 expiry-text">Expires</p>
                        <div className="changeDate">
                            <p className="text text-sm text-white  text-date">{date}</p>
                            <span>
                                <button onClick={() => setChange(change - 1)}><GrBottomCorner className="BottomCorner-1" /></button>
                                <button disabled={Disabled()} onClick={() => setChange(change + 1)}><GrBottomCorner className="BottomCorner-2" /></button>
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
