import React from 'react';
import './style.css';
import Qeu from './qeue.png';

const QueueList = ({ ref }) => {
    let sv_SE = new Date()
    let date = sv_SE.toLocaleDateString("sv-SE")
    let time = sv_SE.getHours() + ":" + sv_SE.getMinutes()

    return (
        <div ref={ref} className='queue_Container'>
            <div className="queue_Img-box">
                <img src={Qeu} alt="" />
            </div>
            <div className="textQueue">
                <p>Медицинский центр</p>
                <i>Har doim siz bilan!</i>


            </div>

            <div className="queue_Box">
                <p>⚕️Xirurg: Oliy toifali shifokor<br /> Бойкуватов Азиз Хасанович
                </p>
                <i></i>
            </div>
            <div className="queue_Box">
                <p>👤Bemor:<br /> Бойкуватов Азиз Хасанович
                </p>
            </div>
            <div className="queue_pay">
                <p>To'landi</p> <i>200.000 so'm</i>
            </div>
            <div className="queue_pay" id='queNone'>
                <p>{time}</p> <i>{date}</i>
            </div>
            <div className="queue">
                <b>19</b>
                <i>Sizning navbatingiz!</i>
            </div>
            <div className="queue_address">
                <i>Pop shahri, M.Hakimov ko'chasi, 1-uy</i>
            </div>

        </div>
    )
}
export default QueueList