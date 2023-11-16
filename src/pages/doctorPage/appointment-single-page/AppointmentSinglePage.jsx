import React from 'react'
import './AppointmentSinglePage.css'
import { useParams } from 'react-router-dom'
import Layout from '../../../components/layout/Layout';
import { useEffect, useState } from 'react';
import axios from '../../../api/index';
import { message } from 'antd';
import { Link } from 'react-router-dom';

function AppointmentSinglePage() {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [sickname, setSickname] = useState('')
    const [retsept, setRetsept] = useState('')

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

        axios.put('/client/' + id, user)
            .then(res => {
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
                    <form >
                        <label htmlFor="" >kasallik nomi*</label>
                        <input type="text" value={sickname} onChange={(e) => setSickname(e.target.value)} />
                        <label htmlFor="" className='label'>Retsept(dorilar)*</label>
                        <textarea name="" cols="30" rows="10" value={retsept} onChange={(e) => setRetsept(e.target.value)}></textarea>
                        <Link to={`/AppointmentSinglePage/${user?._id}`} >
                            <button onClick={() => updateUserInfo()} button="true" className='btn btn-secondary'>Saqlash</button>
                        </Link>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default AppointmentSinglePage
