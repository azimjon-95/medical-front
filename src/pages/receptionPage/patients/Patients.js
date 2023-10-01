import React, { useState, useEffect } from 'react'
import './style.css';
import Layout from '../../../components/layout/Layout';
import axios from '../../../api';
import { NumberFormat, PhoneNumberFormat } from '../../../hook/NumberFormat'



const Patients = () => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    try {
      const res = await axios.get('/client/all')
      if (res.data.data) {
        setUsers(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Layout>
      <h4 className="text-center">Barcha bemorlar</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Bemor</th>
            <th>Tel No</th>
            <th>Yo'naltirildi</th>
            <th>Doktor</th>
            <th>To'landi</th>
            <th>O'chirish</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, inx) => (
            <tr key={inx}>
              <td data-label="Bemor">{item.lastname} {item.firstname}</td>
              <td data-label="Tel No">{PhoneNumberFormat(item.phone)}</td>
              <td data-label="Yo'naltirildi">{item.choseDoctor}</td>
              <td data-label="Doktor">{item.doctorLastName} {item.doctorFirstName}</td>
              <td data-label="To'landi">{NumberFormat(item.paySumm)} so'm</td>
              <td data-label="O'chirish">
                <button button="true" className='btn btn-danger'>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout >
  )
}

export default Patients
