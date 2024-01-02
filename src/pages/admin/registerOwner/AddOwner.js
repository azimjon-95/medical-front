import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import { Col, Form, Input, message, Row } from "antd";
import "./style.css";

import { useCreateDoctorMutation } from "../../../redux/doctorApi";

const RegisterOwner = () => {
  let [createDoctor] = useCreateDoctorMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email] = useState("000");
  const [address] = useState("000");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [specialization] = useState("ooo");
  const [experience] = useState("ooo");
  const [feesPerCunsaltation] = useState(0);
  const [docORrecep] = useState("owner");
  const [checkList] = useState("000");
  const [percent] = useState(0);
  const [salary] = useState(0);

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
    docORrecep,
    checkList,
    percent: +percent,
    salary: +salary,
  };

  const handleFinish = async () => {
    createDoctor(AllInfo)
      .then((res) => {
        if (res.data.success) {
          message.success("Register Successfully!");
        } else {
          message.error(res.data.message);
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <h3 className="text-center">Admin qo'shish</h3>
      <Form layout="vertical" onFinish={handleFinish} className="FormApply">
        <h4>Shaxsiy ma'lumotlar:</h4>
        <Row className="Row">
          <Col className="Col-Form">
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
                placeholder="Ism"
              />
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
                placeholder="Familiya"
              />
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
                placeholder="Tel raqam"
              />
            </Form.Item>
          </Col>
        </Row>
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
                placeholder="Foydalanuvchi nomi"
              />
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
                placeholder="parol"
              />
            </Form.Item>
          </Col>
          <Col className="Col-Form">
            <button className="btn btn-primary" type="submit">
              Yuborish
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default RegisterOwner;
