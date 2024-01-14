import React, { useState, useRef } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LuEye } from "react-icons/lu";
import ReactToPrint from "react-to-print";
import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
import { FaUsers } from "react-icons/fa";
import { setInfo } from "../../../../redux/recordList/recordList";
import { Button } from 'antd';
import { PiPrinterFill } from "react-icons/pi";
import RecordList from "../../../../components/checkLists/patientRecordList/RecordList";
import { useGetAllUsersQuery } from "../../../../redux/clientApi";
import imgNoData from "../../../../assets/nodata.png";
import { PhoneNumberFormat } from "../../../../hook/NumberFormat";


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
  let client = allClient?.data || [];

  // let clients = client?.map(i => i?.stories?.filter((i) => i?.choseDoctor === _id && i?.view))?.filter((i) => i?.length > 0)
  let clients = client?.map(i => i?.stories?.filter((i) => i?.choseDoctor === _id))?.filter((i) => i?.length > 0)

  let arr = []
  for (let i = 0; i < clients?.length; i++) {
    arr.push(client[i]);
  }


  let time = new Date();
  let day = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

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
    <div className="Search-Box">
      <div className="searchingBox">
        <Link to="/">
          <h4>
            <LeftOutlined />
            Medme
          </h4>
        </Link>
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
          {arr?.filter((asd) =>
            asd?.firstname?.toLowerCase().includes(query)
          ).map((item) => (
            <div key={item._id} className={`map-item ${collapsedItems.includes(item._id) ? 'collapsed' : ''}`}>
              <div className="collapsedItems_p" onClick={() => handleToggleCollapse(item._id)}>

                <p>{collapsedItems.includes(item._id) ? '🔽' : '▶️'}  <span>{item?.lastname} {item?.firstname}</span>{" "}</p>
                <p>{item?.address}</p>
                <p>+998 {PhoneNumberFormat(item?.phone)}</p>
                <p>{item?.stories.view  !== true ? item?.stories?.length : ""}</p>

              </div>
              {collapsedItems.includes(item._id) && (
                <>
                  {
                    item.stories.map((a, inx) => (
                      <div key={inx} className="">
                        {a?.retsept && (
                          <div key={a?.retsept?.writed_at} className={`map-item ${collapsedItems.includes(a?.retsept?.writed_at) ? 'collapsed' : ''}`}>
                            <div className="collapsedItems_IntoBox">
                              <p onClick={() => handleToggleCollapse(a?.retsept?.writed_at)}>{collapsedItems.includes(a?.retsept?.writed_at) ? '🔽' : '▶️'}  <span>{a?.retsept?.writed_at}</span>{" "}</p>
                              <p>{a?.retsept?.sickname}</p>
                              <p>{a?.retsept?.patientStatus}</p>
                              <p>
                                <ReactToPrint
                                  trigger={() => (
                                    <button
                                      onFocus={() =>
                                        checkID({
                                          _id: _id,
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
                                  <RecordList obj={{
                                    id: _id,
                                    choseDoctor: item?.choseDoctor,
                                    day: item?.day,
                                    address: clients?.address,
                                    doctorFirstName: item?.doctorFirstName,
                                    doctorLastName: item?.doctorLastName,
                                    firstname: clients?.firstname,
                                    lastname: clients?.lastname,
                                    phone: clients?.phone,
                                    retsept: item?.retsept,
                                    sickname: item?.sickname,
                                    year: clients?.year,
                                    doctorPhone: item?.doctorPhone,
                                  }} componentRef={componentRef} />
                                </div>
                              </p>
                            </div>
                            {
                              collapsedItems.includes(a?.retsept?.writed_at) && (
                                <div className="retseptList">
                                  <div className="texCenter">
                                    <i>Dorilar ro'yxati</i>
                                  </div>
                                  <p>{a?.retsept?.retseptList}</p>
                                </div>
                              )
                            }
                          </div>

                        )
                        }
                      </div>
                    ))
                  }
                </>
              )}
            </div>
          ))
          }
        </>
      )
      }

    </div >
  );
};

export default GetPatients;

