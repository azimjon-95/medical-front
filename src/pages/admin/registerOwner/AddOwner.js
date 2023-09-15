import axios from "../../../api";
import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import { Col, Form, Input, message, Row, Checkbox } from 'antd';
import './style.css'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from '../../../redux/features/indexSlice';


const RegisterOwner = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email] = useState("000")
  const [address] = useState("000")
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [specialization] = useState("ooo")
  const [experience] = useState("ooo")
  const [feesPerCunsaltation] = useState('000')
  const [docORrecep] = useState("owner")


  const AllInfo = {
    firstName,
    lastName,
    phone,
    email,
    address,
    login,
    password,
    specialization,
    experience,
    feesPerCunsaltation,
    docORrecep
  }

  console.log(AllInfo);

  const handleFinish = async (values) => {
    console.log(values);

    try {
      dispatch(showLoading())
      const res = await axios.post("/user/register", AllInfo);
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrrong")
    }
  }


  return (

    <Layout>
      <h3 className="text-center">Admin qo'shish</h3>
      <Form layout="vertical" onFinish={handleFinish} className="FormApply">
        <h4>Shaxsiy ma'lumotlar:</h4>
        <Row className="Row">
          <Col className="Col-Form" >
            <Form.Item
              label="Ism"
              name="firstName"
              required

              rules={[{ required: true }]}
            >
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="first name" />
            </Form.Item>
          </Col>
          <Col className="Col-Form">
            <Form.Item
              label="Familiya"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="last name" />
            </Form.Item>
          </Col>
          <Col className="Col-Form">
            <Form.Item
              label="Telefon raqami"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="phone number" />
            </Form.Item>
          </Col >
        </Row >
        <Row className="Row">
          <Col className="Col-Form">
            <Form.Item
              label="Login"
              name="login"
              required
              rules={[{ required: true }]}
            >
              <Input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                type="text"
                placeholder="username" />
            </Form.Item>
          </Col>
          <Col className="Col-Form">
            <Form.Item
              label="Paroli"
              name="password"
              required
              rules={[{ required: true }]}
            >
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="password" />
            </Form.Item>
          </Col >
          <Col className="Col-Form" >
            <button className="btn btn-primary" type="submit">
              Yuborish
            </button>
          </Col>
        </Row >
      </Form >
    </Layout >


  );
};

export default RegisterOwner;
