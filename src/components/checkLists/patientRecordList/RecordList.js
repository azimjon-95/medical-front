import { useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router-dom'
import Qeu from './MedLogoList.png';
import { IoIosCall, IoIosMail } from 'react-icons/io'
import axios from '../../../api/index';

const RecordList = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get('/client/' + id)
            .then(res => {
                if (res.data.success) {
                    setUser(res.data.data)
                }
            })
            .catch(err => { console.log(err) })
    }, [id])

    let time = new Date()
    let date = time.getFullYear() + "" + (time.getMonth() + 1) + "" + time.getDate()
    let resDate = user?.year.slice(0, 4) + user?.year.slice(5, 7) + user?.year.slice(8, 10);
    let res = date - resDate;


    return (
        <div className='List_Container'>
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
                        <b style={{ color: '#0095ff' }}>Doktor: {user?.doctorFirstName + " " + user?.doctorLastName}</b>
                        <b>Retsep raqami: [{user?.phone}]</b>
                    </div>
                    <div className="D-info">
                        <b>[{user?.choseDoctor}]</b>
                        <b>Sana: {user?.day}</b>
                    </div>
                    <div className="D-info">
                        <b>[+998{user?.doctorPhone}]</b>
                    </div>
                </div>
                <div className="Tashxis"></div>
                <div className="listClinic-Record">
                    <b>[{user?.retsept}]</b>
                </div>

                <div className="listClinic-UserInfo">
                    <div className="userInf">
                        <span className='Inf-box1'>
                            <b>Janob/Xonim:</b>
                        </span>
                        <span className='Inf-box2'>
                            <p>[{user?.firstname + " " + user?.lastname}]</p>
                        </span>
                    </div>
                    <div className="userInf">
                        <span className='Inf-box1'>
                            <b>Yosh:</b>
                        </span>
                        <span className='Inf-box2'>
                            <p>[{res}]</p>
                        </span>
                    </div>
                    <div className="userInf">
                        <span className='Inf-box1'>
                            <b>Manzil:</b>
                        </span>
                        <span className='Inf-box2'>
                            <p>[{user?.address}]</p>
                        </span>
                    </div>
                    <div className="userInf">
                        <span className='Inf-box1'>
                            <b>Aloqa raqami:</b>
                        </span>
                        <span className='Inf-box2'>
                            <p>[+998{user?.phone}]</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className="textList-footer">
                <p><IoIosCall /> [+998 94 432 44 54]</p>
                <p><IoIosMail /> choiceclinic@gmail.com</p>
            </div>
        </div>
    )
}
export default RecordList