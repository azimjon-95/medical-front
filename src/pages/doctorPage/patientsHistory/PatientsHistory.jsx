import React, { useRef, useEffect, useState } from 'react'
import Layout from '../../../components/layout/Layout'
import axios from '../../../api'
import './style.css'
import { Link } from 'react-router-dom'
import { NumberFormat, PhoneNumberFormat } from '../../../hook/NumberFormat'
import NotificationSound from "../../../assets/ayfon-sms.mp3";
import { showLoading, hideLoading } from "../../../redux/features/lineIoad";
import { useDispatch } from "react-redux";

function PatientsHistory() {
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
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])
    let category = localStorage.getItem('category')

    let clients = data.filter(client => client.choseDoctor
        .toLowerCase() === category
            ?.toLowerCase() && client.view === true)


    return (
        <Layout>
            <h3 className="text-center">Arxiv</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Bemor</th>
                        <th>kasaligi</th>
                        <th>Ko'rish</th>
                    </tr>
                </thead>
                <tbody>
                    {clients?.map((item, inx) => (
                        <tr key={inx}>
                            <td>{inx + 1}</td>
                            <td className='Bem' data-label="Bemor">
                                {item.lastname} {item.firstname}
                            </td>
                            <td data-label="Tel No">{item.sickname}</td>
                            <td>
                                <Link to={`/appointments/${item._id}`} >
                                    <button button="true" className='btn btn-secondary'>Bo'limga o'tish</button>
                                </Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <audio ref={audioPlayer} src={NotificationSound} />
        </Layout>
    )
}

export default PatientsHistory