import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import { Col, Form,Modal,  Tabs, Input, message, Row } from "antd";
import "./style.css";
import {
  useGetAllDoctorsQuery,
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
} from "../../../redux/doctorApi";
import imgNoData from "../../../assets/nodata.png";
import { PhoneNumberFormat } from "../../../hook/NumberFormat";
import { ExclamationCircleFilled } from "@ant-design/icons";

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

  let { data: allDoctor } = useGetAllDoctorsQuery();
  let doctor = allDoctor?.data;
  let [deleteDoctor] = useDeleteDoctorMutation();

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
  let filterData2 = doctor?.filter((i) => i.docORrecep === "owner");
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
  return (
    <Layout>
      <h3 className="text-center"></h3>
      <Tabs>
        <Tabs.TabPane tab={"Direktor qo'shish"} key={0}>
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
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={"Direktor"}

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

export default RegisterOwner;
