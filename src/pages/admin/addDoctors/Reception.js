import React, { useState } from "react";
import { Col, Form, Input, message, Row } from "antd";
import "./style.css";

import { useCreateDoctorMutation } from "../../../redux/doctorApi";

const Reception = () => {
  let [createDoctor] = useCreateDoctorMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [specialization] = useState("000");
  const [experience] = useState("000");
  const [feesPerCunsaltation] = useState("");
  const [docORrecep] = useState("reception");
  const [checkList] = useState("");
  const [percent] = useState("");
  const [salary] = useState("");

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
    feesPerCunsaltation: +feesPerCunsaltation,
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
    <Form layout="vertical" onFinish={handleFinish} className="FormApply">
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
              placeholder="first name"
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
              placeholder="last name"
            />
          </Form.Item>
        </Col>
      </Row>

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
              placeholder="phone number"
            />
          </Form.Item>
        </Col>
        <Col className="Col-Form">
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
              placeholder="email address"
            />
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
              placeholder="address"
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
              placeholder="username"
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
              placeholder="password"
            />
          </Form.Item>
        </Col>
      </Row>
      <Col className="Col-Form">
        <button className="btn btn-primary" type="submit">
          Yuborish
        </button>
      </Col>
    </Form>
  );
};

export default Reception;

// Azimov	Faxriddin	Nevrolog	934566676	100000
// Melikulov	Alisher	Kardioxirurg	904445434	150000
// Aminov	Sanjar	Kardiolog	905556545	200000
// Fozilbekov	Ro'ziqul	Ginekolog	770706687	80000
// Miraxmedov	G'ayrat	Anesteziolog	904324466	90000
// Babakulov	Abduaziz	Ortoped	902344344	120000
// Umarova	Gulnora	Revmatolog	946609606	130000
// Abdullayev	Oybek	Travmatolog	944324445	80000
