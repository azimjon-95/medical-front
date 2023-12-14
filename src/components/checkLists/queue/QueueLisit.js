import React, { useRef } from 'react';
import './style.css';
import Qeu from './qeue.png';
import { NumberFormat } from '../../../hook/NumberFormat';


const QueueList = (
    {
        componentRef,
        firstname,
        lastname,
        payState,
        doctorFirstName,
        doctorLastName,
        doctorSpecialization,
        queueNumber
    }
) => {

    let sv_SE = new Date()
    let date = sv_SE.toLocaleDateString("sv-SE")
    let time = sv_SE.getHours() + ":" + sv_SE.getMinutes()

    return (
        <>
            <div ref={componentRef} className='queue_Container'>
                <div className="queue_Img-box">
                    <img src={Qeu} alt="" />
                </div>
                <div className="textQueue">
                    <p>Медицинский центр</p>
                    <i>Har doim siz bilan!</i>


                </div>

                <div className="queue_Box">
                    <p>⚕️{doctorSpecialization}: Oliy toifali shifokor<br /> {doctorLastName} {doctorFirstName}
                    </p>
                    <i></i>
                </div>
                <div className="queue_Box">
                    <p>👤Bemor:<br />{firstname} {lastname}
                    </p>
                </div>
                <div className="queue_pay">
                    <p>To'landi</p> <i>{NumberFormat(payState)} so'm</i>
                </div>
                <div className="queue_pay" id='queNone'>
                    <p>{time}</p> <i>{date}</i>
                </div>
                <div className="queue">
                    <b>{queueNumber}</b>
                    <i>Sizning navbatingiz!</i>
                </div>
                <div className="queue_address">
                    <i>Pop shahri, M.Hakimov ko'chasi, 1-uy</i>
                </div>

            </div>



        </>
    )
}
export default QueueList