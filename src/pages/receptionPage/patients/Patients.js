import axios from '../../../api'
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout/Layout'

import { Table } from 'antd'

const Patients = () => {
    const [users, setUsers] = useState([])
    const getUsers = async () => {
        try {
            const res = await axios.get('/admin/getAllUsers')
            if (res.data.success) {
                setUsers(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Doctor",
            dataIndex: "createdAt",
            render: (text, record) => (
                <span className="d-flex">
                    {record?.isDoctor ? "Yes" : "No"}
                </span>
            )
        },
        {
            title: "Actions",
            dataIndex: "isDoctor",
            render: (text, record) => (
                <div className="d-flex">
                    <button className='btn btn-danger' >Block</button>
                </div >
            )
        }
    ]
    return (
        <Layout>
            <h3 className="text-center">All Users</h3>
            <Table key={users} columns={columns} dataSource={users} />
        </Layout>
    )
}
export default Patients