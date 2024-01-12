import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import "./style.css";
import { Button, Tabs } from "antd";
import imgNoData from "../../../assets/nodata.png";
import { useGetAllUsersQuery } from "../../../redux/clientApi";
import { setInfo } from "../../../redux/recordList/recordList";
import { useDispatch } from "react-redux";
import { FaUsers } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";

function PatientsHistory() {
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
      client?.stories.choseDoctor?.toLowerCase() === category?.toLowerCase() &&
      client?.stories.view === false
  );

  let time = new Date();
  let day =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
  let filterarxiv = clients?.filter((i) => i?.stories.day == day);

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
                      <th>Sana</th>
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
                      ).stories?.map(
                        (value, inx) => {
                          return (
                            <tr key={inx}>
                              <td>{inx + 1}</td>
                              <td>{value?.day}</td>

                              <td>
                                {" "}
                                {filterarxiv?.lastname} {filterarxiv?.firstname}
                              </td>
                              <td>{value?.sickname}</td>
                              <td>+998{filterarxiv?.phone}</td>

                              <td type="primary">
                                <Button>
                                  <Link o={`/doctorSinglePage/${value.choseDoctor}`}>
                                    <LuEye />
                                  </Link>
                                </Button>
                              </td>
                            </tr>
                          )
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
                      <th>Sana</th>
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
                      ).stories?.map(
                        (value, inx) => {
                          return (
                            <tr key={inx}>
                              <td>{inx + 1}</td>
                              <td>{value?.day}</td>
                              <td>
                                {" "}
                                {clients?.lastname} {clients?.firstname}
                              </td>
                              <td>{value?.sickname}</td>
                              <td>+998{clients?.phone}</td>

                              <td type="primary">
                                <Button>
                                  <Link o={`/doctorSinglePage/${value.choseDoctor}`}>
                                    <LuEye />
                                  </Link>
                                </Button>
                              </td>
                            </tr>
                          )
                        }
                      )}
                  </tbody>
                </table>
              </section>
            </main>
          )}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default PatientsHistory;
