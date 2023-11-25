import React from 'react'
import './Carousel.css'
import { FaUserDoctor } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';



function DoctorsSlite({ doctor }) {

    let data = doctor.filter((i) => i.docORrecep === "doctor");
    let width = window.innerWidth
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
                            <SwiperSlide>
                                <div className='card'>
                                    <div className='card-inner'>
                                        <FaUserDoctor className='card_icon' />
                                        <span className='doctorname'>{value.firstName} <br /> {value.lastName}</span>
                                        <b>{value.specialization}</b>
                                    </div>
                                    <div className="allInfoTotal">

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
