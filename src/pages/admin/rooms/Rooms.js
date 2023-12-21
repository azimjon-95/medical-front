import React, { useState, useEffect } from 'react'
import './style.css';
import Layout from "../../../components/layout/Layout";
import { Tabs } from 'antd';
import { MdOutlineBedroomChild } from "react-icons/md";
import { FiUserPlus, FiEye } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import Door from '../../../assets/door.png'
import axios from '../../../api';
import { FaUsers } from 'react-icons/fa'
import { NumberFormat } from '../../../hook/NumberFormat'
import EnterRoom from '../../receptionPage/Cabins/enterRoom/EnterRoom';

const Rooms = () => {
    const [data, setData] = useState([])
    const [openRoom, setOpenRoom] = useState(false)
    const none = useState("disabled")

    // ---------------------------

    useEffect(() => {
        axios.get("/rooms/getAllRoom")
            .then((res) => setData(res?.data.innerData))
            .catch((err) => console.log(err));
    }, [])

    const Style = {
        display: "none"
    }

    return (
        <Layout>
            {openRoom && <EnterRoom none={Style} room={openRoom} setOpenRoom={setOpenRoom} />}

            <h4 style={{ textAlign: "center", marginTop: "10px" }}>Xonalarni ko'rish</h4>
            <Tabs>
                <Tabs.TabPane >
                    <table className="table">
                        <tbody>
                            {data?.map((item, inx) => (
                                <tr key={inx}>
                                    <td data-label="Bemor">
                                        <div className="imgRoor">
                                            <img src={Door} alt="" />
                                            <div className="roomN">
                                                <b className='roomNumber'>{item.roomNumber}</b>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-label="Tel No">
                                        <div className="room_Box-length">
                                            <div>Xona sig'imi</div>
                                            <div><MdOutlineBedroomChild /> - {item.usersNumber}</div>

                                        </div>
                                    </td>
                                    <td data-label="Yo'naltirildi">
                                        <div className="room_Box-length"><div>Bemorlar soni</div>
                                            {
                                                item.capacity.length == item.usersNumber
                                                &&
                                                <p className="busyRoom">Xonada joy yo'q</p>
                                                ||
                                                <div>
                                                    {item.capacity.length === 0
                                                        ? <div className='emptyRoom'>Bo'sh xona</div>
                                                        :
                                                        <div> <FaUsers /> - {item.capacity.length}</div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </td>
                                    <td data-label="1 kunlik to'lov">
                                        <div className="room_Box-length">
                                            <div>1 kunlik to'lov</div>
                                            <div><GiMoneyStack />  {NumberFormat(item.pricePerDay)} so'm</div>
                                        </div>
                                    </td>
                                    <td data-label="Honaga kirish">
                                        <button disabled={item.capacity.length === 0 && "disabled"} id='cabins' button="true" onClick={() => setOpenRoom(item)} className='btn btn-primary'><FiEye /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default Rooms;