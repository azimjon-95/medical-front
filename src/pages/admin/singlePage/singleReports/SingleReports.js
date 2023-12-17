import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import axios from "../../../../api";
import { Link, useParams } from 'react-router-dom';
import { showLoading, hideLoading } from "../../../../redux/features/lineIoad";
import { useDispatch } from "react-redux";
import { LuEye } from "react-icons/lu"
import { Modal, Tabs, Button } from 'antd';
import imgNoData from '../../../../assets/nodata.png'
import { PiPrinterFill } from "react-icons/pi";
import ReactToPrint from "react-to-print";
import { SearchOutlined, LeftOutlined } from '@ant-design/icons';
import { FaUsers } from "react-icons/fa";


import RecordList from '../../../../components/checkLists/patientRecordList/RecordList';
const SingleReports = () => {
    const componentRef = useRef();
    const { _id } = useParams()
    const [client, setClient] = useState([])
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()
    const [query, setQuery] = useState("");
    const [id, setidD] = useState("No data")
    const checkID = (id) => {
        setidD(id)
    }
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





    return (
        <div className='Search-Box'>
            <div className="searchingBox">
                <Link to="/">
                    <h4>Xisobotlar</h4>
                </Link>


            </div>
            <Tabs>

                <Tabs >

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
                                    {clients?.filter((asd) =>
                                        asd.firstname.toLowerCase().includes(query)
                                    ).map((
                                        {
                                            _id,
                                            choseDoctor,
                                            day,
                                            address,
                                            doctorFirstName,
                                            doctorLastName,
                                            firstname,
                                            lastname,
                                            phone,
                                            retsept,
                                            sickname,
                                            year,
                                            doctorPhone
                                        }, inx) => {
                                        return !lastname.includes("Mavjud") ?
                                            <tr key={inx}>
                                                <td>{inx + 1}</td>
                                                <td className='Bem' data-label="Bemor">
                                                    {lastname} {firstname}
                                                </td>
                                                <td data-label="Tashxis">{sickname}</td>
                                                <td data-label="Tel No">+998{phone}</td>
                                                <td>
                                                    <Button className='LuEyeBtn'>
                                                        <ReactToPrint
                                                            trigger={() => <button onClick={() => checkID(_id)} style={{ border: "none", background: "transparent", fontSize: "14px" }}>< LuEye className='Printer' /></button>}
                                                            content={() => componentRef.current}
                                                        />
                                                    </Button>
                                                </td>
                                                <td style={{ display: "none" }}>
                                                    <RecordList
                                                        obj={{
                                                            id,
                                                            componentRef,
                                                            choseDoctor,
                                                            day,
                                                            address,
                                                            doctorFirstName,
                                                            doctorLastName,
                                                            firstname,
                                                            lastname,
                                                            phone,
                                                            retsept,
                                                            sickname,
                                                            year,
                                                            doctorPhone
                                                        }}
                                                        componentRef={componentRef}
                                                    />
                                                </td>

                                            </tr>
                                            :
                                            <></>
                                    }
                                    )}
                                </tbody>
                            </table>
                    }
                </Tabs>
            </Tabs>


        </div>
    )
}

export default SingleReports;

