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
import { MdOutlineBiotech } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

function Appointments() {
  let { data: allClients, isSuccess } = useGetAllUsersQuery();
  let data = allClients?.data || [];
  const [query, setQuery] = useState("");

  let category = localStorage.getItem("doctorID");

  // tashriflar soni
  let visited = [];
  for (const item of data) {
    item.stories.forEach((s) => s?.doctorID === category && visited.push(s));
  }

  let clients = data?.filter(
    (client) =>
      client?.stories[0]?.doctorID?.toLowerCase() ===
        category?.toLowerCase() &&
      client?.stories[0].payState &&
      client?.stories[0].view !== true
  );
  localStorage.setItem("ClientLength", clients?.length);

  let clientLength = data?.filter((client) =>
    client?.stories?.filter(
      (i) => i?.doctorID?.toLowerCase() === category?.toLowerCase()
    )
  );

  const Bmi = (weight, height) => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      return bmiValue;
    }
  };

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
                  {category !== "Analiz" && <th>Analiz</th>}
                  <th>diagnostika</th>
                  <th>Tana massa indeksi</th>
                  {/* <th>Tashrifi</th> */}
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
                      {category !== "Analiz" && (
                        <td>
                          <div className="box-bmi">
                            {item?.stories[0].blood_analysis ||
                            item?.stories[0].urgent ||
                            item?.stories[0].biochemical_analysis ? (
                              <>
                                {item?.stories[0].blood_analysis ? (
                                  <span>
                                    <div>
                                      <MdOutlineBloodtype /> Qon tahlili{" "}
                                      <FaCheck className="checkMark" />
                                    </div>
                                  </span>
                                ) : (
                                  ""
                                )}
                                {item?.stories[0].urgent ? (
                                  <span>
                                    <div>
                                      <BiAnalyse /> Peshob tahlili{" "}
                                      <FaCheck className="checkMark" />
                                    </div>
                                  </span>
                                ) : (
                                  ""
                                )}
                                {item?.stories[0].biochemical_analysis ? (
                                  <span>
                                    <div>
                                      <MdOutlineBiotech /> Bioximik tahlili{" "}
                                      <FaCheck className="checkMark" />
                                    </div>
                                  </span>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              "Topshirmagan"
                            )}
                          </div>
                        </td>
                      )}
                      <td>
                        <div className="box-bmi">
                          {item?.stories[0].diagnostics ? (
                            <span>
                              <div>
                                <BsDiagram3 className="Diagram" />{" "}
                                {item?.stories[0].diagnostics}
                              </div>
                            </span>
                          ) : (
                            "O'tmagan"
                          )}
                        </div>
                      </td>
                      <td>
                        {item?.stories[0].weight && item?.stories[0].height ? (
                          <div className="box-bmi">
                            <span>
                              <div>
                                <GiWeightScale /> {item?.stories[0].weight} kg
                              </div>
                              <div>
                                <GiBodyHeight /> {item?.stories[0].height} m
                              </div>
                            </span>
                            <span>
                              <div>
                                <LiaTemperatureHighSolid />{" "}
                                {item?.stories[0].temperature}
                              </div>
                              <div>
                                {" "}
                                BMI{" "}
                                {Bmi(
                                  +item?.stories[0].weight,
                                  +item?.stories[0].height
                                )}
                              </div>
                            </span>
                          </div>
                        ) : (
                          "Topshirmagan"
                        )}
                      </td>

                      {/* <td>
                         {clientLength
                          ?.find((i) => i.idNumber === item?.idNumber)
                          ?.stories?.reduce(
                            (a, b) => (a + b.view ? b.view : 0),
                            0
                          )}
                      </td> */}
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
