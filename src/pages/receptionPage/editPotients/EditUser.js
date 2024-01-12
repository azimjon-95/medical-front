import React, { useState } from "react";
import { Form, Checkbox, Input, Select, Row, Col, message } from "antd";
import "./style.css";
import { FiX } from "react-icons/fi";
import { useGetAllDoctorsQuery } from "../../../redux/doctorApi";
import { useUpdateClientMutation } from "../../../redux/clientApi";
import { NumberFormat } from "../../../hook/NumberFormat";

function UpdatePotients({ user, setOpenUpdate, editID }) {
  let update = user?.find((i) => i._id === editID) || {};

  const [idNumber, setIdNumber] = useState(update?.idNumber || "");
  const [firstname, setFirstName] = useState(update?.firstname || "");
  const [lastname, setLastName] = useState(update?.lastname || "");
  const [address, setAddress] = useState(update?.address || "");
  const [year, setYear] = useState(update?.year || "");
  const [phone, setPhone] = useState(update?.phone || "");

  const [paySum, setPaySum] = useState(update?.stories[0]?.paySumm || 0);
  const [payState, setPaid] = useState(update?.stories[0]?.payState || "");
  const [choseDoctor, setChoseDoctor] = useState(
    update?.stories[0]?.choseDoctor || ""
  );
  const [doctorSpecialization, setDoctorSpecialization] = useState(
    update?.stories[0]?.choseDoctor || ""
  );
  const [temperature, setTemperature] = useState(
    update?.stories[0]?.temperature || ""
  );
  const [weight, setWeight] = useState(update?.stories[0]?.weight || "");
  const [height, setHeight] = useState(update?.stories[0]?.height || "");
  const [dispatchCheck, setDispatchCheck] = useState(
    update?.stories[0]?.dispatchCheck || ""
  );
  const [diagnostics, setDiagnostics] = useState(
    update?.stories[0]?.diagnostics || ""
  );
  const [analysis, setAnalysis] = useState(update?.stories[0]?.analysis || "");
  const [infoDispatch, setInfoDispatch] = useState(
    update?.stories[0]?.infoDispatch || ""
  );
  const [blood_analysis, setBlood] = useState(
    update?.stories[0]?.blood_analysis || ""
  );
  const [urgent_analysis, setUrgent] = useState(
    update?.stories[0]?.urgent || ""
  );
  const [biochemical_analysis, setBiochemical] = useState(
    update?.stories[0]?.biochemical_analysis || ""
  );

  let [updateClient] = useUpdateClientMutation();
  let { data: all_Doctor } = useGetAllDoctorsQuery();
  let allDoctor = all_Doctor?.data || [];
  let sortedData = allDoctor?.filter((i) => i.specialization.length > 3);
  let diagnosticDoctors = allDoctor?.filter((i) => i.diagnostica);

  let time = new Date();
  let todaysTime =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

  // update?.stories?.shift();

  function updateDoctors(e) {
    e.preventDefault();
    let oldStories = [...update?.stories];
    oldStories.shift();

    let doctor = allDoctor?.find((i) => i._id === choseDoctor);

    const AllInfo = {
      idNumber: idNumber?.toLowerCase(),
      firstname,
      lastname,
      phone,
      address,
      year,
      stories: [
        {
          choseDoctor: doctor?.specialization,
          payState,
          paySumm: paySum,
          doctorFirstName: doctor?.firstName,
          doctorLastName: doctor?.lastName,
          doctorPhone: doctor?.phone,
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
          month: time.toLocaleString("default", { month: "long" }),
        },
        ...oldStories,
      ],
    };

    updateClient({ id: editID, body: AllInfo })
      .then((res) => {
        if (res?.data?.success) {
          message.success(res?.data?.message);
        }
      })
      .catch((err) => console.log("err", err));
  }
  const data = [];
  for (const item of sortedData) {
    data.push({
      value: item._id,
      label: item.specialization,
    });
  }

  const Diagnostics = [];
  for (const item of diagnosticDoctors) {
    Diagnostics.push({
      value: item._id,
      label: item.specialization,
    });
  }

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

  return (
    <div className="updateDoctor">
      <div className="editForm">
        <FiX className="updateCloseBtn" onClick={() => setOpenUpdate(false)} />

        <Form layout="vertical" className="FormApply formApplyEdit">
          <Row className="Row">
            <Col className="Col-Form">
              <Form.Item label="Shaxsiy raqami" name="ID number">
                <Input
                  maxLength={9}
                  defaultValue={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  type="string"
                  placeholder="AA 1234567"
                  name="idNumber"
                />
              </Form.Item>
            </Col>
            <Col className="Col-Form">
              <Form.Item label="Ismi" name="firstname">
                <Input
                  defaultValue={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First name"
                />
              </Form.Item>
            </Col>
            <Col className="Col-Form">
              <Form.Item label="Familiya" name="lastname">
                <Input
                  defaultValue={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="Row">
            <Col className="Col-Form">
              <Form.Item label="Tel raqami" name="number">
                <Input
                  maxLength={9}
                  defaultValue={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  placeholder="Phone number"
                />
              </Form.Item>
            </Col>
            <Col className="Col-Form">
              <Form.Item
                label="Tug'ilgan sana:"
                name="year"
                direction="vertical"
              >
                <input
                  type="date"
                  defaultValue={year}
                  id="dateInput"
                  onChange={handleDateChange}
                  placeholder="yil/oy/kun"
                  className="DatePicer"
                />
              </Form.Item>
            </Col>
            <Col className="Col-Form">
              <Form.Item label="Doimiy yashash joyi:" name="Address">
                <Input
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="Row">
            <Col className="Col-Form">
              <Form.Item label="Doktor" name="doctor">
                <Select
                  showSearch
                  defaultValue={doctorSpecialization}
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
                  onChange={(e) => (
                    setChoseDoctor(e),
                    setPaySum(
                      (sum) =>
                        sum +
                        Number(
                          allDoctor?.filter((i) => i._id === e)[0]
                            ?.feesPerCunsaltation
                        )
                    )
                  )}
                  options={data}
                />
              </Form.Item>
            </Col>
            <div className="Col-Form_Box">
              <Col className="Col-Form">
                <Form.Item label="Bo'yi" name="height">
                  <Input
                    defaultValue={height}
                    onChange={(e) => setHeight(e.target.value)}
                    type="number"
                    placeholder="Height"
                  />
                </Form.Item>
              </Col>
              <Col className="Col-Form">
                <Form.Item label="Vazni" name="weight">
                  <Input
                    defaultValue={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    placeholder="Weight"
                  />
                </Form.Item>
              </Col>
              <Col className="Col-Form">
                <Form.Item label="Tana harorati" name="Temperature">
                  <Input
                    defaultValue={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    type="text"
                    placeholder="Temperature"
                  />
                </Form.Item>
              </Col>
            </div>
            <Col className="Col-Form">
              <Form.Item label="Shoshilinch tarzda yuborildi" name="false">
                <div className="doctorName">
                  <Checkbox
                    className="onChecked"
                    checked={infoDispatch !== "" ? true : false}
                    onChange={(e) => setDispatchCheck(e.target.checked)}
                  >
                    {dispatchCheck ? "Ha" : "Yo'q"}{" "}
                  </Checkbox>
                  {infoDispatch !== "" ? (
                    <Input
                      defaultValue={infoDispatch}
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
                <Form.Item label="Diagnostika" name="diagnostica">
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
              <Col style={{ width: "100%" }} className="Col-Form">
                <Form.Item label="Analiz" name="analiz">
                  <div className="doctorName">
                    <Checkbox
                      className="onChecked"
                      value="analis"
                      checked={analysis}
                      onChange={(e) => setAnalysis(e.target.checked)}
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
                        checked={blood_analysis}
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
                        checked={urgent_analysis}
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
                        checked={biochemical_analysis}
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
        </Form>

        <button
          onClick={(e) => {
            updateDoctors(e);
            setTimeout(() => {
              setOpenUpdate(false);
            }, 1000);
          }}
          className="taxrirlash"
        >
          Taxrirlash
        </button>
      </div>
    </div>
  );
}

export default UpdatePotients;
