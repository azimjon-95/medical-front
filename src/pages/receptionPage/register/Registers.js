import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/layout/Layout";
import { Col, Form, Input, message, Row, Select, DatePicker } from "antd";
import "./style.css";
import { NumberFormat } from "../../../hook/NumberFormat";
import ReactToPrint from "react-to-print";
import CheckList from "../../../components/checkLists/checkList/CheckList";
import { useGetAllDoctorsQuery } from "../../../redux/doctorApi";
import { useCreateClientMutation } from "../../../redux/clientApi";
import { useGetAllUsersQuery } from "../../../redux/clientApi";
import { PiPrinterFill } from "react-icons/pi";

const Register = () => {
  const componentRef = useRef();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const [paySum, setPaySum] = useState(0);
  const [payState, setPaid] = useState("");
  const [choseDoctor, setChoseDoctor] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");
  const [list, setList] = useState(false);

  const [queueNumber, setQueueNumber] = useState(0);

  let { data: users, isLoading: loading } = useGetAllUsersQuery();
  let { data: all_Doctor } = useGetAllDoctorsQuery();
  let allDoctor = all_Doctor?.data || [];

  const [CreateNewClient, { isLoading, isSuccess }] = useCreateClientMutation();
  const [isAnimating, setIsAnimating] = useState(false);
  let sortedData = allDoctor?.filter((i) => i.specialization.length > 3);

  useEffect(() => {
    let doctor_info = allDoctor?.find((d) => d._id === choseDoctor);
    setPaySum(doctor_info?.feesPerCunsaltation);
    setDoctorFirstName(doctor_info?.firstName);
    setDoctorLastName(doctor_info?.lastName);
    setDoctorSpecialization(doctor_info?.specialization);
    setDoctorPhone(doctor_info?.phone);
  }, [choseDoctor]);

  const data = [];
  for (const item of sortedData) {
    data.push({
      value: item._id,
      label: item.specialization,
    });
  }

  let time = new Date();

  let todaysTime =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

  let Hours = time.getHours() + ":" + time.getMinutes();
  let filterarxiv = users?.data?.filter((i) => i.day == todaysTime);
  const handleFinish = async () => {
    let doctor_price = allDoctor?.find((d) => d._id === choseDoctor);

    const AllInfo = {
      firstname,
      lastname,
      phone,
      address,
      year,
      payState,
      choseDoctor: doctor_price.specialization,
      paySumm: doctor_price.feesPerCunsaltation,
      doctorFirstName: doctor_price.firstName,
      doctorLastName: doctor_price.lastName,
      doctorPhone: doctor_price.phone,
      day: todaysTime,
      month: time.toLocaleString("default", { month: "long" }),
    };
    console.log(AllInfo);
    CreateNewClient(AllInfo)
      .then((res) => {
        if (res?.data?.success) {
          setQueueNumber(res.data.data.queueNumber);
          message.success(res?.data?.message);
          setList(true);
        }
      })
      .catch((err) => console.log(err));


    setFirstName(" ")
    setLastName(" ")
    setAddress(" ");
    setYear(" ");
    setPhone(" ");
  };
  const onChange = (date, dateString) => {
    setYear(dateString);
  };

  return (
    <Layout>
      <h3 className="text-center">Bemorni ro'yhatga olish</h3>
      <Form layout="vertical" className="FormApply">
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
                placeholder="Ismi"
              />
            </Form.Item>
          </Col>
          <Col className="Col-Form">
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
                placeholder="Familyasi"
              />
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
                placeholder="Tel raqam"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="Row">
          <Col className="Col-Form">
            <Form.Item
              label="Address"
              name="Address"
              required
              rules={[{ required: true }]}
            >
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Manzili"
              />
            </Form.Item>
          </Col>

          <Col className="Col-Form">
            <Form.Item
              label="Year"
              name="year"
              required
              rules={[{ required: true }]}
              direction="vertical"
            >
              <DatePicker
                style={{ width: "100%" }}
                value={year}
                onChange={onChange}
              />
            </Form.Item>
          </Col>

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
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(e) => setChoseDoctor(e)}
                options={data}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="Row">
          <Col className="Col-Form">
            <Form.Item label="Do'ktor FIO" name="Do'ktor FIO">
              <div className="doctorName">
                <p>
                  {doctorLastName} {doctorFirstName}
                </p>
              </div>
            </Form.Item>
          </Col>
          <Col className="Col-Form">
            <Form.Item
              label="To'landi"
              name="paid"
              required
              rules={[{ required: true }]}
            >
              <div onClick={() => setPaid()} className="docORrecep">
                <label className="containerChe Che">
                  <b> {NumberFormat(paySum)} </b>
                  <p>
                    {payState
                      ? `${paySum ? "so'm  to'landi" : "Doctorni tanlang "}`
                      : ""}
                  </p>
                  <input
                    value="Reception"
                    onChange={(e) => setPaid(e.target.checked)}
                    name="o"
                    id="chi"
                    type="radio"
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Col className="Col-Form">
          {payState && payState ? (
            <button
              onClick={(e) => {
                handleFinish(e);
                // setList(true);
              }}
              className="btn btn-primary"
              type="submit"
            >
              {" "}
              Yuborishk
            </button>
          ) : (
            <button className="btn btn-primary" type="submit">
              {" "}
              Yuborish
            </button>
          )}
        </Col>
      </Form>
      <div className={`${list ? "viewCheckList" : "ListNone"}`}>
        <button onClick={() => setList(false)} className="OutCheck">
          +
        </button>
        <div className="viewBox">
          <ReactToPrint
            trigger={() => (
              <button className="PrintChekList" type="submit">
                {" "}
                <PiPrinterFill />
              </button>
            )}
            content={() => componentRef.current}
          ></ReactToPrint>
          <div className="waveList">
            <center id="top">
              <div className="logo"></div>
              <div className="info">
                <h2 className="item-h2">Har doim siz bilan!</h2>
              </div>
            </center>

            <div id="mid">
              <div className="info">
                <h2 className="item-h2">Aloqa uchun malumot</h2>
                <p className="text_p">
                  Manzil : Pop Tinchlik ko'chasi 7-uy
                  <br />
                  Email : JohnDoe@gmail.com
                  <br />
                  Tel raqam : +998(94)432-44-45
                  <br />
                </p>
              </div>
            </div>

            <div id="bot">
              <div id="table">
                <div className="tabletitle">
                  <div className="item_check">
                    <h2 className="item-h2">Element</h2>
                  </div>
                  <div className="Hours">
                    <h2 className="item-h2"></h2>
                  </div>
                  <div className="Rate">
                    <h2 className="item-h2"></h2>
                  </div>
                </div>

                <div className="service">
                  <div className="tableitem">
                    <p className="itemtext">
                      {doctorSpecialization}: Oliy toifali shifokor
                    </p>
                  </div>

                  <div className="tableitem">
                    <p className="itemtext">
                      {" "}
                      {doctorLastName} {doctorFirstName}
                    </p>
                  </div>
                </div>

                <div className="service">
                  <div className="tableitem">
                    <p className="itemtext">Doktor Tel :</p>
                  </div>
                  <div className="tableitem">
                    <p className="itemtext">+998{doctorPhone}</p>
                  </div>
                </div>

                <div className="service">
                  <div className="tableitem">
                    <p className="itemtext">Qabul :</p>
                  </div>

                  <div className="tableitem">
                    <p className="itemtext">{NumberFormat(paySum)} so'm</p>
                  </div>
                </div>
                <div className="service">
                  <div className="tableitem">
                    <p className="itemtext">Bemor:</p>
                  </div>
                  <div className="tableitem">
                    <p className="itemtext">
                      {firstname} {lastname}
                    </p>
                  </div>
                </div>

                <div className="service">
                  <div className="tableitem">
                    <p className="itemtext text_p">Sana :</p>
                  </div>
                  <div className="tableitem">
                    <p className="itemtext text_p">
                      {Hours} {todaysTime}
                    </p>
                  </div>
                </div>

                <div className="tabletitle">
                  <div className="tableitem">
                    <p>To'landi: </p>
                  </div>

                  <div className="payment">
                    <h2 className="item-h1">{NumberFormat(paySum)} so'm</h2>
                  </div>
                </div>
              </div>

              <div id="legalcopy">
                <h2>{queueNumber}</h2>
                <p>Sizning navbatingiz!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "none" }}>
        <CheckList
          componentRef={componentRef}
          firstname={firstname}
          lastname={lastname}
          payState={paySum}
          doctorFirstName={doctorFirstName}
          doctorLastName={doctorLastName}
          doctorSpecialization={doctorSpecialization}
          todaysTime={todaysTime}
          Hours={Hours}
          doctorPhone={doctorPhone}
          filterarxiv={filterarxiv + 1}
        />
      </div>
    </Layout>
  );
};

export default Register;
