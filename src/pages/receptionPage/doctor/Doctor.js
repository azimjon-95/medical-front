import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout/Layout'
import axios from '../../../api'
import { message, Table } from 'antd'

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
    const hendleAccounState = async (record, status) => {
        try {
            const res = await axios?.get('/admin/changeAccountStatus',
                { doctorId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            if (res.data.success) {
                message.success(res.data.message)

            }
        } catch (error) {
            console.log(error);
            message.error("Something Went Wrong")
            window.location.reload()
        }
    }
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
            dataIndex: "status"
        },
        {
            title: "phone",
            dataIndex: "phone"
        },
        {
            title: "Doctor",
            dataIndex: "createdAt",
            render: (text, record) => (
                <span className="d-flex">
                    {record.isDoctor ? "Yes" : "No"}
                </span>
            )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === 'pending'
                        ?
                        <button onClick={() => hendleAccounState(record, "approved")} className='btn btn-success'>Approve</button>
                        :
                        <button className='btn btn-danger'>Reject</button>}
                </div>
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
