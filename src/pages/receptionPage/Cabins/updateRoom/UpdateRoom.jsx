import React, { useEffect, useState } from 'react'
import './UpdateRoom.css'
import { NumberFormat, PhoneNumberFormat } from '../../../../hook/NumberFormat';
import axios from '../../../../api';
import { message } from 'antd';
import { FiX } from 'react-icons/fi'

function UpdateRoom({ setOpenUpdate, room }) {
    const [phone, setPhone] = useState("")
    const [dayOfTreatment, setDayOfTreatment] = useState("")
    const [clients, setClients] = useState([])
    const [roomFull, setRoomFull] = useState(false)


    useEffect(() => {
        axios.get('/client/all')
            .then((res) => setClients(res.data?.data))
            .catch((err) => console.log(err))
        if (room.usersNumber === room.capacity.length) return setRoomFull(!roomFull)
    }, [room])


    function updateRoom() {
        if (phone.length < 9) return message.warning("raqamni kiriting") // check phone number
        if (room.usersNumber === room.capacity.length) return message.warning("xonada joy yoq") // check room capacity
        let exactClient = clients.find(client => client.phone == phone)  // find from clients
        let exactClientInCapacity = room.capacity.find(p => p.phone == phone)  // find from room capacity 
        if (exactClientInCapacity) return message.warning('Bemor xonada avvaldan mavjud!') // check room capacity
        if (!exactClient) return message.error("Bemor ro'yhatdan o'tmagan")

        exactClient.dayOfTreatment = dayOfTreatment || 0

        let changedRoom = { ...room, capacity: [...room.capacity, exactClient] } // new room capacity

        console.log(changedRoom);

        axios.put('/rooms/update/' + room._id, changedRoom)
            .then((res) => message.success(res.data.message))
            .catch((err) => { console.log(err) })

    }

    return (
        <div className='updateRoom'>
            <FiX className='updateRoomCloseBtn' onClick={() => setOpenUpdate(false)} />
            <div className="updateRoom_wrapper">
                <div className="updateRoom_caption">
                    <h2><b>{room.roomNumber}</b>-xona</h2>
                    <h2><b>{room.category}</b> </h2>
                    <h2><b>{room.floor}</b>-qavat </h2>
                </div>
                <div className="updateRoom_main">
                    {/* <p>Xona turi : {room.category}</p> */}
                    <p>Xona sigimi : <b>{room.usersNumber}</b> ta</p>
                    <p>Xondagi bemorlar soni <b>{room.capacity.length}</b> ta</p>
                    {/* {
                        room.capacity.length ? p
                    } */}
                    {roomFull && <p className='fullState'>Xonada bo'sh o'rin topilmadi</p>}

                    <h4>Bir kunlik to'lov <span>{NumberFormat(room.pricePerDay)} so'm</span> </h4>
                    <hr />
                    <label><h5>Bemorni xonaga biriktitish</h5></label>

                    <input
                        type="number"
                        placeholder={PhoneNumberFormat("998939119572")}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={roomFull}
                    />

                    <input
                        type="number"
                        placeholder="Davolanish muddati"
                        value={dayOfTreatment}
                        onChange={(e) => setDayOfTreatment(e.target.value)}
                        disabled={roomFull}
                    />

                    <input type='button' value={"Kiritish"} onClick={updateRoom} disabled={roomFull} />
                </div>
            </div>
        </div>
    )
}

export default UpdateRoom
