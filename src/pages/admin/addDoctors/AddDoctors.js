import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import {
  Col,
  Alert,
  Form,
  Button,
  Input,
  message,
  Row,
  Tabs,
  Modal,
} from "antd";
import "./style.css";
import imgNoData from "../../../assets/nodata.png";
import { NumberFormat, PhoneNumberFormat } from "../../../hook/NumberFormat";
import Reception from "./Reception";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  useGetAllDoctorsQuery,
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
} from "../../../redux/doctorApi";
import { LuClipboardEdit } from "react-icons/lu";
import EditDoctors from "../editDoctor/EditDoctors";

const AddDoctors = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [feesPerCunsaltation, setFeesPerCunsaltation] = useState("");
  const [docORrecep] = useState("doctor");
  const [checkList, setCheckList] = useState("");
  const [percent, setPercent] = useState("");
  const [diagnostica, setDiagnostica] = useState("");
  const [analis, setAnalis] = useState("");
  const [blood_analysis, setBlood] = useState("");
  const [urgent_analysis, setUrgent] = useState("");
  const [biochemical_analysis, setBiochemical] = useState("");
  const [salary, setSalary] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [idNumber, setIdNumber] = useState("");

  const [editID, setEditID] = useState("");

  let { data: allDoctor } = useGetAllDoctorsQuery();
  let doctor = allDoctor?.data;
  let [createDoctor] = useCreateDoctorMutation();
  let [deleteDoctor] = useDeleteDoctorMutation();

  const AllInfo = {
    idNumber: idNumber.toLowerCase(),
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
    diagnostica,
    analis,
    percent: +percent,
    salary: +salary,
    analisisPrices: {
      blood_analysis: +blood_analysis,
      urine_analysis: +urgent_analysis,
      biochemical_analysis: +biochemical_analysis,
    },
  };

  const handleFinish = () => {
    console.log(AllInfo);
    createDoctor(AllInfo)
      .then((res) => {
        if (res?.data?.success) {
          message.success("Register Successfully!");
        } else {
          message.error(res?.data?.message);
        }
      })
      .catch((err) => console.log("err=>>>", err));
  };

  let filterData1 = doctor?.filter((i) => i.docORrecep === "doctor");
  let filterData2 = doctor?.filter((i) => i.docORrecep === "reception");

  const { confirm } = Modal;

  const showDeleteConfirm = (_id) => {
    confirm({
      title: "O'chirib tashlaysizmi?",
      icon: <ExclamationCircleFilled />,
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        deleteDoctor(_id)
          .then((res) => {
            if (res.data.success) {
              message.success("Doktor o'chirildi!");
            } else {
              message.error(res.data.message);
            }
          })
          .catch((err) => console.log(err));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  let width = window.innerWidth;

  // ----------ID number-------------
  const handleInputChange = (e) => {
    const value = e.target.value;
    const regexPattern = /^[a-zA-Z]{2}\d{7}$/;
    if (regexPattern.test(value)) {
      setIdNumber(value);
    }
  };

  return (
    <Layout>
      <h3 className="text-center">Admin qo'shish</h3>
      <Tabs>
        <Tabs.TabPane
          tab={`${width > 450 ? "Doktor qo'shish" : "Doktor+"}`}
          key={0}
        >
          <Form layout="vertical" onFinish={handleFinish} className="FormApply">
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
                  label="Ism"
                  name="firstName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Ismingiz"
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
                    placeholder="Familiyangiz"
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
                    placeholder="Tel: raqamingiz"
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
                    placeholder="Elektron pochta manzilingiz"
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
                    placeholder="Manzilingiz"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="Row">
              <div className="salaryBox">
                <Col>
                  <Form.Item
                    label="Doktor maoshi"
                    name="doctor salary"
                    required
                    rules={[{ required: true }]}
                  >
                    <div className="docORrecep checkList">
                      <label className="containerChe">
                        Foiz
                        <input
                          value="percent"
                          onChange={(e) => setCheckList(e.target.value)}
                          name="oli"
                          id="chili"
                          type="radio"
                        />
                        <span className="checkmark"></span>
                      </label>

                      <label className="containerChe">
                        Oylik
                        <input
                          value="salary"
                          onChange={(e) => setCheckList(e.target.value)}
                          name="oli"
                          id="chili"
                          type="radio"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </Form.Item>
                </Col>
                {checkList === "percent" ? (
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
                        placeholder="Foiz"
                      />
                    </Form.Item>
                  </Col>
                ) : (
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
                        placeholder="Oylik"
                      />
                    </Form.Item>
                  </Col>
                )}
              </div>

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
                    placeholder="Foydalanuvchi nomingiz"
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
                    placeholder="Parolingiz"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="Row">
              <Col className="Col-Form">
                <Form.Item
                  label="Konsultatsia to'lov miqdori"
                  name="feesPerCunsaltation"
                >
                  <Input
                    value={feesPerCunsaltation}
                    onChange={(e) => setFeesPerCunsaltation(e.target.value)}
                    type="number"
                    placeholder="Qabul uchun to'lov miqdori"
                    disabled={analis ? "disabled" : ""}
                  />
                </Form.Item>
              </Col>
              <Col className="Col-Form">
                <Form.Item
                  label="Tajriba"
                  name="experience"
                  rules={[{ required: true }]}
                >
                  <Input
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    type="text"
                    placeholder="Tajribangiz"
                  />
                </Form.Item>
              </Col>
              <Col className="Col-Form">
                <Form.Item
                  label="Mutaxassislik"
                  name="specialization"
                  rules={[{ required: true }]}
                >
                  <Input
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    type="text"
                    placeholder="Mutaxassisligingiz"
                  />
                </Form.Item>
              </Col>
            </Row>
            {analis ? (
              <Row className="Row RowBox_Col">
                <Col className="Col-Form ColBox">
                  <Form.Item
                    label="Qon taxlil"
                    name="Qon taxlil"
                    style={{ width: "100%" }}
                  >
                    <Input
                      value={blood_analysis}
                      onChange={(e) => setBlood(e.target.value)}
                      type="text"
                      placeholder="Narxini kiriting"
                    />
                  </Form.Item>
                </Col>

                <Col className="Col-Form ColBox">
                  <Form.Item
                    label="Peshob taxlil"
                    name="Peshob taxlil"
                    style={{ width: "100%" }}
                  >
                    <Input
                      value={urgent_analysis}
                      onChange={(e) => setUrgent(e.target.value)}
                      type="text"
                      placeholder="Narxini kiriting"
                    />
                  </Form.Item>
                </Col>
                <Col className="Col-Form ColBox">
                  <Form.Item
                    label="Bioximik taxlil"
                    name="Bioximik taxlil"
                    style={{ width: "100%" }}
                  >
                    <Input
                      value={biochemical_analysis}
                      onChange={(e) => setBiochemical(e.target.value)}
                      type="text"
                      placeholder="Narxini kiriting"
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              ""
            )}
            <Row className="Row">
              <div className="salaryBox">
                <Col style={{ width: "100%" }}>
                  <Form.Item>
                    <div className="docORrecep checkList">
                      <label className="containerChe">
                        Analiz
                        <input
                          value="analis"
                          onChange={(e) => setAnalis(e.target.value)}
                          name="anal"
                          id="anal"
                          type="radio"
                        />
                        <span className="checkmark"></span>
                      </label>

                      <label className="containerChe">
                        Diagnostika
                        <input
                          value="diagnostica"
                          onChange={(e) => setDiagnostica(e.target.value)}
                          name="anal"
                          id="anal"
                          type="radio"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </Form.Item>
                </Col>
              </div>
              <Col className="Col-Form">
                <Form.Item>
                  <button className="btn btn-primary" type="submit">
                    Saqlash
                  </button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={`${width > 450 ? "Admin qo'shish" : "Admin+"}`}
          key={1}
        >
          <Reception />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={`${width > 450 ? "Doktorlar" : "D"} ${
            filterData1?.length === 0 ? "" : `- ${filterData1?.length}`
          }`}
          key={2}
        >
          <EditDoctors doctor={doctor} filterData1={filterData1} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={`${width > 450 ? "Administratorlar" : "A"}  ${
            filterData2?.length === 0 ? "" : `- ${filterData2?.length}`
          }`}
          key={3}
        >
          {filterData2 == 0 ? (
            <div className="NoData">
              <div className="NoDataImg">
                <img src={imgNoData} alt="No Data" />
              </div>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Ismi</th>
                  <th>Familiyasi</th>
                  <th>Tel raqam</th>
                  <th>O'chirish</th>
                </tr>
              </thead>
              <tbody>
                {filterData2?.map((item, inx) => (
                  <tr key={inx}>
                    <td data-label="Ismi">{item.lastName} </td>
                    <td data-label="Familiyasi">{item.firstName}</td>

                    <td data-label="Tel No">{PhoneNumberFormat(item.phone)}</td>

                    <td data-label="O'chirish">
                      <button
                        onClick={() => showDeleteConfirm(item?._id)}
                        button="true"
                        className="btn btn-danger"
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
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
