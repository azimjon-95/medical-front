import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import axios from "../../../api";
import { useParams } from 'react-router-dom';
import { showLoading, hideLoading } from "../../../redux/features/lineIoad";
import { useDispatch } from "react-redux";
import { LuEye } from "react-icons/lu"
import { Modal, Tabs, Button } from 'antd';
import imgNoData from '../../../assets/nodata.png'
import { PiPrinterFill } from "react-icons/pi";
import ReactToPrint from "react-to-print";

import RecordList from '../../../components/checkLists/patientRecordList/RecordList';
const SinglePage = () => {
    const componentRef = useRef();
    const { _id } = useParams()
    const [client, setClient] = useState([])
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [id, setID] = useState('');
    const dispatch = useDispatch()


    // ----------------------------------------
    const getUsers = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.get('/client/all')
            dispatch(hideLoading())
            if (res.data.success) {
                setClient(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])


    let clients = client.filter(client => client.choseDoctor
        .toLowerCase() === _id
            ?.toLowerCase() && client.view === true)

    let time = new Date()
    let day = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
    let filterarxiv = clients.filter(i => i.day == day)
    // ----------------------------------------





    // -----------Model--------------
    const showModal = (id) => {
        setOpen(true);
        setID(id);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);

    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div className='SearchBar-Box'>
            <div className='Search-Box'>
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
                                                <td type="primary" onClick={showModal}>
                                                    <Button className='LuEyeBtn'>
                                                        <LuEye className='btn-secondary' />
                                                    </Button>
                                                </td>

                                                <Modal
                                                    open={open}
                                                    title="Title"
                                                    onOk={handleOk}
                                                    onCancel={handleCancel}
                                                    footer={[
                                                        <Button key="back" onClick={handleCancel}>
                                                            Clear
                                                        </Button>,
                                                        <Button
                                                            key="link"
                                                            type="primary"
                                                            loading={loading}
                                                            onClick={handleOk}
                                                        >
                                                            Print <PiPrinterFill className='Printer' />
                                                        </Button>,
                                                    ]}
                                                >
                                                    <td>{item?.retsept}</td>
                                                </Modal>

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
                                            <th>Ko'rish</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clients?.map((
                                            {
                                                lastname,
                                                firstname,
                                                sickname,
                                                phone,
                                                retsept,
                                                _id
                                            }, inx) => (

                                            <tr key={inx}>
                                                <td>{inx + 1}</td>
                                                <td className='Bem' data-label="Bemor">
                                                    {lastname} {firstname}
                                                </td>
                                                <td data-label="Tashxis">{sickname}</td>
                                                <td data-label="Tel No">+998{phone}</td>
                                                <td type="primary" onClick={() => showModal(_id)}>
                                                    <Button className='LuEyeBtn'>
                                                        <ReactToPrint
                                                            trigger={() => <button style={{ border: "none", background: "transparent" , fontSize: "14px"}}>  Chop etish < PiPrinterFill className='Printer' /></button>}
                                                            content={() => componentRef.current}
                                                        />
                                                    </Button>
                                                </td>




                                                {/* 
                                                <Modal
                                                    open={open}
                                                    title="Dorilar ro'yxati"
                                                    onOk={handleOk}
                                                    onCancel={handleCancel}
                                                    footer={[
                                                        <Button key="back" onClick={handleCancel}>
                                                            Clear
                                                        </Button>,
                                                        <Button
                                                            key="link"
                                                            type="primary"
                                                            loading={loading}
                                                            onClick={handleOk}
                                                        >
                                                            <ReactToPrint
                                                                trigger={() => <button style={{ border: "none", background: "transparent" }}>  Print < PiPrinterFill className='Printer' /></button>}
                                                                content={() => componentRef.current}
                                                            />
                                                        </Button>,
                                                    ]}
                                                >
                                                    {firstname}+"wde"
                                                </Modal> */}




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
            </div >
            <div className='Search-Box'></div>
        </div >
    )
}

export default SinglePage
