import React from "react";
import "./style.css";
import Qeu from "./MedLogoList.png";
import { IoIosCall, IoIosMail } from "react-icons/io";

import { useSelector } from "react-redux";

const RecordList = (props) => {
  // let { componentRef } = props;

  const { info } = useSelector((s) => s.recordList);
  let userInfo = info;
  let time = new Date();

  return (
    <>
      <div ref={props?.componentRef} className="List_Container">
        <div className="listNav">
          <div className="listNav_text">
            <h1>SALOMATLIK TANLASH KLINIKASI</h1>
            <p>[Namangan Pop, Tinchlik ko'chasi 6-uy]</p>
            <p>[choiceclinic.uz / choiceclinic@gmail.com]</p>
          </div>

          <div className="List_Img-box">
            <img src={Qeu} alt="" />
          </div>
        </div>

        <div className="textList">
          <div className="listClinic-info">
            <div className="D-info">
              <b style={{ color: "#0095ff" }}>
                Doktor:{" "}
                {userInfo?.doctorFirstName + " " + userInfo?.doctorLastName}
              </b>
              <b>Retsep raqami: [{userInfo?.phone}]</b>
            </div>
            <div className="D-info">
              <b>[{userInfo?.choseDoctor}]</b>
              <b>Sana: {userInfo?.day}</b>
            </div>
            <div className="D-info">
              <b>[+998 {userInfo?.phone}]</b>
            </div>
          </div>
          <div className="Tashxis"></div>
          <h3>Dorilar ro'yxati!</h3>
          <div className="listClinic-Record">
            <b>[{userInfo?.retsept}]</b>
          </div>

          <div className="listClinic-UserInfo">
            <div className="userInf">
              <span className="Inf-box1">
                <b>Janob/Xonim:</b>
              </span>
              <span className="Inf-box2">
                <p>[{userInfo?.firstname + " " + userInfo?.lastname}]</p>
              </span>
            </div>
            <div className="userInf">
              <span className="Inf-box1">
                <b>Yosh:</b>
              </span>
              <span className="Inf-box2">
                <p>
                  [{" "}
                  {userInfo?.year ? time.getFullYear() - +userInfo?.year?.slice(0, 4) : 0}
                  ]
                </p>
              </span>
            </div>
            <div className="userInf">
              <span className="Inf-box1">
                <b>Manzil:</b>
              </span>
              <span className="Inf-box2">
                <p>[{userInfo?.address ? userInfo?.address : "nomalum"}]</p>
              </span>
            </div>
            <div className="userInf">
              <span className="Inf-box1">
                <b>Aloqa raqami:</b>
              </span>
              <span className="Inf-box2">
                <p>[+998{userInfo?.phone}]</p>
              </span>
            </div>
          </div>
        </div>
        <div className="textList-footer">
          <p>
            <IoIosCall /> [+998 94 432 44 54]
          </p>
          <p>
            <IoIosMail /> choiceclinic@gmail.com
          </p>
        </div>
      </div>
    </>
  );
};
export default RecordList;
