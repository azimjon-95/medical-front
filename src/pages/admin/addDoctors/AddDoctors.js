import axios from "../../../api";
import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import { Col, Form, Input, message, Row, Checkbox } from 'antd';
import './style.css'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from '../../../redux/features/indexSlice';


const AddDoctors = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [experience, setExperience] = useState("")
  const [feesPerCunsaltation, setFeesPerCunsaltation] = useState("")
  const [docORrecep, setDocORrecep] = useState("")


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
  const handleFinish = async (values) => {
    console.log(values);

    try {
      dispatch(showLoading())
      const res = await axios.post("/admin/register", AllInfo);
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
        <div className="colRo">


        </div>
        <Row className="Row">
          <Col className="Col-Form" >

            <Form.Item
              label="Doctor yoki Receptoin"
              name="doctor or reception"
              required
              rules={[{ required: true }]}
            >
              <div className="docORrecep">
                <label className="containerChe">Doctor
                  <input value='doctor' onChange={(e) => setDocORrecep(e.target.value)} name='o' id='chi' type="radio" />
                  <span className="checkmark"></span>
                </label>

                <label className="containerChe">Reception
                  <input value='Reception' onChange={(e) => setDocORrecep(e.target.value)} name='o' id='chi' type="radio" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </Form.Item>
          </Col>
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
        </Row >

        <Row className="Row">
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
          <Col className="Col-Form" >
            <Form.Item
              label="Elektron pochta"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email address" />
            </Form.Item>
          </Col>
          <Col className="Col-Form">
            <Form.Item
              label="Manzili"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="address" />
            </Form.Item>
          </Col>

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
        </Row >

        <div className={`NonePro ${docORrecep == "doctor" ? "OpenPro" : "NonePro"}`}>
          <h4>Professional tafsilotlar:</h4>
          <Row className="Row">
            <Col className="Col-Form" >
              <Form.Item
                label="Mutaxassislik"
                name="specialization"

              // rules={[{ required: true }]}
              >
                <Input
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  type="text"
                  placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col className="Col-Form">
              <Form.Item
                label="Tajriba"
                name="experience"

              // rules={[{ required: true }]}
              >
                <Input
                  value={experience}
                  nChange={(e) => setExperience(e.target.value)}
                  type="text"
                  placeholder="experience" />
              </Form.Item>
            </Col>
            <Col className="Col-Form">
              <Form.Item
                label="Kunsaltatsia uchun to'lovlar"
                name="feesPerCunsaltation"

              // rules={[{ required: true }]}
              >
                <Input
                  value={feesPerCunsaltation}
                  onChange={(e) => setFeesPerCunsaltation(e.target.value)}
                  type="number"
                  placeholder="fees Per Cunsaltation " />
              </Form.Item>
            </Col >
          </Row>
        </div>


        <Col className="Col-Form" >
          <button className="btn btn-primary" type="submit">
            Yuborish
          </button>
        </Col>
      </Form >
    </Layout >


  );
};

export default AddDoctors;
