import React, { useState, useRef } from "react";
import "./style.css";
import { NumberFormat } from "../../../hook/NumberFormat";
import { message, Tabs, Modal } from "antd";
import { FiX } from "react-icons/fi";
import { GiEntryDoor } from "react-icons/gi";
import { PiPrinterFill } from "react-icons/pi";
import ReactToPrint from "react-to-print";
import CheckList from "../../../components/checkLists/checkList/CheckList";
import Layout from "../../../components/layout/Layout";
import { useGetAllRoomsQuery } from "../../../redux/roomApi";

function CabindEnter() {
  let { data: room } = useGetAllRoomsQuery();
  let category = localStorage?.getItem("category");

  let clients = room?.capacity?.filter(
    (client) =>
      client.choseDoctor === category &&
      client.payState &&
      client.view !== true
  );

  let time = new Date();
  const CountingDay = (value) => {
    let date1 = new Date(value);
    let date2 = new Date();
    if (date1.getTime() && date2.getTime()) {
      let timeDifference = date2.getTime() - date1.getTime();
      let dayDifference = Math.floor(
        Math.abs(timeDifference / (1000 * 3600 * 24))
      );
      return dayDifference;
    } else {
      return "Error";
    }
  };

  return (
    <Layout>
      <div className="Room_wrapperDoc">
        <table className="table">
          <thead>
            <tr>
              <th>Bemor</th>
              <th>Yoshi</th>
              <th>Yo'naltirildi</th>
              <th>Kun</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map(
              (
                {
                  _id,
                  firstname,
                  lastname,
                  phone,
                  year,
                  doctorFirstName,
                  dayOfTreatment,
                },
                inx
              ) => (
                <tr key={inx}>
                  <td data-label="Bemor">
                    {firstname} {lastname}
                  </td>
                  <td data-label="Yoshi">
                    {!(time.getFullYear() - +year?.slice(0, 4)) &&
                      "noma'lum"}
                  </td>
                  <td data-label="Tel No">{phone}</td>
                  <td data-label="Kun">{CountingDay(dayOfTreatment)}</td>

                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default CabindEnter;
