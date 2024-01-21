import React, { useState, useRef } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactToPrint from "react-to-print";
import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
import { FaUsers } from "react-icons/fa";
import { setInfo } from "../../../redux/recordList/recordList";
import { PiPrinterFill } from "react-icons/pi";
import RecordList from "../../../components/checkLists/patientRecordList/RecordList";
import { useGetAllUsersQuery } from "../../../redux/clientApi";
import imgNoData from "../../../assets/nodata.png";
import { PhoneNumberFormat } from "../../../hook/NumberFormat";
import Layout from "../../../components/layout/Layout";

const GetPatients = () => {
  const componentRef = useRef();
  // const { _id } = useParams();

  const dispatch = useDispatch();
  const [query, setQuery] = useState("");


  const checkID = (id) => {
    dispatch(setInfo(id));
  };

  // ----------------------------------------
  let { data: allClient } = useGetAllUsersQuery();
  let client = allClient?.data || [];

  let category = localStorage.getItem("doctorID");

  let clients = client?.map(i => i?.stories?.filter((i) => i?.doctorID === category && i?.view))?.filter((i) => i?.length > 0)


  let arr = [];
  for (let i = 0; i < clients?.length; i++) {
    arr.push(client[i]);
  }

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
      <div className="Search-Box">
        <div className="searchingBox">
          <div></div>
          {clients?.length >= 1 ? (
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
          <>
            {arr
              ?.filter((asd) => asd?.firstname?.toLowerCase().includes(query))
              .map((item) => (
                <div
                  key={item._id}
                  className={`map-item ${collapsedItems.includes(item._id) ? "collapsed" : ""
                    }`}
                >
                  <div
                    className="collapsedItems_p"
                    onClick={() => handleToggleCollapse(item._id)}
                  >
                    <p>
                      {collapsedItems.includes(item._id) ? "🔽" : "▶️"}{" "}
                      <span>
                        {item?.lastname} {item?.firstname}
                      </span>{" "}
                    </p>
                    <p>{item?.address}</p>
                    <p>+998 {PhoneNumberFormat(item?.phone)}</p>
                    <p>
                      {item?.stories?.view !== true ? item?.stories?.length : ""}
                    </p>
                  </div>
                  {collapsedItems.includes(item._id) && (
                    <>
                      {item.stories.map((a, inx) => (
                        <div key={inx} className="">
                          {a?.retsept && (
                            <div
                              key={a?.retsept?.writed_at}
                              className={`map-item ${collapsedItems.includes(a?.retsept?.writed_at)
                                ? "collapsed"
                                : ""
                                }`}
                            >
                              <div className="collapsedItems_IntoBox">
                                <p
                                  onClick={() =>
                                    handleToggleCollapse(a?.retsept?.writed_at)
                                  }
                                >
                                  {collapsedItems.includes(a?.retsept?.writed_at)
                                    ? "🔽"
                                    : "▶️"}{" "}
                                  <span>{a?.retsept?.writed_at}</span>{" "}
                                </p>
                                <p>{a?.retsept?.sickname}</p>
                                <p>{a?.retsept?.patientStatus}</p>
                                <p>
                                  <ReactToPrint
                                    trigger={() => (
                                      <button
                                        onFocus={() =>
                                          checkID({
                                            _id: category,
                                            choseDoctor: a?.choseDoctor,
                                            day: a?.retsept?.writed_at,
                                            address: item?.address,
                                            doctorFirstName: a?.doctorFirstName,
                                            doctorLastName: a?.doctorLastName,
                                            firstname: item?.firstname,
                                            lastname: item?.lastname,
                                            phone: item?.phone,
                                            retsept: a?.retsept?.retseptList,
                                            sickname: a?.retsept?.sickname,
                                            year: item?.year,
                                            doctorPhone: a?.doctorPhone,
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
                                  <div style={{ display: "none" }}>
                                    <RecordList
                                      componentRef={componentRef}
                                    />
                                  </div>
                                </p>
                              </div>
                              {collapsedItems.includes(a?.retsept?.writed_at) && (
                                <div className="retseptList">
                                  <div className="texCenter">
                                    <i>Dorilar ro'yxati</i>
                                  </div>
                                  <p>{a?.retsept?.retseptList}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default GetPatients;

// import React, { useState } from "react";
// import Layout from "../../../components/layout/Layout";
// import "./style.css";
// import { Button, Tabs } from "antd";
// import imgNoData from "../../../assets/nodata.png";
// import { useGetAllUsersQuery } from "../../../redux/clientApi";
// import { setInfo } from "../../../redux/recordList/recordList";
// import { useDispatch } from "react-redux";
// import { FaUsers } from "react-icons/fa";
// import { SearchOutlined } from "@ant-design/icons";
// import { LuEye } from "react-icons/lu";
// import { Link } from "react-router-dom";

// function PatientsHistory() {
//   const [id, setidD] = useState("No data");
//   const dispatch = useDispatch();

//   let { data: allUsers } = useGetAllUsersQuery();
//   let data = allUsers?.data;

//   const checkID = (id) => {
//     setidD(id);
//     dispatch(setInfo(id));
//   };
//   let category = localStorage.getItem("category");

//   // let clients = data?.filter(
//   //   (client) =>
//   //     client?.stories.choseDoctor?.toLowerCase() === category?.toLowerCase() &&
//   //     client?.stories.view === false
//   // );
//   let clients = data?.map(i => i?.stories?.filter((i) => i?.choseDoctor === category))?.filter((i) => i?.length > 0)

//   let arr = []
//   for (let i = 0; i < clients?.length; i++) {
//     arr.push(data[i]);
//   }

//   let time = new Date();
//   let day =
//     time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
//   let filterarxiv = clients?.filter((i) => i?.stories?.day == day);

//   const [query, setQuery] = useState("");
//   return (
//     <Layout>
//       <h3 className="text-center">Arxiv</h3>
//       <div
//         className="search"
//         style={{ border: "1px solid grey", margin: "auto" }}
//       >
//         <div>
//           <FaUsers />-{clients?.length}
//         </div>
//         <input
//           value={query}
//           onChange={(e) => setQuery(e.target.value.toLowerCase())}
//           type="text"
//           placeholder="Izlash..."
//         />
//         <SearchOutlined />
//       </div>
//       <Tabs>
//         <Tabs.TabPane tab="Bugungi" key={0}>
//           {filterarxiv == 0 ? (
//             <div className="NoData">
//               <div className="NoDataImg">
//                 <img src={imgNoData} alt="No Data" />
//               </div>
//             </div>
//           ) : (
//             <main className="tableMain" id="customers_table">
//               <section className="table__body">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>№</th>
//                       <th>Sana</th>
//                       <th>Bemor</th>
//                       <th>Tashxis</th>
//                       <th>Tel</th>
//                       <th>Ko'rish</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filterarxiv
//                       ?.filter((asd) =>
//                         asd?.firstname?.toLowerCase().includes(query)
//                       ).stories?.map(
//                         (value, inx) => {
//                           return (
//                             <tr key={inx}>
//                               <td>{inx + 1}</td>
//                               <td>{value?.day}</td>

//                               <td>
//                                 {" "}
//                                 {filterarxiv?.lastname} {filterarxiv?.firstname}
//                               </td>
//                               <td>{value?.sickname}</td>
//                               <td>+998{filterarxiv?.phone}</td>

//                               <td type="primary">
//                                 <Button>
//                                   <Link o={`/doctorSinglePage/${value.choseDoctor}`}>
//                                     <LuEye />
//                                   </Link>
//                                 </Button>
//                               </td>
//                             </tr>
//                           )
//                         }
//                       )}
//                   </tbody>
//                 </table>
//               </section>
//             </main>
//           )}
//         </Tabs.TabPane>
//         <Tabs.TabPane tab="Jammi" key={1}>
//           {arr == 0 ? (
//             <div className="NoData">
//               <div className="NoDataImg">
//                 <img src={imgNoData} alt="No Data" />
//               </div>
//             </div>
//           ) : (
//             <main className="tableMain" id="customers_table">
//               <section className="table__body">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>№</th>
//                       <th>Sana</th>
//                       <th>Bemor</th>
//                       <th>Tashxis</th>
//                       <th>Tel</th>
//                       <th>Ko'rish</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {clients
//                       ?.filter((asd) =>
//                         asd?.firstname?.toLowerCase().includes(query)
//                       )?.map(
//                         (value, inx) => {
//                           return (
//                             <tr key={inx}>
//                               <td>{inx + 1}</td>
//                               <td>{value?.day}</td>
//                               <td>
//                                 {" "}
//                                 {clients?.lastname} {clients?.firstname}
//                               </td>
//                               <td>{value?.sickname}</td>
//                               <td>+998{clients?.phone}</td>

//                               <td type="primary">
//                                 <Button>
//                                   <Link o={`/doctorSinglePage/${value.choseDoctor}`}>
//                                     <LuEye />
//                                   </Link>
//                                 </Button>
//                               </td>
//                             </tr>
//                           )
//                         }
//                       )}
//                   </tbody>
//                 </table>
//               </section>
//             </main>
//           )}
//         </Tabs.TabPane>
//       </Tabs>
//     </Layout>
//   );
// }

// export default PatientsHistory;
