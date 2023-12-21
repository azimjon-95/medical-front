import React, { useEffect, useState } from 'react'
import './style.css'
import { NumberFormat, PhoneNumberFormat } from '../../../../hook/NumberFormat';
import axios from '../../../../api';
import { message, Tabs, Modal } from 'antd';
import { FiX } from 'react-icons/fi'
import { GiEntryDoor } from "react-icons/gi";
import { PiPrinterFill } from "react-icons/pi";
import { ExclamationCircleFilled } from '@ant-design/icons';

function EnterRoom({ setOpenRoom, room, none }) {
    const [clients, setClients] = useState([])
    const [clientsRoom, setClientsRoom] = useState()
    const [list, setList] = useState(false)

    useEffect(() => {
        axios.get('/client/all')
            .then((res) => setClients(res.data?.data))
            .catch((err) => console.log(err))
    }, [])

    let time = new Date()

    const CountingDay = (value) => {
        let date1 = new Date(value);
        let date2 = new Date();
        if (date1.getTime() && date2.getTime()) {
            let timeDifference = date2.getTime() - date1.getTime();
            let dayDifference = Math.floor(Math.abs(timeDifference / (1000 * 3600 * 24)));
            return dayDifference
        } else {
            return "Error";
        }
    }
    const CountingMoney = (value) => {
        // setClientsRoom(dayCountingMoney)
        let date1 = new Date(value);
        let date2 = new Date();
        if (date1.getTime() && date2.getTime()) {
            let timeDifference = date2.getTime() - date1.getTime();
            let dayCountingMoney = Math.floor(Math.abs(timeDifference / (1000 * 3600 * 24)));
            return dayCountingMoney * room.pricePerDay
        } else {
            return "Error";
        }
    }

    function updatePatients(id) {
        let update = clients.find(i => i._id === id)

        update.room.day = true
        update.room.total = true
        axios.put('/client/' + update)
            .then((res) => message.success(res.data.message))
            .catch((err) => { console.log(err) })
            .finally(() => { window.location.reload() })
    }


    // --------------------------------

    const { confirm } = Modal;
    const OutInRoom = () => {
        confirm({
            title: 'Bemorni honadan chiqarmoqchimisiz?',
            icon: <ExclamationCircleFilled />,
            okText: 'Ha',
            okType: 'danger',
            cancelText: "Yo'q",
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    setList(true)

                }).catch(() => console.log('Oops errors!'));

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (

        <div className='updateRoom'>
            <FiX className='updateRoomCloseBtn' onClick={() => setOpenRoom(false)} />
            <div className="updateRoom_wrapper">
                <Tabs>

                    <Tabs.TabPane >

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Bemor</th>
                                    <th>Yoshi</th>
                                    <th>Tel No</th>
                                    <th>Kun</th>
                                    <th>To'lov</th>
                                    <th style={none}>Chiqish</th>
                                </tr>
                            </thead>
                            <tbody>
                                {room.capacity?.map((item, inx) => (
                                    <tr key={inx}>
                                        <td data-label="Bemor">{item.firstname} {item.lastname}</td>
                                        <td data-label="Yoshi">{time.getFullYear() - +(item.year?.slice(0, 4))}</td>
                                        <td data-label="Tel No">+998 {PhoneNumberFormat(item.phone)}</td>
                                        <td data-label="Kun">{CountingDay(item.dayOfTreatment)}</td>
                                        <td data-label="To'lov"> {NumberFormat(CountingMoney(item.dayOfTreatment))} so'm</td>
                                        <td style={none} data-label="Chiqish">
                                            <button onClick={() => {
                                                OutInRoom()
                                                updatePatients(time.id)
                                            }
                                            } button="true" className='btn btn-primary'><GiEntryDoor id='EntryDoor' /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </Tabs.TabPane>
                </Tabs>

            </div>
            <div className={`${list ? "viewCheckList" : "ListNone"}`}>
                <div className="viewBox">
                    <button onClick={() => setOpenRoom(false)} className='PrintChekList'><PiPrinterFill /></button>
                    <div className="waveList">
                        <p>*********************</p>
                        <b>RECEIPT</b>
                        <p>*********************</p>
                        <p>******RAXMAT!******</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EnterRoom;
