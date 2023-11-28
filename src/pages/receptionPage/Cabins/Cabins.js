import React, { useState, useEffect } from 'react'
import './style.css';
import Layout from '../../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../../redux/features/indexSlice';
import axios from '../../../api';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Input, message, Row, Tabs } from 'antd';
import Door from '../../../assets/door.png'
import UpdateRoom from './updateRoom/UpdateRoom';

const Cabins = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [openUpdate, setOpenUpdate] = useState(false)
  // ---------------------------
  const [roomNumber, setRoomNumber] = useState(0)
  const [pricePerDay, setPricePerDay] = useState(0)
  const [category, setCategory] = useState("")
  const [usersNumber, setUsersNumber] = useState(0)
  const [floor, setFloor] = useState(0)

  const [data, setData] = useState([])
  // ---------------------------

  useEffect(() => {
    axios.get("/rooms/getAllRoom")
      .then((res) => setData(res?.data.innerData))
      .catch((err) => console.log(err));
  }, [])

  // const deleteAllRead = async () => {
  //   try {
  //     dispatch(showLoading())
  //     const res = await axios.get('/rooms/getAllRoom')
  //     dispatch(hideLoading())
  //     if (res.data.data) {
  //       setData(res.data.data)
  //     } else {
  //       message.error(res.data.message)
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading())
  //     console.log(error);
  //     message.error("Somthing wrat wrong")
  //   }
  // }


  // -------Add Rooms----------

  const AllInfo = {
    roomNumber: +roomNumber,
    pricePerDay: +pricePerDay,
    category,
    usersNumber: +usersNumber,
    floor: +floor,
    capacity: []
  }

  const handleFinish = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/rooms/addRoom", AllInfo);
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully!");
      } else {
        message.error(res.data.message);
      }
    }
    catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error(error?.response?.data?.slice(5))
    }
  }
  return (
    <Layout>
      {openUpdate && <UpdateRoom room={openUpdate} setOpenUpdate={setOpenUpdate} />}
      <h4 className="text-center">Lecheniya</h4>
      <Tabs>

        <Tabs.TabPane tab="Not busy" key={0}>
          <div className="All-Read">
            <h4 style={{ cursor: 'pointer' }} >Bosh honalar</h4>
          </div>
          {
            data?.map((value, inx) => {
              return (
                <div key={inx} className="cardRooms" onClick={() => setOpenUpdate(value)} >
                  <div className="imgRoor">
                    <img src={Door} alt="" />
                    <div className="roomN">
                      <b className='roomNumber'>{value.roomNumber}</b>
                    </div>
                  </div>

                </div>
              )
            })
          }
        </Tabs.TabPane>

        <Tabs.TabPane tab="Busy" key={1}>
          <div className="All-Read">
            <h4 style={{ cursor: 'pointer' }} >Bant honalar</h4>
          </div>
          {
            user?.seennotification?.map((notificationMSG) => {
              return (
                <div className="cardNotif" style={{ cursor: 'pointer' }}>
                  <div className="card-task" onClick={navigate(notificationMSG?.onClickPath)}>
                    {
                      notificationMSG.message
                    }
                  </div>

                </div>
              )
            })
          }
        </Tabs.TabPane>

        <Tabs.TabPane tab="Add rooms" key={2}>
          <div className="All-Read">
            <h4 style={{ cursor: 'pointer' }} >Hona qo'shish</h4>
          </div>

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
                    <label className="containerChe">Lyuks
                      <input value='luks' onChange={(e) => setCategory(e.target.value)} name='o' id='chi' type="radio" />
                      <span className="checkmark"></span>
                    </label>

                    <label className="containerChe">Pol lyuks
                      <input value='polluks' onChange={(e) => setCategory(e.target.value)} name='o' id='chi' type="radio" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </Form.Item>
              </Col>
              <Col className="Col-Form" >
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
                    placeholder="Number room" />
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
                    placeholder="Price per day" />
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
                    placeholder="Ex: 4ta" />
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
                    placeholder="Ex: 1-qavat" />
                </Form.Item>
              </Col>
              <Col className="Col-Form" >
                <button className="btn btn-primary" type="submit">
                  Yuborish
                </button>
              </Col>
            </Row >




          </Form >
        </Tabs.TabPane>

      </Tabs>
    </Layout >
  )
}

export default Cabins
