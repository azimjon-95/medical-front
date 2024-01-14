import React, { useState, useRef } from "react";
import "./style.css";
import Layout from "../../../components/layout/Layout";
import { NumberFormat, PhoneNumberFormat } from "../../../hook/NumberFormat";
import { message, Tabs, Modal, Button } from "antd";
import { FaUsers } from "react-icons/fa";
import imgNoData from "../../../assets/nodata.png";
import {
  useGetAllUsersQuery,
  useDeleteClientMutation,
  useUpdateClientMutation,
} from "../../../redux/clientApi";
import { useGetAllDoctorsQuery } from "../../../redux/doctorApi";
import { ExclamationCircleFilled, SearchOutlined } from "@ant-design/icons";
import { PiPrinterFill } from "react-icons/pi";
import ReactToPrint from "react-to-print";
import CheckList from "../../../components/checkLists/checkList/CheckList";
import UpdatePotients from "../editPotients/EditUser";
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

// fake data for data
let fakeObj = {
  _id: "id number",
  idNumber: "aaaaaaaaa",
  firstname: "aaaaaaaa",
  lastname: "aaaaaaaa",
  phone: "aaaaaaaa",
  address: "sssssssss",
  year: "0000-00-00",
  stories: [
    {
      retsept: {
        writed_at: "00.00.0000",
        writed_doctor: "aaaaaaaa",
        patientStatus: "aaaa",
        sickname: "aaaaaaaa",
        retseptList: "aaaaaaaa",
      },
      room: {
        dayOfTreatment: 0,
        payForRoom: 0,
        outDay: "0",
      },
      choseDoctor: "bbbbbbbb",
      payState: true,
      paySumm: 0,
      doctorFirstName: "aaa",
      doctorLastName: "bbb",
      doctorPhone: "123456789",
      temperature: "0",
      weight: 0,
      height: 0,
      diagnostics: "",
      analysis: "",
      urgent: false,
      blood_analysis: false,
      biochemical_analysis: false,
      view: false,
      day: "00.0.0000",
      month: "dddddd",
      queueNumber: 0,
      _id: "idnumber",
    },
  ],
};

