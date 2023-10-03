import React from 'react'
import './AppointmentSinglePage.css'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout';
import { useEffect } from 'react';
import axios from '../../api/index';
import { useState } from 'react';
import { message } from 'antd';

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
                    <h2>{user?.firstname + " " + user?.lastname}  </h2>
                </div>
                <div className="extraInfo">
                    <form onSubmit={updateUserInfo}>
                        <label htmlFor="" >kasallik nomi*</label>
                        <input type="text" value={sickname} onChange={(e) => setSickname(e.target.value)} />
                        <label htmlFor="" className='label'>Retsept(dorilar)*</label>
                        <textarea name="" cols="30" rows="10" value={retsept} onChange={(e) => setRetsept(e.target.value)}></textarea>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default AppointmentSinglePage
