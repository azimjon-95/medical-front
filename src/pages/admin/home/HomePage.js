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

  const findData = users.filter(i => i.choseDoctor == doctor.specialization)

  console.log(findData);

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      Tushum: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      Tushum: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      Tushum: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      Tushum: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      Tushum: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      Tushum: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      Tushum: 4300,
      amt: 2100,
    },
  ];

  const dataTrue = users.filter(i => i.payState === true)

  return (

    <Layout>
      <div className="HomeOwner">
        <DoctorsSlite doctor={doctor} />
      </div>
      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Tushum" stroke="dodgerblue" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <Balans dataTrue={dataTrue} />

      </div>
    </Layout>


  );
};

export default HomePage;
