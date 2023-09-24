import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout/Layout'
import axios from '../../../api'
import { message, Table } from 'antd'

const Doctor = () => {
    const [doctor, setDoctors] = useState([])
    const getDoctor = async () => {
        try {
            const res = await axios?.get('/user/getAllDoctors')
            if (res.data.data) {
                setDoctors(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctor()
    }, [])

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span className="d-flex">
                    {record.firstName} {record.lastName}
                </span>
            )
        },
        {
            title: "Status",
            dataIndex: "specialization"

        },
        {
            title: "phone",
            dataIndex: "phone"
        },
        {
            title: "Konsultatsiya to'lovi",
            dataIndex: "feesPerCunsaltation"
        },
        {
            title: "Tajriba",
            dataIndex: "experience"
        },

        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    <button button className='btn btn-danger'>Reject</button>
                </div >
            )
        }
    ]
    return (
        <Layout>
            <h3 className="text-center">All Doctors</h3>
            <Table columns={columns} dataSource={doctor} />
        </Layout>
    )
}

export default Doctor
