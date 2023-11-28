import React, { useState } from 'react'
import './Carousel.css'
import { FaUserDoctor } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { NumberFormat } from '../../../hook/NumberFormat'



function DoctorsSlite({ doctor, users }) {
    const [qty, setQty] = useState([])
    console.log(qty);

    let data = doctor.filter((i) => i.docORrecep === "doctor");
    let width = window.innerWidth

    let time = new Date()
    let day = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
    return (
        <div className='carousel'>
            <Swiper
                slidesPerView={width > 1000 ? 6 : width > 700 ? 3 : width > 410 ? 2 : 1}
                spaceBetween={15}
                pagination={{
                    clickable: true,
                }}
                // modules={[Pagination]}
                className="mySwiper"
            >
                {

                    data?.map((value, inx) => {
                        return (
                            <SwiperSlide key={inx} >
                                <div className='card'>
                                    <div className='card-inner'>
                                        <FaUserDoctor className='card_icon' />
                                        <span className='doctorname'>{value.firstName}.{value.lastName[0]}</span>
                                        <b>{value.specialization}</b>
                                    </div>
                                    <div className="allInfoTotal">
                                        <b>
                                            {
                                                NumberFormat(
                                                    users?.filter(user => user.choseDoctor === value.specialization
                                                        && user.view === true
                                                        && user.day === day)
                                                        // ?.map(i => qty.push(i.paySumm))
                                                        .map(i => i.paySumm)
                                                        .reduce((a, b) => a + b, 0)
                                                )
                                            }
                                        </b>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )

                    })
                }
            </Swiper>

        </div>
    )
}

export default DoctorsSlite
