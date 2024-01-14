import React from "react";
import "./Carousel.css";
import { FaUserDoctor } from "react-icons/fa6";
import { NumberFormat } from "../../../hook/NumberFormat";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa6";
import { TbFilePercent } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useGetDailyReportsQuery } from "../../../redux/dailyReportApi";

function DoctorsSlite() {
  let { data: dailyReports } = useGetDailyReportsQuery();
  let data = dailyReports?.innerData;
  let doctors = data?.doctors || [];
  let dailyMoney = data?.doctorDailyMoney || [];
  let todaysClients = data?.todaysClient || [];

  let time = new Date();
  let day =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

  console.log(dailyReports);

  return (
    <div className="carousel">
      {doctors.length > 0 ? (
        doctors?.map((value, inx) => {
          return (
            <Link
              to={`/doctorSinglePage/${value.specialization}`}
              key={inx}
              className="card"
            >
              <div className="card-inner">
                <FaUserDoctor className="card_icon" />
                <span className="doctorname">
                  {value.firstName}.{value.lastName[0]}
                </span>
                <b>{value.specialization}</b>
              </div>
              <div className="allInfoTotal">
                <div className="sDay">{day}</div>
                <div className="CountDay-M">
                  <LiaMoneyBillWaveSolid />{" "}
                  {value.specialization !== 0 ? (
                    <>
                      {" " + NumberFormat(dailyMoney[value.specialization])}{" "}
                      so'm
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="CountDay-M">
                  <FaUsers />{" "}
                  {value.specialization !== 0 ? (
                    <>{todaysClients[value.specialization]}</>
                  ) : (
                    ""
                  )}
                </div>

                <div className="CountDay-M">
                  {value.percent ? (
                    <div className="CountDay-Box">
                      <div className="CountDay-M">
                        <TbFilePercent /> {value?.percent}%
                      </div>
                      <div className="CountDay-M">
                        <GiTakeMyMoney />{" "}
                        {value.specialization === 0 ? (
                          ""
                        ) : (
                          <>
                            {" "}
                            {NumberFormat(
                              (dailyMoney[value.specialization] *
                                value.percent) /
                                100
                            )}{" "}
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="CountDay-M">
                      <GiTakeMyMoney /> {NumberFormat(value.salary)} so'm
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <>
          <div className="cardSkl">
            <div className="headerSkl">
              <div className="imgSkl"></div>
              <div className="details">
                <span className="nameSkl"></span>
                <span className="about"></span>
              </div>
            </div>
            <div className="description">
              <div className="lineSkl line-1"></div>
              <div className="lineSkl line-2"></div>
            </div>
          </div>
          <div className="cardSkl">
            <div className="headerSkl">
              <div className="imgSkl"></div>
              <div className="details">
                <span className="nameSkl"></span>
                <span className="about"></span>
              </div>
            </div>
            <div className="description">
              <div className="lineSkl line-1"></div>
              <div className="lineSkl line-2"></div>
            </div>
          </div>
          <div className="cardSkl">
            <div className="headerSkl">
              <div className="imgSkl"></div>
              <div className="details">
                <span className="nameSkl"></span>
                <span className="about"></span>
              </div>
            </div>
            <div className="description">
              <div className="lineSkl line-1"></div>
              <div className="lineSkl line-2"></div>
            </div>
          </div>
          <div className="cardSkl">
            <div className="headerSkl">
              <div className="imgSkl"></div>
              <div className="details">
                <span className="nameSkl"></span>
                <span className="about"></span>
              </div>
            </div>
            <div className="description">
              <div className="lineSkl line-1"></div>
              <div className="lineSkl line-2"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DoctorsSlite;