const Patients = () => {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(false);
  const [data, setData] = useState(fakeObj);
  const [open, setOpen] = useState(false);
  let { data: doctors = [] } = useGetAllDoctorsQuery();

  let { data: users, isLoading: loading } = useGetAllUsersQuery();
  let [deleteClient] = useDeleteClientMutation();
  let [uppdate] = useUpdateClientMutation();
  const [editID, setEditID] = useState(null);

  const componentRef = useRef();
  const dataFalse = users?.data?.filter(
    (i) => i.stories[0]?.payState === false
  );
  const dataTrue = users?.data.filter(
    (i) => i.stories[0].payState === true && i.stories[0].view !== true
  );
  localStorage.setItem("dataFalse", dataFalse?.length);

  dataFalse?.push({});

  function updatePayState(e, id) {
    e.preventDefault();
    let update = dataFalse?.find((i) => i._id === id);
    let doctorSum = doctors?.data.filter(
      (i) => i.specialization === update?.stories[0].choseDoctor
    )[0]?.feesPerCunsaltation;

    let doctorInfo = doctors?.data.filter(
      (i) => i.specialization === update.choseDoctor
    )[0];

    let newInfo = { ...update };

    let allStory = [...newInfo?.stories];
    let zeroStory = { ...allStory[0] };
    zeroStory.payState = true;
    zeroStory.paySumm = doctorSum;
    allStory.shift();
    allStory?.unshift(zeroStory);

    let { stories, ...userInfo } = newInfo;
    let allInfo = { ...userInfo, stories: allStory };
    setData({ ...allInfo });

    uppdate({ id: id, body: allInfo })
      .then((res) => {
        if (res?.data?.success) {
          message.success(res?.data?.message);
        }
      })
      .catch((err) => console.log("err", err));

    setTimeout(() => setList(true), 1000);
  }
  let time = new Date();
  let todaysTime =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
  let Hours = time.getHours() + ":" + time.getMinutes();

  // -----------Delete-------------
  const { confirm } = Modal;
  const showDeleteClients = (_id) => {
    confirm({
      title: "O'chirib tashlaysizmi?",
      icon: <ExclamationCircleFilled />,
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        deleteClient(_id)
          .then((res) => {
            if (res.data.success) {
              message.success("Bemor o'chirildi!");
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

  let viewCheckListOnline = {
    display: "block",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.518)",
    position: "fixed",
    top: "0",
    left: "0",
  };

  return (
    <Layout>
      <div
        className="search"
        style={{ border: "1px solid grey", margin: " 10px auto 0px auto" }}
      >
        <div>
          <FaUsers />-{dataTrue?.length}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          type="text"
          placeholder="Izlash..."
        />
        <SearchOutlined />
      </div>

      <Tabs>
        <Tabs.TabPane
          defaultActiveKey="0"
          tab="Online ro'yhatdan o'tkanlar"
          key={0}
        >
          {loading || !dataFalse?.length ? (
            <div className="NoData">
              <div className="NoDataImg">
                <img src={imgNoData} alt="No Data" />
              </div>
            </div>
          ) : (
            <main className="tableMain" id="customers_table">
              <section className="table__body">
                <table>
                  <thead>
                    <tr>
                      <th>Bemor</th>
                      <th>Tel raqam</th>
                      <th>Yo'naltirildi</th>
                      <th>Doktor</th>
                      <th>To'lov</th>
                      <th>Faollashtirish</th>
                      <th>O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataFalse
                      ?.filter((asd) =>
                        asd?.firstname?.toLowerCase()?.includes(query)
                      )
                      .map((item, inx) => {
                        return (
                          <tr key={inx}>
                            <td>
                              {item?.lastname} {item?.firstname}
                            </td>
                            <td>{PhoneNumberFormat(item?.phone)}</td>
                            <td>{item?.stories[0].choseDoctor}</td>
                            <td>
                              {item?.stories[0].doctorLastName}{" "}
                              {item?.stories[0].doctorFirstName}
                            </td>
                            <td>
                              <del className="Tolanmadi lee">
                                {NumberFormat(
                                  doctors.data?.find(
                                    (i) =>
                                      i.specialization?.toLowerCase() ===
                                      item?.stories[0].choseDoctor?.toLowerCase()
                                  )?.feesPerCunsaltation
                                )}{" "}
                                so'm
                              </del>
                            </td>
                            <td>
                              <div className="PayContainer">
                                <div>
                                  <Button
                                    onClick={(e) =>
                                      updatePayState(e, item?._id)
                                    }
                                  >
                                    Qabul qilish
                                  </Button>
                                </div>
                              </div>
                            </td>
                            <td data-label="O'chirish">
                              <button
                                onClick={() => showDeleteClients(item?._id)}
                                button="true"
                                className="btn btn-danger"
                              >
                                Del
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    <td
                      style={list ? viewCheckListOnline : { display: "none" }}
                      className="viewCheckList"
                    >
                      <button
                        onClick={() => setList(false)}
                        className="OutCheck"
                      >
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
                                    {data?.stories[0]?.choseDoctor}: Oliy
                                    toifali shifokor
                                  </p>
                                </div>

                                <div className="tableitem">
                                  <p className="itemtext">
                                    {" "}
                                    {data?.stories[0]?.doctorLastName}{" "}
                                    {data?.stories[0]?.doctorFirstName}
                                  </p>
                                </div>
                              </div>

                              <div className="service">
                                <div className="tableitem">
                                  <p className="itemtext">Doktor Tel :</p>
                                </div>
                                <div className="tableitem">
                                  <p className="itemtext">
                                    +998{data?.stories[0]?.doctorPhone}
                                  </p>
                                </div>
                              </div>

                              <div className="service">
                                <div className="tableitem">
                                  <p className="itemtext">Qabul :</p>
                                </div>

                                <div className="tableitem">
                                  <p className="itemtext">
                                    {/* {NumberFormat(data?.stories[0]?.paySumm)}{" "} */}
                                    {NumberFormat(data?.stories[0]?.paySumm)}{" "}
                                    so'm
                                  </p>
                                </div>
                              </div>
                              <div className="service">
                                <div className="tableitem">
                                  <p className="itemtext">Bemor:</p>
                                </div>
                                <div className="tableitem">
                                  <p className="itemtext">
                                    {data?.firstname} {data?.lastname}
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
                                  <h2 className="item-h1">
                                    {NumberFormat(data?.stories[0]?.paySumm)}{" "}
                                    so'm
                                  </h2>
                                </div>
                              </div>
                            </div>

                            <div id="legalcopy">
                              <h2>{data?.stories[0]?.queueNumber}</h2>
                              <p>Sizning navbatingiz!</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ display: "none" }}>
                      <CheckList
                        componentRef={data?.componentRef}
                        firstname={data?.firstname}
                        lastname={data?.lastname}
                        payState={data?.paySumm}
                        doctorFirstName={data?.doctorFirstName}
                        doctorLastName={data?.doctorLastName}
                        doctorSpecialization={data?.doctorSpecialization}
                        todaysTime={data?.todaysTime}
                        Hours={data?.Hours}
                        doctorPhone={data?.doctorPhone}
                        filterarxiv={data?.queueNumber}
                        phone={data?.phone}
                        feesPerCunsaltation={data?.feesPerCunsaltation}
                      />
                    </td>
                  </tbody>
                </table>
              </section>
            </main>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane defaultActiveKey="1" tab="Bemorlar" key={1}>
          {dataTrue == 0 ? (
            <div className="NoData">
              <div className="NoDataImg">
                <img src={imgNoData} alt="No Data" />
              </div>
            </div>
          ) : (
            <main className="tableMain" id="customers_table">
              <section className="table__body">
                <table>
                  <thead>
                    <tr>
                      <th>Bemor</th>
                      <th>Tel No</th>
                      <th>Yo'naltirildi</th>
                      <th>Doktor</th>
                      <th>To'landi</th>
                      <th>Taxrirlash</th>
                      <th>O'chirish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTrue
                      ?.filter((asd) =>
                        asd.firstname?.toLowerCase().includes(query)
                      )
                      .map((item, inx) => {
                        return (
                          <tr key={inx}>
                            <td>
                              {item?.lastname} {item?.firstname}
                            </td>
                            <td>{PhoneNumberFormat(item?.phone)}</td>
                            <td>{item?.stories[0].choseDoctor}</td>
                            <td>
                              {item?.stories[0].doctorLastName}{" "}
                              {item?.stories[0].doctorFirstName}
                            </td>
                            <td>
                              {NumberFormat(item?.stories[0].paySumm)} so'm
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setOpen(true);
                                  setEditID(item?._id);
                                }}
                                button="true"
                                className="btn btn-primary"
                              >
                                <LuClipboardEdit />
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => showDeleteClients(item?._id)}
                                button="true"
                                className="btn btn-danger"
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </td>
                            {open && (
                              <UpdatePotients
                                user={dataTrue}
                                editID={editID}
                                setOpenUpdate={setOpen}
                              />
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </section>
            </main>
          )}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Patients;
