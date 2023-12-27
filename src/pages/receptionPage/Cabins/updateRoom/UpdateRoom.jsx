import React, { useEffect, useState } from "react";
import "./UpdateRoom.css";
import { NumberFormat, PhoneNumberFormat } from "../../../../hook/NumberFormat";
import axios from "../../../../api";
import { FiX } from "react-icons/fi";
import { Col, Form, message, DatePicker } from "antd";
import { useGetAllUsersQuery } from "../../../../redux/apiSlice";

function UpdateRoom({ setOpenUpdate, room }) {
  const [phone, setPhone] = useState("");
  const [dayOfTreatment, setDayOfTreatment] = useState();
  const [roomFull, setRoomFull] = useState(false);

  let { data: allClients } = useGetAllUsersQuery();
  let clients = allClients?.data;

  useEffect(() => {
    if (room.usersNumber === room.capacity.length)
      return setRoomFull(!roomFull);
  }, [room]);

  function updateRoom() {
    if (phone.length < 9) return message.warning("raqamni kiriting"); // check phone number
    if (room.usersNumber === room.capacity.length)
      return message.warning("xonada joy yoq"); // check room capacity
    let exactClient = clients?.find((client) => client.phone == phone); // find from clients
    let exactClientInCapacity = room.capacity.find((p) => p.phone == phone); // find from room capacity
    if (exactClientInCapacity)
      return message.warning("Bemor xonada avvaldan mavjud!"); // check room capacity
    if (!exactClient) return message.error("Bemor ro'yhatdan o'tmagan");

    exactClient.dayOfTreatment = dayOfTreatment || 0;

    let changedRoom = { ...room, capacity: [...room.capacity, exactClient] }; // new room capacity

    console.log(changedRoom);

    // axios
    //   .put("/rooms/update/" + room._id, changedRoom)
    //   .then((res) => message.success(res.data.message))
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  const getDate = (date, dateString) => {
    setDayOfTreatment(dateString);
  };
  return (
    <div className="updateRoom">
      <FiX
        className="updateRoomCloseBtn"
        onClick={() => setOpenUpdate(false)}
      />
      <div className="updateRoom_wrapper">
        <div className="updateRoom_caption">
          <h2>
            <b>{room.roomNumber}</b>-xona
          </h2>
          <h2>
            <b>{room.category}</b>{" "}
          </h2>
          <h2>
            <b>{room.floor}</b>-qavat{" "}
          </h2>
        </div>
        <div className="updateRoom_main">
          {/* <p>Xona turi : {room.category}</p> */}
          <p>
            Xona sigimi : <b>{room.usersNumber}</b> ta
          </p>
          <p>
            Xondagi bemorlar soni <b>{room.capacity.length}</b> ta
          </p>
          {/* {
                        room.capacity.length ? p
                    } */}
          {roomFull && (
            <p className="fullState">Xonada bo'sh o'rin topilmadi</p>
          )}

          <h4>
            Bir kunlik to'lov <span>{NumberFormat(room.pricePerDay)} so'm</span>{" "}
          </h4>
          <hr />
          <label>
            <h5>Bemorni xonaga biriktitish</h5>
          </label>

          <input
            className="InputForm"
            type="number"
            placeholder={PhoneNumberFormat("998939119572")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={roomFull}
          />
          <Col>
            <Form.Item name="" required rules={[{ required: true }]}>
              <DatePicker
                className="InputForm"
                value={dayOfTreatment}
                onChange={getDate}
                type="text"
                placeholder="Bugungi sana"
              />
            </Form.Item>
          </Col>

          <input
            type="button"
            value={"Kiritish"}
            onClick={updateRoom}
            disabled={roomFull}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateRoom;
