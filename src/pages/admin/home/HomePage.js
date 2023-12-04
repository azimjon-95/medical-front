import React, { useEffect, useState } from 'react'
import Layout from "../../../components/layout/Layout";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from "../../../api";
import './App.css'
import Balans from '../balans/Balans'
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/features/lineIoad";
import DoctorsSlite from '../swiper/Carousel';

const HomePage = () => {
  const [doctor, setDoctors] = useState([])
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])


  const getDoctor = async () => {
    try {
      const res = await axios?.get('/admin/getAllDoctors')
      if (res.data.success) {
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const getUsers = async () => {
    try {
      const res = await axios.get('/client/all')
      if (res.data.data) {
        setUsers(res?.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDoctor()
    getUsers()
  }, [])

  // const findData = users.filter(i => i.choseDoctor == doctor.specialization)
  let currentMonth = new Date().getMonth() + 1
  let allUserForChart = users.filter(i => i.view)
    .filter(i => i.day.split('.')[1] == currentMonth)
    .sort((a, b) => a.day.split('.')[2] < b.day.split('.')[2])

  let week1 = allUserForChart.filter(i => i.day.split('.')[0] >= 1 && i.day.split('.')[0] <= 7).reduce((a, b) => a + b.paySumm, 0)
  let week2 = allUserForChart.filter(i => i.day.split('.')[0] >= 8 && i.day.split('.')[0] <= 14).reduce((a, b) => a + b.paySumm, 0)
  let week3 = allUserForChart.filter(i => i.day.split('.')[0] >= 15 && i.day.split('.')[0] <= 21).reduce((a, b) => a + b.paySumm, 0)
  let week4 = allUserForChart.filter(i => i.day.split('.')[0] >= 22 && i.day.split('.')[0] <= 31).reduce((a, b) => a + b.paySumm, 0)

  // let totalPriceSort = [week1, week2, week3, week4].sort()

  // const monthNames = [
  //   'Yanvar',
  //   'Fevral',
  //   'Mart',
  //   'Aprel',
  //   'May',
  //   'Iyun',
  //   'Iyul',
  //   'Avgust',
  //   'Sentabr',
  //   'Oktabr',
  //   'Noyabr',
  //   'Dekabr',
  // ];

  const data = [
    {
      name: '1-hafta',
      Kirim: week1,
    },
    {
      name: '2-hafta',
      Kirim: week2,
    },
    {
      name: '3-hafta',
      Kirim: week3,
    },
    {
      name: '4-hafta',
      Kirim: week4,
    },
  ];

  const dataTrue = users.filter(i => i.payState === true)

  return (

    <Layout>
      <div className="HomeOwner">
        <DoctorsSlite doctor={doctor} users={users} />
      </div>
      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={"Kirim"} stroke="dodgerblue" activeDot={{ r: 8 }} />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>

        <Balans dataTrue={dataTrue} />

      </div>
    </Layout>


  );
};

export default HomePage;
