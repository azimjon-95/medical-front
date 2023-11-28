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
    let dateChane = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear()

    function Disabled() {
        if (dateChane <= date) {
            return "disabled"
        }
    }
    console.log(dataTrue);
    console.log(dataTrue.filter((i) => i.view === true));

    let base = dataTrue.filter((i) => i.day === date && i.view === true)
    let result = base?.reduce(function (prev, cur) {
        return prev + cur.paySumm
    }, 0);

    return (
        <div className="grid-one-item grid-common grid-c1">

            <div className="grid-c1-content">
                <p>Balans</p>
                <div className="lg-value">
                    {result === 0
                        ?
                        <img src={NoMony} alt="" />
                        :
                        <CountUp className="lg-value" end={NumberFormat(result)} decimals="3" suffix=" so'm" />
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
