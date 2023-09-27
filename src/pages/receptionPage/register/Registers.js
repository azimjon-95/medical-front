import axios from "../../../api";
import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import { Col, Form, Input, message, Row, Select } from 'antd';
import './style.css'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from '../../../redux/features/indexSlice';
import { NumberFormat } from "../../../hook/NumberFormat";


const Register = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [paySum, setPaySum] = useState(0)
  const [payState, setPaid] = useState("")
  const [choseDoctor, setChoseDoctor] = useState("")

  const [allDoctor, setChAllDoctor] = useState([])

  useEffect(() => {
    axios.get("/user/getAllDoctors")
      .then((res) => setChAllDoctor(res?.data.data))
      .catch((err) => console.log(err));
  }, [])

  let sortedData = allDoctor.filter(i => i.specialization.length > 3)

  useEffect(() => {
    let doctor_price = allDoctor?.find(d => d._id === choseDoctor)
    setPaySum(doctor_price?.feesPerCunsaltation)
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


  const handleFinish = async (values) => {
    let doctor_price = allDoctor.find(d => d._id === choseDoctor)
    const AllInfo = {
      firstname,
      lastname,
      phone,
      payState,
      choseDoctor: doctor_price.specialization,
      paySumm: doctor_price.feesPerCunsaltation
    }

    console.log(AllInfo);
    try {
      dispatch(showLoading())
      const res = await axios.post("/client", AllInfo);
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


  // const number = paySum;
  // const USformatter = new Intl.NumberFormat("en-US");
  // const PriceNumber = USformatter.format(number);




  // function FormatNumberApp() {
  //   const numberToFormat = 1234567890;

  //   return (
  //     <div className='container'>
  //       <h3>React js format number - hypen seperated</h3>
  //       <p>Original number: {numberToFormat}</p>
  //       <p>Formatted number: {formatNumberWithHyphen(numberToFormat)}</p>
  //     </div>
  //   );
  // }
  return (

    <Layout>
      <h3 className="text-center">Bemorni ro'yhatga olish</h3>
      <Form layout="vertical" onFinish={handleFinish} className="FormApply">
        <Row className="Row">
          <Col className="Col-Form">
            <Form.Item
              label="First name"

              name="text"
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
              name="text"
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

        <Col className="Col-Form" >
          <button className="btn btn-primary" type="submit">
            Yuborish
          </button>
        </Col>
      </Form >

    </Layout >


  );
};

export default Register;

