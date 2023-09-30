import axios from "../../../api";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/layout/Layout";
import { Col, Form, Input, message, Row, Select } from 'antd';
import './style.css'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from '../../../redux/features/indexSlice';
import { NumberFormat } from "../../../hook/NumberFormat";
import ReactToPrint from "react-to-print";
import QueueList from "../../../components/checkLists/queue/QueueLisit";


const Register = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const componentRef = useRef();
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [paySum, setPaySum] = useState(0)
  const [payState, setPaid] = useState("")
  const [choseDoctor, setChoseDoctor] = useState("")
  const [doctorFirstName, setDoctorFirstName] = useState("")
  const [doctorLastName, setDoctorLastName] = useState("")
  const [doctorSpecialization, setDoctorSpecialization] = useState("")
  const [queueNumber, setQueueNumber] = useState(23)
  const [allDoctor, setChAllDoctor] = useState([])

  useEffect(() => {
    axios.get("/admin/getAllDoctors")
      .then((res) => setChAllDoctor(res?.data.data))
      .catch((err) => console.log(err));
  }, [])

  let sortedData = allDoctor.filter(i => i.specialization.length > 3)

  useEffect(() => {
    let doctor_info = allDoctor?.find(d => d._id === choseDoctor)
    setPaySum(doctor_info?.feesPerCunsaltation)
    setDoctorFirstName(doctor_info?.firstName)
    setDoctorLastName(doctor_info?.lastName)
    setDoctorSpecialization(doctor_info?.specialization)
  }, [choseDoctor])

  const data = []
  for (const item of sortedData) {
    data.push(
      {
        value: item._id,
        label: item.specialization,
      }
    )
  }


  const handleFinish = async () => {
    let doctor_price = allDoctor.find(d => d._id === choseDoctor)

    const AllInfo = {
      firstname,
      lastname,
      phone,
      payState,
      choseDoctor: doctor_price.specialization,
      paySumm: doctor_price.feesPerCunsaltation,
      doctorFirstName,
      doctorLastName
    }
    console.log(AllInfo);

    try {
      dispatch(showLoading())
      const res = await axios.post("/client/add", AllInfo);
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully!");
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
      <h3 className="text-center">Bemorni ro'yhatga olish</h3>
      <Form layout="vertical" onFinish={handleFinish} className="FormApply">
        <Row className="Row">
          <Col className="Col-Form">
            <Form.Item
              label="First name"

              name="firstname"
              required
              rules={[{ required: true }]}
            >
              <Input
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="firstname" />
            </Form.Item>
          </Col >
          <Col className="Col-Form" >
            <Form.Item
              label="Last Name"
              name="lastname"
              required
              rules={[{ required: true }]}
            >
              <Input
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="lastname" />
            </Form.Item>
          </Col>
          <Col className="Col-Form">
            <Form.Item
              label="Phone number"
              name="number"
              required
              rules={[{ required: true }]}
            >
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="number" />
            </Form.Item>
          </Col>


        </Row >
        <Row className="Row">
          <Col className="Col-Form">
            <Form.Item
              label="Doctor"
              name="doctor"
              required
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                // style={{ width: 200 }}
                placeholder="Doctorni tanlang..."
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={(e) => setChoseDoctor(e)}
                options={data}
              />
            </Form.Item>
          </Col>

          <Col className="Col-Form" >
            <Form.Item
              label="Do'ktor FIO"
              name="Do'ktor FIO"
            >
              <div className="doctorName">
                <p>{doctorLastName} {doctorFirstName}</p>
              </div>
            </Form.Item>
          </Col>
          <Col className="Col-Form" >

            <Form.Item
              label="To'landi"
              name="paid"
              required
              rules={[{ required: true }]}
            >
              <div onClick={() => setPaid()} className="docORrecep">
                <label className="containerChe Che">
                  <b> {NumberFormat(paySum)} </b>
                  <p>{payState
                    ? `${paySum
                      ? "so'm  to'landi"
                      : "Doctorni tanlang "}`
                    : ""}</p>
                  <input value='Reception' onChange={(e) => setPaid(e.target.checked)} name='o' id='chi' type="radio" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </Form.Item>
          </Col>


        </Row >

        <Col className="Col-Form">
          {payState && payState
            ?
            <ReactToPrint trigger={() =>
              <button className="btn btn-primary" type="submit"> Yuborish</button>}
              content={() => componentRef.current}
            >
            </ReactToPrint>
            :
            <button className="btn btn-primary" type="submit"> Yuborish</button>
          }
        </Col>

      </Form >
      <div style={{ display: "none" }}>
        <QueueList componentRef={componentRef}
          firstname={firstname}
          lastname={lastname}
          payState={paySum}
          doctorFirstName={doctorFirstName}
          doctorLastName={doctorLastName}
          doctorSpecialization={doctorSpecialization}
          queueNumber={queueNumber}
        />
      </div>

    </Layout >


  );
};

export default Register;

