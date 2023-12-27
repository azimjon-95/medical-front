import React, { useState, useEffect } from "react";
import "./style.css";
import Layout from "../../../components/layout/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/features/indexSlice";
import axios from "../../../api";
import { useNavigate } from "react-router-dom";
import { Col, Form, Input, message, Row, Tabs } from "antd";
import Door from "../../../assets/door.png";
import UpdateRoom from "./updateRoom/UpdateRoom";
import { FaUsers } from "react-icons/fa";
import { MdOutlineBedroomChild } from "react-icons/md";
import { FiUserPlus, FiEye } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { NumberFormat } from "../../../hook/NumberFormat";
import EnterRoom from "./enterRoom/EnterRoom";

import { useGetAllRoomsQuery } from "../../../redux/apiSlice";

const Cabins = () => {
  const dispatch = useDispatch();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  // ---------------------------
  const [roomNumber, setRoomNumber] = useState(0);
  const [pricePerDay, setPricePerDay] = useState(0);
  const [category, setCategory] = useState("");
  const [usersNumber, setUsersNumber] = useState(0);
  const [floor, setFloor] = useState(0);

  let { data: rooms } = useGetAllRoomsQuery();
  let data = rooms?.innerData;

  // -------Add Rooms----------

  const AllInfo = {
    roomNumber: +roomNumber,
    pricePerDay: +pricePerDay,
    category,
    usersNumber: +usersNumber,
    floor: +floor,
    capacity: [],
  };

  const handleFinish = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/rooms/addRoom", AllInfo);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(error?.response?.data?.slice(5));
    }
  };

  return (
    <Layout>
      {openUpdate && (
        <UpdateRoom room={openUpdate} setOpenUpdate={setOpenUpdate} />
      )}
      {openRoom && <EnterRoom room={openRoom} setOpenRoom={setOpenRoom} />}
      <h4 className="text-center">Lecheniya</h4>
      <Tabs>
        <Tabs.TabPane tab="Xonalar" key={0}>
          <table className="table">
            <tbody>
              {data?.map((item, inx) => (
                <tr key={inx}>
                  <td data-label="Bemor">
                    <div className="imgRoor">
                      <img src={Door} alt="" />
                      <div className="roomN">
                        <b className="roomNumber">{item.roomNumber}</b>
                      </div>
                    </div>
                  </td>
                  <td data-label="Tel No">
                    <div className="room_Box-length">
                      <div>Xona sig'imi</div>
                      <div>
                        <MdOutlineBedroomChild /> - {item.usersNumber}
                      </div>
                    </div>
                  </td>
                  <td data-label="Yo'naltirildi">
                    <div className="room_Box-length">
                      <div>Bemorlar soni</div>
                      {(item.capacity.length == item.usersNumber && (
                        <p className="busyRoom">Xonada joy yo'q</p>
                      )) || (
                        <div>
                          {item.capacity.length === 0 ? (
                            <div className="emptyRoom">Bo'sh xona</div>
                          ) : (
                            <div>
                              {" "}
                              <FaUsers /> - {item.capacity.length}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td data-label="1 kunlik to'lov">
                    <div className="room_Box-length">
                      <div>1 kunlik to'lov</div>
                      <div>
                        <GiMoneyStack /> {NumberFormat(item.pricePerDay)} so'm
                      </div>
                    </div>
                  </td>
                  <td data-label="Honaga kirish">
                    <button
                      disabled={item.capacity.length === 0 && "disabled"}
                      id="cabins"
                      button="true"
                      onClick={() => setOpenRoom(item)}
                      className="btn btn-primary"
                    >
                      <FiEye />
                    </button>
                  </td>
                  <td data-label="Bemor qo'shish">
                    <button
                      disabled={
                        item.capacity.length == item.usersNumber && "disabled"
                      }
                      id="cabins"
                      onClick={() => setOpenUpdate(item)}
                      button="true"
                      className="btn btn-success"
                    >
                      <FiUserPlus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Xona qo'shish" key={1}>
          <Form layout="vertical" onFinish={handleFinish} className="FormApply">
            <h4>Shaxsiy ma'lumotlar:</h4>
            <Row className="Row">
              <Col className="Col-Form">
                <Form.Item
                  label="Doctor yoki Receptoin"
                  name="luxury or noluxury"
                  required
                  rules={[{ required: true }]}
                >
                  <div className="docORrecep">
                    <label className="containerChe">
                      Lyuks
                      <input
                        value="luks"
                        onChange={(e) => setCategory(e.target.value)}
                        name="o"
                        id="chi"
                        type="radio"
                      />
                      <span className="checkmark"></span>
                    </label>

                    <label className="containerChe">
                      Pol lyuks
                      <input
                        value="polluks"
                        onChange={(e) => setCategory(e.target.value)}
                        name="o"
                        id="chi"
                        type="radio"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </Form.Item>
              </Col>
              <Col className="Col-Form">
                <Form.Item
                  label="Honaning raqami"
                  name="Room number"
                  required
                  rules={[{ required: true }]}
                >
                  <Input
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    type="number"
                    placeholder="Number room"
                  />
                </Form.Item>
              </Col>
              <Col className="Col-Form">
                <Form.Item
                  label="Bir kunlik narxi"
                  name="lastName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(e.target.value)}
                    type="number"
                    placeholder="Price per day"
                  />
                </Form.Item>
              </Col>

              <Col className="Col-Form">
                <Form.Item
                  label="xona sig'imi"
                  name="room"
                  required
                  rules={[{ required: true }]}
                >
                  <Input
                    value={usersNumber}
                    onChange={(e) => setUsersNumber(e.target.value)}
                    type="number"
                    placeholder="Ex: 4ta"
                  />
                </Form.Item>
              </Col>
              <Col className="Col-Form">
                <Form.Item
                  label="Qavat"
                  name="floor"
                  required
                  rules={[{ required: true }]}
                >
                  <Input
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    type="number"
                    placeholder="Ex: 1-qavat"
                  />
                </Form.Item>
              </Col>
              <Col className="Col-Form">
                <button className="btn btn-primary" type="submit">
                  Yuborish
                </button>
              </Col>
            </Row>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Cabins;
