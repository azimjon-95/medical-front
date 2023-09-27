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


    return (
        <Layout>
            <h3 className="text-center">All Doctors</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Full name</th>
                        <th>Category</th>
                        <th>Phone</th>
                        <th>Konsultatsiya to'lovi</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    {doctor?.map((item, inx) => (
                        <tr key={inx}>
                            <td data-label="Fullname">{item.firstName} {item.lastName}</td>
                            <td data-label="Category">{item.specialization}</td>
                            <td data-label="phone">{PhoneNumberFormat(item.phone)}</td>
                            <td data-label="feesPerCunsaltation">{NumberFormat(item.feesPerCunsaltation)}</td>
                            <td data-label="experience">{item.experience}</td>
                            <td data-label="experience">
                                <button button="true" className='btn btn-danger'>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default Doctor
