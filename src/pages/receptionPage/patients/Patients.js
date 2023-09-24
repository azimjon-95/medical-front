import React, { useState, useEffect } from 'react'
import './style.css';
import Layout from '../../../components/layout/Layout';
import axios from '../../../api';
import { Tabs, Table } from 'antd';


const Patients = () => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    try {
      const res = await axios.get('/client/all')
      if (res.data.innerData) {
        setUsers(res.data.innerData)
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
      dataIndex: "name",
      render: (record) => (
        <span className="d-flex">
          {record.firstname} {record.lastname}
        </span>
      )
    },
    {
      title: "Phone",
      dataIndex: "phone"
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
      <h4 className="text-center">Barcha bemorlar</h4>
      <Tabs>

        <Tabs.TabPane tab="Yangi bemorlar" key={0}>
          <Table key={users} columns={columns} dataSource={users} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Eskilari" key={1}>
          <Table key={users} columns={columns} dataSource={users} />
        </Tabs.TabPane>
      </Tabs>
    </Layout >
  )
}

export default Patients
