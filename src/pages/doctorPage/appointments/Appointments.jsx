import React, { useRef, useEffect, useState } from 'react'
import Layout from '../../../components/layout/Layout'
import axios from '../../../api'
import './Appointments.css'
import { Link } from 'react-router-dom'
import { NumberFormat, PhoneNumberFormat } from '../../../hook/NumberFormat'
import NotificationSound from "../../../assets/ayfon-sms.mp3";
import { showLoading, hideLoading } from "../../../redux/features/lineIoad";
import { useDispatch } from "react-redux";
import imgNoData from '../../../assets/nodata.png'

function Appointments() {
    const [data, setData] = useState([])
    const audioPlayer = useRef(null);
    const dispatch = useDispatch()

    const getUsers = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.get('/client/all')
            dispatch(hideLoading())
            if (res.data.success) {
                setData(res.data.data)
            }
            return `${<audio controls ref={audioPlayer} src={NotificationSound} />}`
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    let category = localStorage.getItem('category')
    let clients = data.filter(client =>
        client.choseDoctor
            .toLowerCase() === category
                ?.toLowerCase()
        && client.payState
        && client.view !== true
    )
    localStorage.setItem("ClientLength", clients.length)


    return (
        <Layout>
            <h3 className="text-center">Bemorlar</h3>
            {
                clients == 0 ?
                    <div className='NoData'>
                        <div className="NoDataImg">
                            <img src={imgNoData} alt="No Data" />
                        </div>
                    </div>
                    :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Bemor</th>
                                <th>Tel No</th>
                                <th>Ko'rish</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients?.map((item, inx) => (
                                <tr key={inx}>
                                    <td>{inx + 1}</td>
                                    <td className='Bem' data-label="Bemor">
                                        <p className='newMsg'>new</p>
                                        {item.lastname} {item.firstname}
                                    </td>
                                    <td data-label="Tel No">{PhoneNumberFormat(item.phone)}</td>
                                    <td>
                                        <Link to={`/appointments/${item._id}`} >
                                            <button button="true" className='btn btn-secondary'>Qabul qilish</button>
                                        </Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
            {/* <audio controls ref={audioPlayer} src={NotificationSound} />
            <audio src={NotificationSound}></audio> */}
        </Layout>
    )
}

export default Appointments
