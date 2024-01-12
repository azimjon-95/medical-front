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
import { useGetAllUsersQuery } from "../../../redux/clientApi";
import { GiBodyHeight } from "react-icons/gi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { MdOutlineBloodtype } from "react-icons/md";
import { BiAnalyse } from "react-icons/bi";
import { BsDiagram3 } from "react-icons/bs";
import { GiWeightScale } from "react-icons/gi";

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
  console.log(user);

  function updateUserInfo(e) {
    e.preventDefault();
    let newUser = {
      ...user,
      sickname,
      patientStatus,
      retsept,
      view: true,
      room: { ...user.room, dayOfTreatment: "" + user?.room.dayOfTreatment },
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
                <div><GiWeightScale /> 80 kg</div>
                <div><GiBodyHeight /> 180 m</div>
              </span>
              <span>
                <div><LiaTemperatureHighSolid /> 30/40</div>
                <div> BMI 24.56</div>
              </span>

            </div>
          </div>
          <div>
            <div className="box-bmi_Sing">
              <b>Analiz / Diagnostika</b>
              <span>
                <div><GiWeightScale /> 80 kg</div>
                <div><GiBodyHeight /> 180 m</div>
              </span>
              <span>
                <div><LiaTemperatureHighSolid /> 30/40</div>
                <div> BMI 24.56</div>
              </span>

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

        <div className="retsept_history">
          <h3>Tarix:</h3>
          {
            user?.stories?.map((value, inx) => (
              <>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        <div className="retsept_history_item_caption">
                          <p> Sana: <span>{value?.day}</span>{" "}</p>
                          <p>
                            Doctor: <span>{value?.doctorFirstName} {value?.doctorLastName}</span>{" "}
                          </p>
                        </div>
                      </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                        <div className="retsept_history_item">
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
                  </div>
                </div>

              </>
            ))
          }

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
// analysis
// biochemical_analysis
// blood_analysis
// choseDoctor
// day
// diagnostics
// doctorFirstName
// doctorLastName
// doctorPhone
// height
// month
// payState
// paySumm
// room
// temperature
// urgent
// view
// weight
