import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from '../../api/'
import './Appointments.css'

function Appointments() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/client/all')
            .then(res => { res.data.success && setData(res.data.data) })
            .catch(err => console.log(err))
    }, [])
    let category = localStorage.getItem('category')
    let clients = data.filter(client => client.choseDoctor.toLowerCase() === category.toLowerCase())

    return (
        <Layout>
            <h2>Bemorlar</h2>
            <table className='appointmentsTable' border={1}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Ismi</th>
                        <th>Fmailiya</th>
                        <th>phone</th>
                        <th>to'lov holati</th>
                        <th>to'lov</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients?.map((client, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{client.firstname}</td>
                                <td>{client.lastname}</td>
                                <td>{client.phone}</td>
                                <td style={{ background: client.payState ? "greenyellow" : "red" }}></td>
                                <td>{client.paySumm}</td>
                            </tr>

                        )
                    }
                </tbody>
            </table>
        </Layout>
    )
}

export default Appointments
