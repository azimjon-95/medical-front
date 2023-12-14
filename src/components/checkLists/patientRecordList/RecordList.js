import React, { useEffect, useState } from 'react';
import './style.css';
import Qeu from './MedLogoList.png';
import { IoIosCall, IoIosMail } from 'react-icons/io'
import axios from '../../../api';

const RecordList = React.forwardRef(({ id, componentRef }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/client/all')
            .then((res) => setData(res.data?.data))
            .catch((err) => console.log(err))
    }, [])

    let time = new Date()
    const user = data?.filter((i) => i._id === id)

    console.log(user[0]?.retsept);

    return (
        <>
            <div ref={componentRef} className='List_Container'>
                <div className="listNav">

                    <div className="listNav_text">
                        <h1>SALOMATLIK TANLASH KLINIKASI</h1>
                        <p>[Namangan Pop, Tinchlik ko'chasi 6-uy]</p>
                        <p>[choiceclinic.uz / choiceclinic@gmail.com]</p>
                    </div>

                    <div className="List_Img-box">
                        <img src={Qeu} alt="" />
                    </div>
                </div>

                <div className="textList">
                    <div className="listClinic-info">
                        <div className="D-info">
                            <b style={{ color: '#0095ff' }}>Doktor: {user.doctorFirstName + " " + user.doctorLastName}</b>
                            <b>Retsep raqami: [{user[0]?.phone}]</b>
                        </div>
                        <div className="D-info">
                            <b>[{user.choseDoctor}]</b>
                            <b>Sana: {user[0]?.day}</b>
                        </div>
                        <div className="D-info">
                            <b>[+998{user[0]?.doctorPhone}]</b>
                        </div>
                    </div>
                    <div className="Tashxis"></div>
                    <div className="listClinic-Record">
                        <b>[{user[0]?.retsept}]</b>
                    </div>

                    <div className="listClinic-UserInfo">
                        <div className="userInf">
                            <span className='Inf-box1'>
                                <b>Janob/Xonim:</b>
                            </span>
                            <span className='Inf-box2'>
                                <p>[{user[0]?.firstname + " " + user[0]?.lastname}]</p>
                            </span>
                        </div>
                        <div className="userInf">
                            <span className='Inf-box1'>
                                <b>Yosh:</b>
                            </span>
                            <span className='Inf-box2'>
                                <p>[{time.getFullYear() - +(user.year?.slice(0, 4))}]</p>
                            </span>
                        </div>
                        <div className="userInf">
                            <span className='Inf-box1'>
                                <b>Manzil:</b>
                            </span>
                            <span className='Inf-box2'>
                                <p>[{user.address}]</p>
                            </span>
                        </div>
                        <div className="userInf">
                            <span className='Inf-box1'>
                                <b>Aloqa raqami:</b>
                            </span>
                            <span className='Inf-box2'>
                                <p>[+998{user.phone}]</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="textList-footer">
                    <p><IoIosCall /> [+998 94 432 44 54]</p>
                    <p><IoIosMail /> choiceclinic@gmail.com</p>
                </div>
            </div>
        </>
    )
})
export default RecordList