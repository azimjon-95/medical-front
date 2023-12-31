import React, { useRef, useState } from "react";
import Layout from "../../../components/layout/Layout";
import "./style.css";
import NotificationSound from "../../../assets/ayfon-sms.mp3";
import { Button, Tabs } from "antd";
import imgNoData from "../../../assets/nodata.png";
import { PiPrinterFill } from "react-icons/pi";
import ReactToPrint from "react-to-print";
import RecordList from "../../../components/checkLists/patientRecordList/RecordList";
import { useGetAllUsersQuery } from "../../../redux/clientApi";
import { setInfo } from "../../../redux/recordList/recordList";
import { useDispatch } from "react-redux";
import { FaUsers } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";

function PatientsHistory() {
  const componentRef = useRef();
  const audioPlayer = useRef(null);
  const [id, setidD] = useState("No data");
  const dispatch = useDispatch();

  let { data: allUsers } = useGetAllUsersQuery();
  let data = allUsers?.data;

  const checkID = (id) => {
    setidD(id);
    dispatch(setInfo(id));
  };
  let category = localStorage.getItem("category");

  let clients = data?.filter(
    (client) =>
      client.choseDoctor.toLowerCase() === category?.toLowerCase() &&
      client.view === true
  );

  let time = new Date();
  let day =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
  let filterarxiv = clients?.filter((i) => i.day == day);
  console.log(clients);
  const [query, setQuery] = useState("");
  return (
    <Layout>
      <h3 className="text-center">Arxiv</h3>
      <div
        className="search"
        style={{ border: "1px solid grey", margin: "auto" }}
      >
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
      <Tabs>
        <Tabs.TabPane tab="Bugungi" key={0}>
          {filterarxiv == 0 ? (
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
                    {filterarxiv
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
                              <td>
                                {" "}
                                {lastname} {firstname}
                              </td>
                              <td>{sickname}</td>
                              <td>+998{phone}</td>

                              <td type="primary">
                                <Button>
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
                          ) : (
                            ""
                          );
                        }
                      )}
                  </tbody>
                </table>
              </section>
            </main>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Jammi" key={1}>
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
                              <td>
                                {" "}
                                {lastname} {firstname}
                              </td>
                              <td>{sickname}</td>
                              <td>+998{phone}</td>

                              <td type="primary">
                                <Button>
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
                          ) : (
                            ""
                          );
                        }
                      )}
                  </tbody>
                </table>
              </section>
            </main>
          )}
        </Tabs.TabPane>
      </Tabs>
      <audio ref={audioPlayer} src={NotificationSound} />
    </Layout>
  );
}

export default PatientsHistory;
