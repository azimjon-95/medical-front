import axios from "../../../api";
import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import { Col, Form, Input, message, Row, Button, Tabs,Modal } from 'antd';
import './style.css'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from '../../../redux/features/indexSlice';
import imgNoData from '../../../assets/nodata.png'
import { NumberFormat, PhoneNumberFormat } from '../../../hook/NumberFormat'
import Reception from "./Reception";
import { ExclamationCircleFilled } from '@ant-design/icons';

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
  const [specialization, setSpecialization] = useState("0")
  const [experience, setExperience] = useState("0")
  const [feesPerCunsaltation, setFeesPerCunsaltation] = useState("")
  const [docORrecep] = useState("doctor")
  const [checkList, setCheckList] = useState("00")
  const [percent, setPercent] = useState("")
  const [salary, setSalary] = useState("")
  const [doctor, setDoctors] = useState([])


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
  }

  console.log(AllInfo);
  const getDoctor = async () => {
    try {
      const res = await axios?.get('/admin/getAllDoctors')
      if (res.data.success) {
        setDoctors(res?.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDoctor()
  }, [])


  const handleFinish = async (values) => {
    console.log(values);

    try {
      dispatch(showLoading())
      const res = await axios.post("/admin/register", AllInfo);
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

  const deletePatients = (_id) => {
    axios
      .delete(`/delete${_id}`)
      .then((res) => {
        if (res.data.success) {
          message.success("Doktor o'chirildi!");
          window.location.reload()
        } else {
          message.error(res.data.message);
        }

      })
      .catch((err) => console.log(err));
  };

  let filterData1 = doctor.filter((i) => i.docORrecep === "doctor")
  let filterData2 = doctor.filter((i) => i.docORrecep === "reception")


  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (

    <Layout>
      <h3 className="text-center">Admin qo'shish</h3>
      <Tabs>
        <Tabs.TabPane tab="Doktor qo'shish" key={0}>

          <Form layout="vertical" onFinish={handleFinish} className="FormApply">
            <h4>Shaxsiy ma'lumotlar:</h4>
            <div className="colRo">


            </div>
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
              <div className='salaryBox'>
                <Col>
                  <Form.Item
                    label="Doktor maoshi"
                    name="doctor salary"
                    required
                    rules={[{ required: true }]}
                  >
                    <div className="docORrecep checkList">
                      <label className="containerChe">Foiz
                        <input value='percent' onChange={(e) => setCheckList(e.target.value)} name='oli' id='chili' type="radio" />
                        <span className="checkmark"></span>
                      </label>

                      <label className="containerChe">Oylik
                        <input value='salary' onChange={(e) => setCheckList(e.target.value)} name='oli' id='chili' type="radio" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </Form.Item>
                </Col >
                {checkList === "percent"
                  ?
                  <Col>
                    <Form.Item
                      label="Foiz"
                      name="percent"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input
                        value={percent}
                        onChange={(e) => setPercent(e.target.value)}
                        type="number"
                        placeholder="percent" />
                    </Form.Item>
                  </Col >
                  :
                  <Col>
                    <Form.Item
                      label="Oylik"
                      name="salary"
                      required
                      rules={[{ required: false }]}
                    >
                      <Input
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        type="number"
                        placeholder="salary" />
                    </Form.Item>
                  </Col >
                }
              </div>
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
              <Col className="Col-Form">
                <Form.Item
                  label="Kunsaltatsia uchun to'lovlar"
                  name="feesPerCunsaltation"

                  rules={[{ required: true }]}
                >
                  <Input
                    value={feesPerCunsaltation}
                    onChange={(e) => setFeesPerCunsaltation(e.target.value)}
                    type="number"
                    placeholder="fees Per Cunsaltation " />
                </Form.Item>
              </Col >
            </Row >
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

            </Row>
            <Col className="Col-Form" >
              <button className="btn btn-primary" type="submit">
                Yuborish
              </button>
            </Col>
          </Form >
        </Tabs.TabPane>
        <Tabs.TabPane tab="Admin qo'shish" key={1}>
          <Reception />
        </Tabs.TabPane>
        <Tabs.TabPane tab={`Doktorlar${filterData1.length === 0 ? "" : ` - ${filterData1.length}`}`} key={2}>
          {
            filterData1 == 0 ?
              <div className='NoData'>
                <div className="NoDataImg">
                  <img src={imgNoData} alt="No Data" />
                </div>
              </div>
              :
              <table className="table">
                <thead>
                  <tr>
                    <th>Ismi</th>
                    <th>Familiyasi</th>
                    <th>Kasbi</th>
                    <th>Tel No</th>
                    <th>Qabuli</th>
                    <th>Oylik & Foiz</th>
                    <th>O'chirish</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData1?.map((item, inx) => (
                    <tr key={inx}>
                      <td data-label="Ismi">{item.lastName} </td>
                      <td data-label="Familiyasi">{item.firstName}</td>
                      <td data-label="Kasbi">{item.specialization}</td>
                      <td data-label="Tel No">{PhoneNumberFormat(item.phone)}</td>
                      <td data-label="To'landi">{NumberFormat(item.feesPerCunsaltation)} so'm</td>
                      {item.percent ?
                        <td data-label="To'landi">{NumberFormat(+item.percent)}%</td>
                        :
                        <td data-label="To'landi">{NumberFormat(item.salary)} so'm</td>
                      }
                      <td data-label="O'chirish">
                        <button onClick={() => deletePatients(item?._id)} button="true" className='btn btn-danger'>Del</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </Tabs.TabPane>
        <Tabs.TabPane tab={`Administratorlar ${filterData2.length === 0 ? "" : `- ${filterData2.length}`}`} key={3}>
          {
            filterData2 == 0 ?
              <div className='NoData'>
                <div className="NoDataImg">
                  <img src={imgNoData} alt="No Data" />
                </div>
              </div>
              :
              <table className="table">
                <thead>
                  <tr>
                    <th>Ismi</th>
                    <th>Familiyasi</th>
                    <th>Kasbi</th>
                    <th>Tel No</th>
                    <th>O'chirish</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData2?.map((item, inx) => (
                    <tr key={inx}>
                      <td data-label="Ismi">{item.lastName} </td>
                      <td data-label="Familiyasi">{item.firstName}</td>
                      <td data-label="Kasbi">{item.docORrecep}</td>
                      <td data-label="Tel No">{PhoneNumberFormat(item.phone)}</td>

                      <Button onClick={()=>showDeleteConfirm(item?._id)} type="dashed">
                        Delete
                      </Button>
                      {/* <td data-label="O'chirish">
                        <button onClick={() => deletePatients(item?._id)} button="true" className='btn btn-danger'>Del</button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </Tabs.TabPane>
      </Tabs>
    </Layout >


  );
};

export default AddDoctors;






// Azimov	Faxriddin	Nevrolog	934566676	100000
// Melikulov	Alisher	Kardioxirurg	904445434	150000
// Aminov	Sanjar	Kardiolog	905556545	200000
// Fozilbekov	Ro'ziqul	Ginekolog	770706687	80000
// Miraxmedov	G'ayrat	Anesteziolog	904324466	90000
// Babakulov	Abduaziz	Ortoped	902344344	120000
// Umarova	Gulnora	Revmatolog	946609606	130000
// Abdullayev	Oybek	Travmatolog	944324445	80000
