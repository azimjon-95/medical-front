import React from "react";
import "./AppointmentSinglePage.css";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import { useState } from "react";
import {
  useGetSingleUserQuery,
  useUpdateClientMutation,
} from "../../../redux/clientApi";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setInfo } from "../../../redux/recordList/recordList";

function AppointmentSinglePage() {
  const [updateClient] = useUpdateClientMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [sickname, setSickname] = useState("");
  const [retsept, setRetsept] = useState("");
  const [patientStatus, setPatientStatus] = useState("");

  let { data: singleUser } = useGetSingleUserQuery(id);
  let user = singleUser?.data;

  function updateUserInfo(e) {
    e.preventDefault();
    let newUser = {
      ...user,
      sickname,
      patientStatus,
      retsept,
      view: true,
      room: { ...user.room, dayOfTreatment: "" + user.room.dayOfTreatment },
    };
    updateClient({ id: id, body: newUser })
      .then((res) => {
        if (res.data.success) {
          message.success("malumotlar saqlandi");
          navigate(`/doctor/patients_history`);
        }
      })
      .catch((err) => console.log(err));

    dispatch(setInfo(newUser));
  }

  return (
    <Layout>
      <div className="appointmentSinglePage">
        <div className="appointmentSinglePage_info">
          <span>
            <b>Bemor:</b>
            <h3>{user?.firstname + " " + user?.lastname} </h3>
          </span>
          <span>
            <b>Tel raqam</b>
            <h3>{user?.phone}</h3>
          </span>
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

        <div className="retsept_history">
          <h3>Tarix:</h3>
          <div className="retsept_history_item">
            <div className="retsept_history_item_caption">
              <p>
                Sana: <span>6.1.2024</span>{" "}
              </p>
              <p>
                Doctor: <span>Fozilbekov Roziqul</span>{" "}
              </p>
            </div>
            <p>Tashxis : Bosh og'rigi</p>
            <p>Bemor holati : Bosh og'rigi</p>
            <ol>
              <li>trimol</li>
              <li>analgin</li>
              <li>analgin</li>
              <li>trimol</li>
              <li>fastungel</li>
            </ol>
          </div>
        </div>
      </div>

      {/* <div style={{ display: "none" }}>
                <RecordList
                    lastname={lastname}
                    firstname={firstname}
                    sickname={sickname}
                    phone={phone}
                    retsept={retsept}
                    address={address}
                    day={day}
                    doctorFirstName={doctorFirstName}
                    doctorLastName={doctorLastName}
                    doctorPhone={doctorPhone}
                    year={year}
                    choseDoctor={choseDoctor}
                    componentRef={componentRef}
                />
            </div> */}
    </Layout>
  );
}

export default AppointmentSinglePage;

//     < RecordList
// id = { id }
// doctorFirstName = { doctorFirstName }
// doctorLastName = { doctorLastName }
// choseDoctor = { choseDoctor }
// phone = { phone }
// day = { day }
// doctorPhone = { doctorPhone }
// retsept = { retsept }
// firstname = { firstname }
// lastname = { lastname }
// year = { year }
// address = { address }
// sickname = { sickname }
// componentRef = { componentRef }
//     />

// {
//     id,
//     componentRef,
//     sickname,
//     phone,
//     doctorFirstName,
//     doctorLastName,
//     choseDoctor,
//     day,
//     doctorPhone,
//     retsept,
//     firstname,
//     lastname,
//     year,
//     address,
// }) => {
