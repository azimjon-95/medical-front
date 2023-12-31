import React, { useState, useRef } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LuEye } from "react-icons/lu";
import { Tabs } from "antd";
import imgNoData from "../../../../assets/nodata.png";
import ReactToPrint from "react-to-print";
import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
import { FaUsers } from "react-icons/fa";
import { setInfo } from "../../../../redux/recordList/recordList";

import RecordList from "../../../../components/checkLists/patientRecordList/RecordList";
import { useGetAllUsersQuery } from "../../../../redux/clientApi";

const GetPatients = () => {
  const componentRef = useRef();
  const { _id } = useParams();

  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [id, setidD] = useState("No data");
  const checkID = (id) => {
    setidD(id);
    dispatch(setInfo(id));
  };
  // ----------------------------------------
  let { data: allClient } = useGetAllUsersQuery();
  let client = allClient?.data;

  let clients = client?.filter(
    (client) =>
      client.choseDoctor.toLowerCase() === _id?.toLowerCase() &&
      client.view === true
  );

  let time = new Date();
  let day =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
  let filterarxiv = clients?.filter((i) => i.day == day);
  console.log(clients);
  return (
    <div className="Search-Box">
      <div className="searchingBox">
        <Link to="/">
          <h4>
            <LeftOutlined />
            Medme
          </h4>
        </Link>
        {clients?.length >= 10 ? (
          <div className="search">
            <div>
              <FaUsers />-{clients?.length}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              type="text"
              placeholder="Izlash..."
            />
            <SearchOutlined />
          </div>
        ) : (
          <></>
        )}
      </div>



      {clients?.length === 0 ? (
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
                  <th>Tashxis</th>
                  <th>Tel</th>
                  <th>Ko'rish</th>
                </tr>
              </thead>
              <tbody>
                {clients
                  ?.filter((asd) =>
                    asd?.firstname?.toLowerCase().includes(query)
                  )
                  .map(
                    (
                      {
                        _id,
                        choseDoctor,
                        day,
                        address,
                        doctorFirstName,
                        doctorLastName,
                        firstname,
                        lastname,
                        phone,
                        retsept,
                        sickname,
                        year,
                        doctorPhone,
                      },
                      inx
                    ) => {
                      return !lastname?.includes("Mavjud") ? (
                        <tr key={inx}>
                          <td>{inx + 1}</td>
                          <td> {lastname} {firstname}</td>
                          <td>{sickname}</td>
                          <td>+998{phone}</td>

                          <td>
                            <div className="LuEyeBtn">
                              <ReactToPrint
                                trigger={() => (
                                  <button
                                    onFocus={() =>
                                      checkID({
                                        _id,
                                        choseDoctor,
                                        day,
                                        address,
                                        doctorFirstName,
                                        doctorLastName,
                                        firstname,
                                        lastname,
                                        phone,
                                        retsept,
                                        sickname,
                                        year,
                                        doctorPhone,
                                      })
                                    }
                                    style={{
                                      border: "none",
                                      background: "transparent",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <LuEye className="Printer" />
                                  </button>
                                )}
                                // trigger={() => <button onClick={() => checkID(_id)} style={{ border: "none", background: "transparent", fontSize: "14px" }}>< LuEye className='Printer' /></button>}
                                content={() => componentRef.current}
                              />
                            </div>
                          </td>
                          <td style={{ display: "none" }}>
                            <RecordList
                              obj={{
                                id,
                                componentRef,
                                choseDoctor,
                                day,
                                address,
                                doctorFirstName,
                                doctorLastName,
                                firstname,
                                lastname,
                                phone,
                                retsept,
                                sickname,
                                year,
                                doctorPhone,
                              }}
                              componentRef={componentRef}
                            />
                          </td>
                        </tr>
                      ) : ""
                    })}

              </tbody>
            </table>
          </section>
        </main>
      )}


    </div>
  );
};

export default GetPatients;

































// <table className="table">
//   <thead>
//     <tr>
//       <th>№</th>
//       <th>Bemor</th>
//       <th>Tashxis</th>
//       <th>Tel</th>
//       <th>Ko'rish</th>
//     </tr>
//   </thead>
//   <tbody>
//     {clients
//       ?.filter((asd) =>
//         asd?.firstname?.toLowerCase().includes(query)
//       )
//       .map(
//         (
//           {
//             _id,
//             choseDoctor,
//             day,
//             address,
//             doctorFirstName,
//             doctorLastName,
//             firstname,
//             lastname,
//             phone,
//             retsept,
//             sickname,
//             year,
//             doctorPhone,
//           },
//           inx
//         ) => {
//           return !lastname?.includes("Mavjud") ? (
//             <tr key={inx}>
//               <td>{inx + 1}</td>
//               <td className="Bem" data-label="Bemor">
//                 {lastname} {firstname}
//               </td>
//               <td data-label="Tashxis">{sickname}</td>
//               <td data-label="Tel No">+998{phone}</td>
//               <td>
//                 <div className="LuEyeBtn">
//                   <ReactToPrint
//                     trigger={() => (
//                       <button
//                         onFocus={() =>
//                           checkID({
//                             _id,
//                             choseDoctor,
//                             day,
//                             address,
//                             doctorFirstName,
//                             doctorLastName,
//                             firstname,
//                             lastname,
//                             phone,
//                             retsept,
//                             sickname,
//                             year,
//                             doctorPhone,
//                           })
//                         }
//                         style={{
//                           border: "none",
//                           background: "transparent",
//                           fontSize: "14px",
//                         }}
//                       >
//                         <LuEye className="Printer" />
//                       </button>
//                     )}
//                     // trigger={() => <button onClick={() => checkID(_id)} style={{ border: "none", background: "transparent", fontSize: "14px" }}>< LuEye className='Printer' /></button>}
//                     content={() => componentRef.current}
//                   />
//                 </div>
//               </td>
//               <td style={{ display: "none" }}>
//                 <RecordList
//                   obj={{
//                     id,
//                     componentRef,
//                     choseDoctor,
//                     day,
//                     address,
//                     doctorFirstName,
//                     doctorLastName,
//                     firstname,
//                     lastname,
//                     phone,
//                     retsept,
//                     sickname,
//                     year,
//                     doctorPhone,
//                   }}
//                   componentRef={componentRef}
//                 />
//               </td>
//             </tr>
//           ) : (
//             <></>
//           );
//         }
//       )}
//   </tbody>
// </table>