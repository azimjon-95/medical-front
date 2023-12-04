import React from 'react'
import './Carousel.css'
import { FaUserDoctor } from "react-icons/fa6";
import { NumberFormat } from '../../../hook/NumberFormat'
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { FaUsers } from 'react-icons/fa6';


function DoctorsSlite({ doctor, users }) {

    let data = doctor.filter((i) => i.docORrecep === "doctor");
    let time = new Date()
    let day = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

    return (
        <div className='carousel'>
            {
                data?.map((value, inx) => {
                    return (
                        <div key={inx} className='card'>
                            <div className='card-inner'>
                                <FaUserDoctor className='card_icon' />
                                <span className='doctorname'>{value.firstName}.{value.lastName[0]}</span>
                                <b>{value.specialization}</b>
                            </div>
                            <div className="allInfoTotal">
                                <b><LiaMoneyBillWaveSolid />
                                    {" " +
                                        NumberFormat(
                                            users?.filter(user => user.choseDoctor === value.specialization
                                                && user.view === true
                                                && user.day === day)
                                                .map(i => i.paySumm)
                                                .reduce((a, b) => a + b, 0)
                                        )
                                    }
                                </b>
                                <b><FaUsers /> {users?.filter(user => user.choseDoctor === value.specialization
                                    && user.view === true
                                    && user.day === day)
                                    .map(i => i.paySumm).length}</b>
                            </div>
                        </div>
                    )

                })
            }

        </div>
    )
}

export default DoctorsSlite
