import React, { useState, useRef } from "react";
import "./style.css";
import { NumberFormat } from "../../../../hook/NumberFormat";
import { message, Tabs, Modal } from "antd";
import { FiX } from "react-icons/fi";
import { GiEntryDoor } from "react-icons/gi";
import { PiPrinterFill } from "react-icons/pi";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useGetAllUsersQuery } from "../../../../redux/clientApi";
import ReactToPrint from "react-to-print";
import CheckList from "../../../../components/checkLists/checkList/CheckList";
import { useDeleteUserFromRoomMutation } from "../../../../redux/roomApi";

function EnterRoom({ none, setOpenRoom, room }) {
  const [deleteUserFromRoom] = useDeleteUserFromRoomMutation();
  const [list, setList] = useState(false);
  const componentRef = useRef();

  let { data: allClients } = useGetAllUsersQuery();
  let clients = allClients?.data;
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

  let todaysTime =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
  let Hours = time.getHours() + ":" + time.getMinutes();

  const CountingMoney = (value) => {
    // setClientsRoom(dayCountingMoney)
    let date1 = new Date(value);
    let date2 = new Date();
    if (date1.getTime() && date2.getTime()) {
      let timeDifference = date2.getTime() - date1.getTime();
      let dayCountingMoney = Math.floor(
        Math.abs(timeDifference / (1000 * 3600 * 24))
      );
      return dayCountingMoney * room.pricePerDay;
    } else {
      return "Error";
    }
  };

  // function updatePatients(id) {
  //   console.log("okkk>>", id);
  //   let update = clients?.find((i) => i._id === id);
  //   // update.room.day = true;
  //   // update.room.total = true;
  //   let a = { ...update, room: { ...update?.room, day: true, total: true } };
  //   axios
  //     .put("/client/" + a)
  //     // .then((res) => message.success(res.data.message))
  //     .then((res) => console.log(res))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // --------------------------------

  const { confirm } = Modal;
  const OutInRoom = (clientID, roomID, userRoomPay) => {
    confirm({
      title: "Bemorni honadan chiqarmoqchimisiz?",
      icon: <ExclamationCircleFilled />,
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        setList(true);
        deleteUserFromRoom({ clientID, roomID, body: userRoomPay })
          .then(
            (res) => res.data.success && message.success(res.data.message),
            setOpenRoom(false)
          )
          .catch((err) => console.log(err));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };


  let viewCheckListOnline = {
    display: "block",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.518)",
    position: "fixed",
    top: "0",
    left: "0",
  }

  return (
    <div className="updateRoom">
      <FiX className="updateRoomCloseBtn" onClick={() => setOpenRoom(false)} />
      <div className="updateRoom_wrapper">
        <Tabs>
          <Tabs.TabPane>
            <table className="table">
              <thead>
                <tr>
                  <th>Bemor</th>
                  <th>Yoshi</th>
                  <th>Yo'naltirildi</th>
                  <th>Kun</th>
                  <th>To'lov</th>
                  <th style={none}>Chiqish</th>
                </tr>
              </thead>
              <tbody>
                {room.capacity?.map(
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
                      <td data-label="To'lov">
                        {" "}
                        {NumberFormat(CountingMoney(dayOfTreatment))} so'm
                      </td>
                      <td style={none} data-label="Chiqish">
                        <button
                          onClick={() => {
                            OutInRoom(phone, room._id, {
                              dayOfTreatment: CountingMoney(dayOfTreatment),
                              payForRoom: CountingDay(dayOfTreatment),
                              id: _id,
                              outDay: todaysTime,
                            });
                            // updatePatients(_id);
                          }}
                          button="true"
                          className="btn btn-primary"
                        >
                          <GiEntryDoor id="EntryDoor" />
                        </button>
                      </td>

                      <td className={`${list ? "viewCheckList" : "ListNone"}`}>
                        <button
                          onClick={() => setList(false)}
                          className="OutCheck"
                        >
                          +
                        </button>
                        <div className="viewBox">
                          <ReactToPrint
                            trigger={() => (
                              <button className="PrintChekList" type="submit">
                                {" "}
                                <PiPrinterFill />
                              </button>
                            )}
                            content={() => componentRef.current}
                          ></ReactToPrint>
                          <div className="waveList">
                            <center id="top">
                              <div className="logo"></div>
                              <div className="info">
                                <h2 className="item-h2">Har doim siz bilan!</h2>
                              </div>
                            </center>

                            <div id="mid">
                              <div className="info">
                                <h2 className="item-h2">Aloqa uchun malumot</h2>
                                <p className="text_p">
                                  Manzil : Pop Tinchlik ko'chasi 7-uy
                                  <br />
                                  Email : JohnDoe@gmail.com
                                  <br />
                                  Tel raqam : +998(94)432-44-45
                                  <br />
                                </p>
                              </div>
                            </div>

                            <div id="bot">
                              <div id="table">
                                <div className="tabletitle">
                                  <div className="item_check">
                                    <h2 className="item-h2">Element</h2>
                                  </div>
                                  <div className="Hours">
                                    <h2 className="item-h2"></h2>
                                  </div>
                                  <div className="Rate">
                                    <h2 className="item-h2"></h2>
                                  </div>
                                </div>

                                <div className="service">
                                  <div className="tableitem">
                                    <p className="itemtext">
                                      Xonaning nomeri :
                                    </p>
                                  </div>

                                  <div className="tableitem">
                                    <p className="itemtext">
                                      {" "}
                                      {room.roomNumber}
                                    </p>
                                  </div>
                                </div>

                                <div className="service">
                                  <div className="tableitem">
                                    <p className="itemtext">
                                      Davolanish kuni :
                                    </p>
                                  </div>
                                  <div className="tableitem">
                                    <p className="itemtext">
                                      {CountingDay(dayOfTreatment)} kun
                                    </p>
                                  </div>
                                </div>

                                <div className="service">
                                  <div className="tableitem">
                                    <p className="itemtext">1 kunlik narxi :</p>
                                  </div>

                                  <div className="tableitem">
                                    <p className="itemtext">
                                      {NumberFormat(room.pricePerDay)} so'm
                                    </p>
                                  </div>
                                </div>
                                <div className="service">
                                  <div className="tableitem">
                                    <p className="itemtext">Bemor:</p>
                                  </div>
                                  <div className="tableitem">
                                    <p className="itemtext">
                                      {firstname} {lastname}
                                    </p>
                                  </div>
                                </div>

                                <div className="service">
                                  <div className="tableitem">
                                    <p className="itemtext text_p">Sana :</p>
                                  </div>
                                  <div className="tableitem">
                                    <p className="itemtext text_p">
                                      {Hours} {todaysTime}
                                    </p>
                                  </div>
                                </div>

                                <div className="tabletitle">
                                  <div className="tableitem">
                                    <p>To'landi: </p>
                                  </div>

                                  <div className="payment">
                                    <h2 className="item-h1">
                                      {NumberFormat(
                                        CountingMoney(dayOfTreatment)
                                      )}{" "}
                                      so'm
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ display: "none" }}>
                        <CheckList
                          componentRef={componentRef}
                          firstname={firstname}
                          lastname={lastname}
                          payState={CountingDay(dayOfTreatment)}
                          doctorFirstName={doctorFirstName}
                          doctorLastName={room.roomNumber}
                          doctorSpecialization={CountingMoney(dayOfTreatment)}
                          todaysTime={todaysTime}
                          Hours={Hours}
                          doctorPhone={room.pricePerDay}
                          filterarxiv={true}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default EnterRoom;
