import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/layout/Layout";
import { Col, Checkbox, Form, Input, message, Row, Select } from "antd";
import "./style.css";
import { NumberFormat } from "../../../hook/NumberFormat";
import ReactToPrint from "react-to-print";
import CheckList from "../../../components/checkLists/checkList/CheckList";
import { useGetAllDoctorsQuery } from "../../../redux/doctorApi";
import {
  useCreateClientMutation,
  useGetUserByIDNumberQuery,
} from "../../../redux/clientApi";
import { PiPrinterFill } from "react-icons/pi";

const Register = () => {
  const componentRef = useRef();
  const [idNumber, setIdNumber] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [paySum, setPaySum] = useState(0);
  const [payState, setPaid] = useState("");
  const [choseDoctor, setChoseDoctor] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");
  const [list, setList] = useState(false);
  const [queueNumber, setQueueNumber] = useState(0);

  const [temperature, setTemperature] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const [dispatchCheck, setDispatchCheck] = useState("");
  const [diagnostics, setDiagnostics] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [infoDispatch, setInfoDispatch] = useState("");
  const [blood_analysis, setBlood] = useState(false);
  const [urgent_analysis, setUrgent] = useState(false);
  const [biochemical_analysis, setBiochemical] = useState(false);

  const [secondary, setSecondary] = useState(false);

  let { data: singleUser } = useGetUserByIDNumberQuery(
    idNumber?.toLowerCase() || 0
  );

  useEffect(() => {
    if (singleUser?.data) {
      setFirstName(singleUser?.data?.firstname || "");
      setLastName(singleUser?.data?.lastname || "");
      setPhone(singleUser?.data?.phone || "");
      setAddress(singleUser?.data?.address || "");
      setYear(singleUser?.data?.year || "");
    }
  }, [singleUser]);

  let { data: all_Doctor } = useGetAllDoctorsQuery();
  let allDoctor = all_Doctor?.data || [];
  const [CreateNewClient] = useCreateClientMutation();

  let sortedData = allDoctor?.filter((i) => i.specialization.length > 3);
  let diagnosticDoctors = allDoctor?.filter(
    (i) => i.diagnostica === "diagnostica"
  );

  let doctor_info = allDoctor?.find((d) => d._id === choseDoctor);
  // setPaySum(
  // secondary
  //   ? doctor_info?.feesPerCunsaltation
  //   : doctor_info?.secondPrice || 0
  // );
  useEffect(() => {
    setDoctorFirstName(doctor_info?.firstName);
    setDoctorLastName(doctor_info?.lastName);
    setDoctorSpecialization(doctor_info?.specialization);
    setDoctorPhone(doctor_info?.phone);
  }, [choseDoctor]);

  const data = [];
  for (const item of sortedData) {
    data.push({
      value: item._id,
      label: item.specialization + ` (${item.firstName + " " + item.lastName})`,
    });
  }

  let changeDiagnostic = () => {
    const Diagnostics = [];
    for (const item of diagnosticDoctors) {
      Diagnostics.push({
        value: item._id,
        label: item.specialization,
      });
    }
    return Diagnostics;
  };

  let Diagnostics = changeDiagnostic();

  let time = new Date();
  let todaysTime =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

  let Hours = time.getHours() + ":" + time.getMinutes();
  let doctor_price = allDoctor?.find((d) => d._id === choseDoctor);

  const handleFinish = async (e) => {
    const AllInfo = {
      idNumber: idNumber?.toLowerCase(),
      firstname,
      lastname,
      phone,
      address,
      year,
      stories: {
        doctorIdNumber: doctor_price?.idNumber,
        choseDoctor: doctor_price?.specialization,
        payState,
        paySumm: paySum,
        secondary,
        doctorFirstName: doctor_price?.firstName,
        doctorLastName: doctor_price?.lastName,
        doctorPhone: doctor_price?.phone,
        temperature,
        weight: +weight,
        height: +height,
        diagnostics,
        analysis,
        urgent: urgent_analysis,
        blood_analysis,
        biochemical_analysis,
        infoDispatch,
        day: todaysTime,
        month: time.toLocaleString("en-US", { month: "long" }),
      },
    };

    CreateNewClient(AllInfo)
      .then((res) => {
        if (res?.data?.success) {
          setQueueNumber(res.data.data.stories[0].queueNumber);
          message.success(res?.data?.message);
          setList(true);
          document.querySelector(".FormApply").reset();
        }
      })
      .catch((err) => console.log(err));
  };

  // ----------ID number-------------
  const handleInputChange = (e) => {
    const value = e.target.value;
    const regexPattern = /^[a-zA-Z]{2}\d{7}$/;
    if (regexPattern.test(value)) {
      setIdNumber(value);
    }
  };

  // ------------yyy-mm-dd------------
  const handleDateChange = (event) => {
    const inputValue = event.target.value;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(inputValue)) {
      console.log("Valid date!");
    } else {
      console.log("Invalid date!");
    }
    setYear(inputValue);
  };

  // ------------Analises------------

  const handleInputPhone = (e) => {
    const value = e.target.value;
    const regexPattern = /^[0-9]{9}$/;
    if (regexPattern.test(value)) {
      setPhone(value);
    }
  };
  console.log(secondary);
  return (
    <Layout>
      <h3 className="text-center">Bemorni ro'yhatga olish</h3>
      <Form onFinish={handleFinish} layout="vertical" className="FormApply">
        <Row className="Row">
          <Col className="Col-Form">
            <Form.Item label="Shaxsiy raqami" name="ID number">
              <Input
                maxLength={9}
                value={idNumber}
                onChange={handleInputChange}
                type="string"
                placeholder="AA 1234567"
              />
            </Form.Item>
          </Col>
          <Col className="Col-Form">
            <Form.Item
              label="Ismi"
              name="firstname"
            // rules={[{ required: true }]}
            >
              <p style={{ display: "none" }}>{firstname}</p>
              <Input
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First name"
              />
            </Form.Item>
          </Col>
          <Col className="Col-Form">
            <Form.Item label="Familiya" name="lastname">
              <Input
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
              />
              <p style={{ display: "none" }}>{lastname}</p>
            </Form.Item>
          </Col>
        </Row>
        <Row className="Row">
          <Col className="Col-Form">
            <Form.Item label="Tel raqami" name="number">
              <Input
                maxLength={9}
                value={phone}
                onChange={handleInputPhone}
                type="number"
                placeholder="Phone number"
              />
              <p style={{ display: "none" }}>{firstname}</p>
            </Form.Item>
          </Col>

          <Col className="Col-Form">
            <Form.Item label="Tug'ilgan sana:" name="year" direction="vertical">
              <input
                type="date"
                style={{ width: "100%" }}
                id="dateInput"
                value={year}
                onChange={handleDateChange}
                placeholder="yil/oy/kun"
                className="DatePicer"
              />
              <p style={{ display: "none" }}>{firstname}</p>
            </Form.Item>
          </Col>
          <Col className="Col-Form">
            <Form.Item label="Doimiy yashash joyi:" name="Address">
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Address"
              />
              <p style={{ display: "none" }}>{address}</p>
            </Form.Item>
          </Col>
        </Row>
        <Row className="Row">
          <div className="Col-Form_Box">
            <Col width={100} className="Col-Form Col-FormCheck">
              <Form.Item label="Doktor" name="doctor">
                <Select
                  showSearch
                  value={choseDoctor}
                  placeholder="Doktorni tanlang"
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
            {!doctor_info?.secondPrice ? "" :
              <Form.Item label={secondary ? "Ikkilamchi" : "Birlamchi"} name="analiz">
                <div className="doctorName">
                  <Checkbox
                    className="onChecked"
                    onChange={(e) => setSecondary(e.target.checked)}
                  >
                    {secondary ? "Yo'q" : "Ha"}{" "}
                  </Checkbox>
                </div>
              </Form.Item>
            }

          </div>
          <div className="Col-Form_Box">
            <Col className="Col-Form">
              <Form.Item label="Bo'yi" name="height">
                <Input
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  type="number"
                  placeholder="Height"
                />
              </Form.Item>
            </Col>
            <Col className="Col-Form">
              <Form.Item label="Vazni" name="weight">
                <Input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  type="number"
                  placeholder="Weight"
                />
              </Form.Item>
            </Col>
            <Col className="Col-Form">
              <Form.Item label="Tana harorati" name="Temperature">
                <Input
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  type="text"
                  placeholder="Temperature"
                />
                <p style={{ display: "none" }}>t{temperature}</p>
              </Form.Item>
            </Col>
          </div>
          <Col className="Col-Form">
            <Form.Item label="Shoshilinch tarzda yuborildi" name="false">
              <div className="doctorName">
                <Checkbox
                  className="onChecked"
                  onChange={(e) => setDispatchCheck(e.target.checked)}
                >
                  {dispatchCheck ? "Ha" : "Yo'q"}{" "}
                </Checkbox>
                {dispatchCheck ? (
                  <Input
                    value={infoDispatch}
                    onChange={(e) => setInfoDispatch(e.target.value)}
                    type="text"
                    placeholder="Malumot..."
                    className="urgent"
                  />
                ) : (
                  ""
                )}
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row className="Row">
          <div className="Col-Form_Box">
            <Col style={{ width: "100%" }} className="Col-Form">
              <Form.Item label="Diagnostika" name="docto">

                {/* ---------------------------- */}

                <Select
                  labelInValue
                  style={{
                    width: 200,
                  }}
                  placeholder="Diagnostica"
                  // onChange={(value) => console.log(value.key)}
                  onChange={(e) => (
                    setDiagnostics(e.label),
                    setPaySum(
                      (sum) =>
                        sum +
                        diagnosticDoctors?.filter((i) => i._id === e.key)[0]
                          ?.feesPerCunsaltation
                    )
                  )}
                  options={Diagnostics}
                />
              </Form.Item>
            </Col>

            {/* ---------------------------- */}

            <Col style={{ width: "100%" }} className="Col-Form">
              <Form.Item label="Analiz" name="analiz">
                <div className="doctorName">
                  <Checkbox
                    className="onChecked"
                    value={"analysis"}
                    onChange={
                      (e) => setAnalysis(e.target.value)
                    }
                  >
                    {analysis ? "Ha" : "Yo'q"}{" "}
                  </Checkbox>
                </div>
              </Form.Item>
            </Col>
          </div>
          {analysis ? (
            <div className="Col-Form_Box">
              <Col style={{ width: "100%" }} className="Col-Form">
                <Form.Item label="Qon taxlil" name="Qon taxlil">
                  <div className="doctorName">
                    <Checkbox
                      className="onChecked"
                      onChange={(e) => (
                        setBlood(e.target.checked),
                        blood_analysis
                          ? setPaySum(
                            (p) =>
                              p -
                              allDoctor?.filter((i) => i.analis)[0]
                                ?.analisisPrices?.blood_analysis
                          )
                          : setPaySum(
                            (p) =>
                              p +
                              allDoctor?.filter((i) => i.analis)[0]
                                ?.analisisPrices?.blood_analysis
                          )
                      )}
                    >
                      {blood_analysis ? "Ha" : "Yo'q"}{" "}
                    </Checkbox>
                  </div>
                </Form.Item>
              </Col>
              <Col style={{ width: "100%" }} className="Col-Form">
                <Form.Item label="Peshob taxlil" name="Peshob taxlil">
                  <div className="doctorName">
                    <Checkbox
                      className="onChecked"
                      onChange={(e) => (
                        setUrgent(e.target.checked),
                        urgent_analysis
                          ? setPaySum(
                            (p) =>
                              p -
                              allDoctor?.filter((i) => i.analis)[0]
                                ?.analisisPrices?.urine_analysis
                          )
                          : setPaySum(
                            (p) =>
                              p +
                              allDoctor?.filter((i) => i.analis)[0]
                                ?.analisisPrices?.urine_analysis
                          )
                      )}
                    >
                      {urgent_analysis ? "Ha" : "Yo'q"}{" "}
                    </Checkbox>
                  </div>
                </Form.Item>
              </Col>
              <Col style={{ width: "100%" }} className="Col-Form">
                <Form.Item label="Bioximik taxlil" name="Bioximik taxlil">
                  <div className="doctorName">
                    <Checkbox
                      className="onChecked"
                      onChange={(e) => (
                        setBiochemical(e.target.checked),
                        biochemical_analysis
                          ? setPaySum(
                            (p) =>
                              p -
                              allDoctor?.filter((i) => i.analis)[0]
                                ?.analisisPrices?.biochemical_analysis
                          )
                          : setPaySum(
                            (p) =>
                              p +
                              allDoctor?.filter((i) => i.analis)[0]
                                ?.analisisPrices?.biochemical_analysis
                          )
                      )}
                    >
                      {biochemical_analysis ? "Ha" : "Yo'q"}{" "}
                    </Checkbox>
                  </div>
                </Form.Item>
              </Col>
            </div>
          ) : (
            ""
          )}

          <Col className="Col-Form">
            <Form.Item label="To'landi" name="paid">
              <div onClick={() => setPaid()} className="docORrecep">
                <label className="containerChe Che">
                  <b> {NumberFormat(paySum)} </b>
                  <p>
                    {payState
                      ? `${paySum ? "so'm  to'landi" : "Doctorni tanlang "}`
                      : ""}
                  </p>
                  {/* <p>
                    {doctorLastName} {doctorFirstName}
                  </p> */}
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
          <button className="button" type="submit">
            Yuborish
          </button>
          {/* <button disabled="disabled" className="button" type="submit">
            Yuborish
          </button> */}
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
                    <p className="itemtext">
                      {NumberFormat(doctor_price?.feesPerCunsaltation)} so'm
                    </p>
                  </div>
                </div>

                {blood_analysis ? (
                  <div className="service">
                    <div className="tableitem">
                      <p className="itemtext">Qon tahlili:</p>
                    </div>

                    <div className="tableitem">
                      <p className="itemtext">
                        {NumberFormat(
                          allDoctor?.filter((i) => i.analis)[0]?.analisisPrices
                            ?.blood_analysis
                        )}{" "}
                        so'm
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {urgent_analysis ? (
                  <div className="service">
                    <div className="tableitem">
                      <p className="itemtext">Peshob tahlili:</p>
                    </div>

                    <div className="tableitem">
                      <p className="itemtext">
                        {NumberFormat(
                          allDoctor?.filter((i) => i.analis)[0]?.analisisPrices
                            ?.urine_analysis
                        )}{" "}
                        so'm
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {biochemical_analysis ? (
                  <div className="service">
                    <div className="tableitem">
                      <p className="itemtext">Bioximik tahlili:</p>
                    </div>

                    <div className="tableitem">
                      <p className="itemtext">
                        {NumberFormat(
                          allDoctor?.filter((i) => i.analis)[0]?.analisisPrices
                            ?.biochemical_analysis
                        )}{" "}
                        so'm
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {!diagnostics === "diagnostica" ? (
                  <div className="service">
                    <div className="tableitem">
                      <p className="itemtext">{diagnostics}:</p>
                    </div>

                    <div className="tableitem">
                      <p className="itemtext">
                        {NumberFormat(
                          allDoctor?.find(
                            (i) =>
                              i.diagnostica && i.specialization === diagnostics
                          )?.feesPerCunsaltation
                        )}{" "}
                        so'm
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
          filterarxiv={queueNumber}
          allDoctor={allDoctor}
          blood_analysis={blood_analysis}
          biochemical_analysis={biochemical_analysis}
          urgent_analysis={urgent_analysis}
          diagnostics={diagnostics}
        />
      </div>
    </Layout>
  );
};

export default Register;

