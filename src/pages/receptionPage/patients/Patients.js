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

const Patients = () => {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(false);
  let { data: doctors = [] } = useGetAllDoctorsQuery();

  let { data: users, isLoading: loading } = useGetAllUsersQuery();
  let [deleteClient] = useDeleteClientMutation();
  let [uppdate, { isError, isLoading }] = useUpdateClientMutation();

  const componentRef = useRef();
  const dataFalse = users?.data?.filter((i) => i.payState === false);
  const dataTrue = users?.data?.filter(
    (i) => i.payState === true && i.view !== true
  );
  const filterarxiv = users?.data?.filter((i) => i.view !== true);
  localStorage.setItem("dataFalse", dataFalse?.length);

  function updatePayState(e, id) {
    e.preventDefault();
    let update = dataFalse?.find((i) => i._id === id);

    let doctorSum = doctors?.data?.find(
      (i) => i.specialization.toLowerCase() === update.choseDoctor.toLowerCase()
    ).feesPerCunsaltation;

    let newInfo = {
      ...update,
      payState: true,
      paySumm: doctorSum,
      room: { ...update.room, dayOfTreatment: "0" },
    };
    uppdate({ id: id, body: newInfo })
      .then((res) => {
        console.log(res);
        if (res?.data?.success) {
          message.success(res?.data?.message);
        }
      })
      .catch((err) => console.log("err", err));
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
  }

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
            <table className="table">
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
                    asd?.firstname.toLowerCase().includes(query)
                  )
                  .map(
                    (
                      {
                        _id,
                        firstname,
                        lastname,
                        phone,
                        doctorPhone,
                        paySumm,
                        paySum,
                        payState,
                        choseDoctor,
                        doctorFirstName,
                        doctorLastName,
                        doctorSpecialization,
                      },
                      inx
                    ) => (
                      <tr key={inx}>
                        <td data-label="Bemor">
                          {lastname} {firstname}
                        </td>
                        <td data-label="Tel No">{PhoneNumberFormat(phone)}</td>
                        <td data-label="Yo'naltirildi">{choseDoctor}</td>
                        <td data-label="Doktor">
                          {doctorLastName} {doctorFirstName}
                        </td>
                        <td data-label="To'landi">
                          <div className="PayContainer">
                            <div className="PayPatients">
                              {/* <label className="containerChe PayCHe">
                              {payState ? (
                                <AiOutlineCheckCircle className="Md" />
                              ) : (
                                <MdOutlineDoNotDisturbAlt className="Ai" />
                              )}
                              <input
                                value="Reception"
                                onChange={(e) => updatePayState(e, _id)}
                                name="o"
                                id="chi"
                                type="radio"
                              />
                              <span className="checkmark"></span>
                            </label> */}
                              <Button
                                onClick={(e) => {
                                  setList(true);
                                  setTimeout(() => {
                                    updatePayState(e, _id);
                                  }, 2000);
                                }}
                              >
                                Qabul qilish
                              </Button>
                            </div>
                            {payState ? (
                              <i className="Tolanmadi lee">{paySumm} so'm</i>
                            ) : (
                              <del className="Tolanmadi lii">
                                {NumberFormat(
                                  doctors.data?.find(
                                    (i) =>
                                      i.specialization?.toLowerCase() ===
                                      choseDoctor?.toLowerCase()
                                  )?.feesPerCunsaltation
                                )}{" "}
                                so'm
                              </del>
                            )}
                          </div>
                        </td>
                        <td data-label="O'chirish">
                          <button
                            onClick={() => showDeleteClients(_id)}
                            button="true"
                            className="btn btn-danger"
                          >
                            Del
                          </button>
                        </td>

                        <td
                          className={`${list ? "viewCheckList" : "ListNone"}`}
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
                                  <h2 className="item-h2">
                                    Har doim siz bilan!
                                  </h2>
                                </div>
                              </center>

                              <div id="mid">
                                <div className="info">
                                  <h2 className="item-h2">
                                    Aloqa uchun malumot
                                  </h2>
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
                                        {choseDoctor}: Oliy toifali shifokor
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
                                      <p className="itemtext">
                                        +998{doctorPhone}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="service">
                                    <div className="tableitem">
                                      <p className="itemtext">Qabul :</p>
                                    </div>

                                    <div className="tableitem">
                                      <p className="itemtext">
                                        {NumberFormat(paySum)} so'm
                                      </p>
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
                                      <h2 className="item-h1">
                                        {NumberFormat(paySum)} so'm
                                      </h2>
                                    </div>
                                  </div>
                                </div>

                                <div id="legalcopy">
                                  <h2>{filterarxiv?.length}</h2>
                                  <p>Sizning navbatingiz!</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ display: "none" }}>
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
                            filterarxiv={filterarxiv}
                          />
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
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
            <table className="table">
              <thead>
                <tr>
                  <th>Bemor</th>
                  <th>Tel No</th>
                  <th>Yo'naltirildi</th>
                  <th>Doktor</th>
                  <th>To'landi</th>
                  <th>O'chirish</th>
                </tr>
              </thead>
              <tbody>
                {dataTrue
                  ?.filter((asd) =>
                    asd.firstname?.toLowerCase().includes(query)
                  )
                  .map((item, inx) => (
                    <tr key={inx}>
                      <td data-label="Bemor">
                        {item?.lastname} {item?.firstname}
                      </td>
                      <td data-label="Tel No">
                        {PhoneNumberFormat(item?.phone)}
                      </td>
                      <td data-label="Yo'naltirildi">{item?.choseDoctor}</td>
                      <td data-label="Doktor">
                        {item?.doctorLastName} {item?.doctorFirstName}
                      </td>
                      <td data-label="To'landi">
                        {NumberFormat(item?.paySumm)} so'm
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
                  ))}
              </tbody>
            </table>
          )}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Patients;
