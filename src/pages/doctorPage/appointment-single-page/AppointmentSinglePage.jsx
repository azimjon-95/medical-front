import React, { useRef, useState } from "react";
import "./AppointmentSinglePage.css";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import {
  useGetSingleUserQuery,
  useUpdateClientMutation,
} from "../../../redux/clientApi";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { GiBodyHeight } from "react-icons/gi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { MdOutlineBloodtype } from "react-icons/md";
import { GiWeightScale } from "react-icons/gi";
import { BiAnalyse } from "react-icons/bi";
import { BsDiagram3 } from "react-icons/bs";
import { MdOutlineBiotech } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Button } from "antd";
import ReactToPrint from "react-to-print";
import { PiPrinterFill } from "react-icons/pi";
import { setInfo } from "../../../redux/recordList/recordList";
import RecordList from "../../../components/checkLists/patientRecordList/RecordList";

function AppointmentSinglePage() {
  const [updateClient] = useUpdateClientMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [sickname, setSickname] = useState("");
  const [retsept, setRetsept] = useState("");
  const [patientStatus, setPatientStatus] = useState("");
  const componentRef = useRef(); // Fix: Use useRef correctly
  const [_id, setidD] = useState("No data");

  const checkID = (_id) => {
    setidD(_id);
    dispatch(setInfo(_id));
  };

  let { data: singleUser } = useGetSingleUserQuery(id);
  let user = singleUser?.data;
  let user1 = user?.stories?.filter((i) => i?.view === true);
  console.log(user1);

  // user?.stories = user?.stories?.shift();

  function updateUserInfo(e) {
    e.preventDefault();
    let time = new Date();
    let todaysTime =
      time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

    let { stories, ...userInfo } = user;
    let last_story = {
      ...user.stories[0],
      retsept: {
        writed_at: todaysTime,
        writed_doctor:
          user?.stories[0]?.doctorFirstName +
          " " +
          user?.stories[0]?.doctorLastName,
        patientStatus,
        sickname,
        retseptList: retsept,
      },
      view: true,
    };
    let arrStory = [...user?.stories];
    arrStory?.shift();
    arrStory.unshift(last_story);

    let changedObj = { ...userInfo, stories: arrStory };

    updateClient({ id: id, body: changedObj })
      .then((res) => {
        if (res.data.success) {
          message.success("malumotlar saqlandi");
          navigate(`/doctor/patients_history`);
        }
      })
      .catch((err) => console.log(err));

    dispatch(setInfo(changedObj));
  }

  const Bmi = (weight, height) => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      return bmiValue;
    }
  };

  const [collapsedItems, setCollapsedItems] = useState([]);

  const handleToggleCollapse = (itemId) => {
    const isCollapsed = collapsedItems.includes(itemId);
    if (isCollapsed) {
      setCollapsedItems(collapsedItems.filter((id) => id !== itemId));
    } else {
      setCollapsedItems([...collapsedItems, itemId]);
    }
  };

  return (
    <Layout>
      <div className="appointmentSinglePage">
        <div className="appointmentSinglePage_info">
          <span>
            <span>
              <b>Bemor:</b>
              <h3>{user?.firstname + " " + user?.lastname} </h3>
            </span>
            <span>
              <b>Tel raqam</b>
              <h3>{user?.phone}</h3>
            </span>
          </span>
          <div>
            <div className="box-bmi_Sing">
              <b>Tana Massa Indeksi:</b>
              <span>
                <div>
                  <GiWeightScale /> {user?.stories[0].weight} kg
                </div>
                <div>
                  <GiBodyHeight /> {user?.stories[0].height} m
                </div>
              </span>
              <span>
                <div>
                  <LiaTemperatureHighSolid /> {user?.stories[0].temperature}
                </div>
                <div>
                  {" "}
                  BMI {Bmi(+user?.stories[0].weight, +user?.stories[0].height)}
                </div>
              </span>
            </div>
          </div>
          <div>
            <div className="box-bmi_Sing">
              <b>Analiz</b>
              {user?.stories[0].blood_analysis ||
              user?.stories[0].urgent ||
              user?.stories[0].biochemical_analysis ? (
                <>
                  {user?.stories[0].blood_analysis ? (
                    <span>
                      <div>
                        <MdOutlineBloodtype /> Qon tahlili{" "}
                        <FaCheck className="checkMark" />
                      </div>
                    </span>
                  ) : (
                    ""
                  )}
                  {user?.stories[0].urgent ? (
                    <span>
                      <div>
                        <BiAnalyse /> Peshob tahlili{" "}
                        <FaCheck className="checkMark" />
                      </div>
                    </span>
                  ) : (
                    ""
                  )}
                  {user?.stories[0].biochemical_analysis ? (
                    <span>
                      <div>
                        <MdOutlineBiotech /> Bioximik tahlili{" "}
                        <FaCheck className="checkMark" />
                      </div>
                    </span>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <span>Topshirmagan</span>
              )}
            </div>
          </div>
          <div>
            <div className="box-bmi_Sing">
              <b>Diagnostika</b>
              {user?.stories[0].diagnostics ? (
                <span>
                  <div>
                    <BsDiagram3 className="Diagram" />{" "}
                    {user?.stories[0].diagnostics}
                  </div>
                </span>
              ) : (
                <span>O'tmagan</span>
              )}
            </div>
          </div>
        </div>

        <div className="extraInfo">
          <form onSubmit={updateUserInfo}>
            <label htmlFor="">kasallik nomi*</label>
            <input
              type="text"
              value={sickname}
              onChange={(e) => setSickname(e.target.value)}
            />
            <label htmlFor="">Bemor holati*</label>
            <input
              type="text"
              value={patientStatus}
              onChange={(e) => setPatientStatus(e.target.value)}
            />
            <label htmlFor="" className="label">
              Retsept(dorilar)*
            </label>
            <textarea
              name=""
              cols="30"
              rows="10"
              value={retsept}
              onChange={(e) => setRetsept(e.target.value)}
            ></textarea>
            <button button="true" className="btn btn-secondary">
              Saqlash
            </button>
          </form>
        </div>

        {user?.stories ? (
          <div div className="retsept_history">
            <h4>Tarix:</h4>

            {user?.stories?.map((item) => (
              <div
                key={item._id}
                className={`map-item ${
                  collapsedItems.includes(item._id) ? "collapsed" : ""
                }`}
              >
                <div
                  className="collapsedItems"
                  onClick={() => handleToggleCollapse(item._id)}
                >
                  <p>
                    {" "}
                    {collapsedItems.includes(item._id) ? "🔽" : "▶️"} Sana:{" "}
                    <span>{item?.day}</span>{" "}
                  </p>
                  <p>
                    Doktor:{" "}
                    <span>
                      {item?.doctorFirstName} {item?.doctorLastName}
                    </span>{" "}
                  </p>
                </div>
                {collapsedItems.includes(item._id) && (
                  <>
                    <div myAttribute={true} className="item-details">
                      <div div="true">
                        <i>kasallik nomi</i>
                        {item?.retsept?.sickname}
                      </div>
                      <div>
                        <i>Status</i>
                        {item?.retsept?.patientStatus}
                      </div>
                      <div>
                        <i>Dorilar ro'yxati</i>
                        {item?.retsept?.retseptList}
                      </div>
                      <Button>
                        <ReactToPrint
                          trigger={() => (
                            <button
                              onFocus={() =>
                                checkID({
                                  _id: _id,
                                  choseDoctor: item?.choseDoctor,
                                  day: item?.day,
                                  address: user?.address,
                                  doctorFirstName: item?.doctorFirstName,
                                  doctorLastName: item?.doctorLastName,
                                  firstname: user?.firstname,
                                  lastname: user?.lastname,
                                  phone: user?.phone,
                                  retsept: item?.retsept?.retseptList,
                                  sickname: item?.retsept?.sickname,
                                  year: user?.year,
                                  doctorPhone: item?.doctorPhone,
                                })
                              }
                              style={{
                                border: "none",
                                background: "transparent",
                                fontSize: "14px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <PiPrinterFill className="Printer" />
                            </button>
                          )}
                          content={() => componentRef.current}
                        />
                      </Button>
                    </div>

                    <div style={{ display: "none" }}>
                      <RecordList componentRef={componentRef} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}

export default AppointmentSinglePage;
