import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import "./Appointments.css";
import { Link } from "react-router-dom";
import { PhoneNumberFormat } from "../../../hook/NumberFormat";
import { GiWeightScale } from "react-icons/gi";
import imgNoData from "../../../assets/nodata.png";
import { useGetAllUsersQuery } from "../../../redux/clientApi";
import { GiBodyHeight } from "react-icons/gi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { MdOutlineBloodtype } from "react-icons/md";
import { BiAnalyse } from "react-icons/bi";
import { BsDiagram3 } from "react-icons/bs";

function Appointments() {

  let { data: allClients, isSuccess } = useGetAllUsersQuery();
  let data = allClients?.data;


  let category = localStorage.getItem("category");
  let clients = data?.filter(
    (client) =>
      client.choseDoctor.toLowerCase() === category?.toLowerCase() &&
      client.payState &&
      client.view !== true
  );
  localStorage.setItem("ClientLength", clients?.length);


  const Bmi = (weight, height) => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      return bmiValue;
    }
  }
  return (
    <Layout>
      <h3 className="text-center">Bemorlar</h3>
      {clients == 0 ? (
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
                  <th>№</th>
                  <th>Bemor</th>
                  <th>Tel No</th>
                  <th>Analiz</th>
                  <th>diagnostika</th>
                  <th>Tana massa indeksi</th>
                  <th>Tashrifi</th>
                  <th>Ko'rish</th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((item, inx) => {
                  return (
                    <tr key={inx}>
                      <td>{inx + 1}</td>
                      <td>
                        {" "}
                        {item.lastname} {item.firstname}
                      </td>
                      <td>+998{PhoneNumberFormat(item.phone)}</td>
                      <td>
                        <div className="box-bmi">
                          <span>
                            <div><MdOutlineBloodtype /> {false ? "" : "Topshirmagan"}</div>
                          </span>
                          <span>
                            <div><BiAnalyse /> {false ? "" : "Topshirmagan"}</div>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="box-bmi">
                          <span>
                            <div><BsDiagram3 className="Diagram"/> {item?.diagnostics}</div>
                          </span>
                          <span>
                            <div><BsDiagram3 /></div>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="box-bmi">
                          <span>
                            <div><GiWeightScale /> {item?.weight} kg</div>
                            <div><GiBodyHeight /> {item?.height} m</div>
                          </span>
                          <span>
                            <div><LiaTemperatureHighSolid /> {item?.temperature}</div>
                            <div> BMI {Bmi(+item?.weight, +item?.height)}</div>
                          </span>

                        </div>
                      </td>
                      <td>1</td>
                      <td>
                        <Link to={`/appointments/${item._id}`}>
                          <button button="true" className="btn btn-secondary">
                            Qabul qilish
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </main>
      )}
    </Layout>
  );
}

export default Appointments;


