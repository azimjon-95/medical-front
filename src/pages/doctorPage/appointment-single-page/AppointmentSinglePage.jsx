import React, { useRef } from 'react'
import './AppointmentSinglePage.css'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../components/layout/Layout';
import { useEffect, useState } from 'react';
import axios from '../../../api/index';
import { message } from 'antd';
import ReactToPrint from "react-to-print";
import RecordList from '../../../components/checkLists/patientRecordList/RecordList';
import { LuEye } from "react-icons/lu"

function AppointmentSinglePage() {
    const navigate = useNavigate()
    const componentRef = useRef();
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [sickname, setSickname] = useState('')
    const [retsept, setRetsept] = useState('')
    const [_id, setidD] = useState("No data")
    const checkID = (id) => {
        setidD(id)
    }
    useEffect(() => {
        axios.get('/client/' + id)
            .then(res => {
                if (res.data.success) {
                    setUser(res.data.data)
                }
            })
            .catch(err => { console.log(err) })
    }, [id])

    function updateUserInfo(e) {
        e.preventDefault()
        user.sickname = sickname
        user.retsept = retsept
        user.view = true
        user.room.dayOfTreatment = "" + user.room.dayOfTreatment

        axios.put('/client/' + id, user)
            .then(res => {
                console.log(res);
                if (res.data.success) {
                    message.success("malumotlar saqlandi")

                }
            })
            .catch(err => console.log(err))
    }


    return (
        <Layout>
            <div className='appointmentSinglePage'>

                <div className="appointmentSinglePage_info">
                    <span>
                        <b>Bemor:</b>
                        <h3>{user?.firstname + " " + user?.lastname}  </h3>
                    </span>
                    <span>
                        <b>Tel No</b>
                        <h3>{user?.phone}</h3>
                    </span>
                </div>

                <div className="extraInfo">
                    <form onSubmit={updateUserInfo} >
                        <label htmlFor="" >kasallik nomi*</label>
                        <input type="text" value={sickname} onChange={(e) => setSickname(e.target.value)} />
                        <label htmlFor="" className='label'>Retsept(dorilar)*</label>
                        <textarea name="" cols="30" rows="10" value={retsept} onChange={(e) => setRetsept(e.target.value)}></textarea>
                        <ReactToPrint
                            trigger={() => <button onClick={() => checkID(_id)} >< LuEye className='Printer' /> Saqlash</button>}
                            content={() => componentRef.current}
                        />
                        <div style={{ display: "none" }}>
                            <RecordList
                                obj={{
                                    _id,

                                }}
                                componentRef={componentRef}
                            />
                        </div>

                    </form>
                </div>
            </div>

            {/* <div style={{ display: "none" }}>
                <RecordList
                    lastname={lastname}
                    firstname={firstname}
                    sickname={sickname}
                    phone={phone}
                    retsept={retsept}
                    address={address}
                    day={day}
                    doctorFirstName={doctorFirstName}
                    doctorLastName={doctorLastName}
                    doctorPhone={doctorPhone}
                    year={year}
                    choseDoctor={choseDoctor}
                    componentRef={componentRef}
                />
            </div> */}
        </Layout>
    )
}

export default AppointmentSinglePage


//     < RecordList
// id = { id }
// doctorFirstName = { doctorFirstName }
// doctorLastName = { doctorLastName }
// choseDoctor = { choseDoctor }
// phone = { phone }
// day = { day }
// doctorPhone = { doctorPhone }
// retsept = { retsept }
// firstname = { firstname }
// lastname = { lastname }
// year = { year }
// address = { address }
// sickname = { sickname }
// componentRef = { componentRef }
//     />





// {
//     id,
//     componentRef,
//     sickname,
//     phone,
//     doctorFirstName,
//     doctorLastName,
//     choseDoctor,
//     day,
//     doctorPhone,
//     retsept,
//     firstname,
//     lastname,
//     year,
//     address,
// }) => {