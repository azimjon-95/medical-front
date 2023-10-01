import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout/Layout'
import axios from '../../../api'
import { message, Table } from 'antd'
import { NumberFormat, PhoneNumberFormat } from '../../../hook/NumberFormat'

const Doctor = () => {
    const [doctor, setDoctors] = useState([])
    const getDoctor = async () => {
        try {
            const res = await axios?.get('/admin/getAllDoctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`


                }
            })
            if (res.data.success) {
                setDoctors(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctor()
    }, [])
    let data = doctor.filter(i => i.docORrecep === "doctor")
    return (
        <Layout>
            <h3 className="text-center">All Doctors</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Doktor</th>
                        <th>Darajasi</th>
                        <th>Tel No</th>
                        <th>Konsultatsiya to'lovi</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, inx) => (
                        <tr key={inx}>
                            <td data-label="Doktor">{item.firstName} {item.lastName}</td>
                            <td data-label="Darajasi">{item.specialization}</td>
                            <td data-label="Tel No">{PhoneNumberFormat(item.phone)}</td>
                            <td data-label="Konsultatsiya">{NumberFormat(item.feesPerCunsaltation)} so'm</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default Doctor
