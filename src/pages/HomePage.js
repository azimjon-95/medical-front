import axios from "../api";
import React, { useEffect, useState } from 'react'
import Layout from "../components/layout/Layout";
import { Row } from "antd";
import DoctorList from "../components/doctorList/DoctorList";

const HomePage = () => {
  const [doctor, setDoctors] = useState([])

  const getUserPage = () => {
    try {
      const res = axios?.post(`/user/getUserData`, {}, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem('token')
        }
      })
      if (res?.data.success) {
        setDoctors(res?.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserPage()
  }, [])

  return (

    <Layout>
      <h3 className="text-center">Home Page</h3>
      <Row>
        {doctor && !doctor?.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>


  );
};

export default HomePage;
