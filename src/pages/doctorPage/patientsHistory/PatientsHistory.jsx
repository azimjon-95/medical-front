import React, { useRef, useEffect, useState } from 'react'
import Layout from '../../../components/layout/Layout'
import axios from '../../../api'
import './style.css'
import { Link } from 'react-router-dom'
import { NumberFormat, PhoneNumberFormat } from '../../../hook/NumberFormat'
import NotificationSound from "../../../assets/ayfon-sms.mp3";
import { showLoading, hideLoading } from "../../../redux/features/lineIoad";
import { useDispatch } from "react-redux";
import { LuEye } from "react-icons/lu"
import {Button , Tabs } from 'antd';
import imgNoData from '../../../assets/nodata.png'
import { PiPrinterFill } from "react-icons/pi";
import ReactToPrint from "react-to-print";
import RecordList from '../../../components/checkLists/patientRecordList/RecordList';


function PatientsHistory() {
    const componentRef = useRef();
    const [data, setData] = useState([])
    const audioPlayer = useRef(null);
    const dispatch = useDispatch()
    const [id, setID] = useState('');

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
    const showModal = (id) => {
        setID(id);
    };
    let category = localStorage.getItem('category')

    let clients = data.filter(client => client.choseDoctor
        .toLowerCase() === category
            ?.toLowerCase() && client.view === true)

    let time = new Date()
    let day = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
    let filterarxiv = clients.filter(i => i.day == day)

    return (
        <Layout>
            <h3 className="text-center">Arxiv</h3>

            <Tabs>
                <Tabs.TabPane tab="Bugungi" key={0}>
                    {
                        filterarxiv == 0 ?
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
                                        <th>Tashxis</th>
                                        <th>Tel</th>
                                        <th>Ko'rish</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterarxiv?.map((item, inx) => (
                                        <tr key={inx}>
                                            <td>{inx + 1}</td>
                                            <td className='Bem' data-label="Bemor">
                                                {item.lastname} {item.firstname}
                                            </td>
                                            <td data-label="Tashxis">{item.sickname}</td>
                                            <td data-label="Tel No">+998{item.phone}</td>
                                            <td>
                                                <Link to={`/AppointmentSinglePage/${item._id}`} >
                                                    <LuEye className='btn-secondary' />
                                                </Link>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Jammi" key={1}>

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
                                        <th>Tashxis</th>
                                        <th>Tel</th>
                                        <th>Chop etish </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients?.map((item, inx) => (
                                        <tr key={inx}>
                                            <td>{inx + 1}</td>
                                            <td className='Bem' data-label="Bemor">
                                                {item.lastname} {item.firstname}
                                            </td>
                                            <td data-label="Tashxis">{item.sickname}</td>
                                            <td data-label="Tel No">+998{item.phone}</td>

                                            <td type="primary" onClick={() => showModal(item._id)}>
                                                <Button className='LuEyeBtn'>
                                                    <ReactToPrint
                                                        trigger={() => <button style={{ border: "none", background: "transparent", fontSize: "14px" }}>< PiPrinterFill className='Printer' /></button>}
                                                        content={() => componentRef.current}
                                                    />
                                                </Button>
                                            </td>

                                            <div style={{ display: "none" }}>
                                                <RecordList
                                                    id={id}
                                                    componentRef={componentRef}
                                                />
                                            </div>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    }
                </Tabs.TabPane>
            </Tabs>
            <audio ref={audioPlayer} src={NotificationSound} />
        </Layout>
    )
}

export default PatientsHistory
