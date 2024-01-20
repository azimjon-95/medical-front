
import React, { useState } from "react";
import "./style.css";
import { NumberFormat } from "../../../hook/NumberFormat";
import { GrBottomCorner } from "react-icons/gr";
import NoMony from "../../../assets/img/nomony.png";
import moment from "moment";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineBedroomChild } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { useGetAllRoomsQuery } from "../../../redux/roomApi";
import CountUp from 'react-countup';
import { Col, Row, Statistic } from 'antd';
import { useGetBalanceQuery } from "../../../redux/balans";

const Balans = () => {
  let { data: rooms } = useGetAllRoomsQuery();
  let { data: balans } = useGetBalanceQuery();
  let data = balans?.innerData || [];
  const [selectedDate, setSelectedDate] = useState(moment().startOf("day"));

  const back = () => {
    setSelectedDate(selectedDate.clone().subtract(1, "day"));
  };
  const forward = () => {
    setSelectedDate(selectedDate.clone().add(1, "day"));
  };

  let NumberOfTreatments = rooms?.innerData?.reduce(function (prev, cur) {
    return prev + cur.capacity?.length;
  }, 0);

  // ------------------------------------------------------------
  let time = new Date();
  let dayMonth = time.toLocaleString("en-US", { month: "long" });
  let MonthlyIncome = data?.filter((i) => i?.month === dayMonth).reduce(function (prev, cur) {
    return prev + cur?.totalSumm;
  }, 0);

  // ------------------------------------------------------------
  const formatter = (value) => <CountUp end={value} separator="," />;

  const sana = new Date();
  const oyNomlari = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr',
  ];
  const hozirgiSana = oyNomlari[sana.getMonth()];

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c1-content">
        <div className="balansBox">
          <div className="balansTitle">
            <p>Balans</p>
            {true ?
              <div className="bedrom">
                {false ? (
                  ""
                ) : (
                  <>
                    {data?.filter((i) => i?.day === selectedDate.format("DD.M.YYYY"))?.map((i, inx) => (
                      <div key={inx}>
                        <TbUsersGroup /> -  {i?.totalNumPatients}
                      </div>
                    ))}
                  </>
                )}
                {NumberOfTreatments === 0 ? (
                  ""
                ) : (
                  <div>
                    <MdOutlineBedroomChild /> - {NumberOfTreatments}{" "}
                  </div>

                )}
              </div>
              : ''
            }
          </div>
        </div>
        {data?.filter((i) => i?.day == selectedDate.format("DD.M.YYYY"))?.map((value, inx) =>
          <div key={inx} className="balansBox">
            <div className="lg-value1">
              {value?.totalSumm === 0 ? (
                <img src={NoMony} alt="" />
              ) : (
                <div className="payCaounting">
                  <div>
                    <GiMoneyStack /> Jami:
                  </div>
                  <div className="">
                    <Row gutter={16} >
                      <Col span={12} className="lg-value1" >
                        <Statistic value={value?.totalSumm} formatter={formatter} /> so'm
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </div>
            <div className="lg-value1">
              {value?.patientsAmountOfMoney === 0 ? (
                <img src={NoMony} alt="" />
              ) : (
                <div className="payCaounting">
                  <div>
                    <GiMoneyStack /> Bemorlar:
                  </div>

                  <Row gutter={16}>
                    <Col span={12} className="lg-value1">
                      <Statistic style={{ fontSize: "15px" }} value={value?.patientsAmountOfMoney} formatter={formatter} /> so'm
                    </Col>
                  </Row>

                </div>
              )}
            </div>{" "}
            <div className="lg-value1">
              {value?.roomsAmountOfMoney === 0 ? (
                <img src={NoMony} alt="" />
              ) : (
                <div className="payCaounting">
                  <div>
                    <GiMoneyStack /> Xonalar:
                  </div>
                  <Row gutter={16}>
                    <Col span={12} className="lg-value1">
                      <Statistic value={value?.roomsAmountOfMoney} formatter={formatter} /> so'm
                    </Col>
                  </Row>

                </div>
              )}
            </div>
            <div className="lg-bl">
              <div>
                <GiMoneyStack />  {hozirgiSana}:
              </div>
              <div className="lg-Bal">
                <Statistic value={MonthlyIncome} formatter={formatter} /> so'm
              </div>
            </div>
          </div>
        )}
        <div className="card-logo-wrapper">
          <div>
            <div className="changeDate">
              <p className="text text-sm text-white  text-date">
                {selectedDate.format("DD.M.YYYY")}
              </p>
              <span>
                <button onClick={back}><GrBottomCorner className="BottomCorner-1" /></button>


                <button onClick={forward}><GrBottomCorner className="BottomCorner-2" /></button>

              </span>
            </div>
          </div>
          <div className="card-logo">
            <div className="logo-shape1"></div>
            <div className="logo-shape2"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Balans;

