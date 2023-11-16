import axios from '../../../api'
import React, { useState, useEffect } from 'react'
import Layout from '../../../components/layout/Layout'
import { Col, Form, Input, message, Row, TimePicker } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showLoading, hideLoading } from '../../../redux/features/indexSlice'
import moment from 'moment';


const Profile = () => {
    const { user } = useSelector(state => state.user)
    const [doctor, setDoctors] = useState(null)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // ------Update doc--------
    const handleFinish = async (values) => {
        console.log(values);
        try {
            dispatch(showLoading())
            const res = await axios?.post(`/doctor/updateProfile`,
                {
                    ...values, userId: user._id,
                    timings: [
                        moment(values.timings[0], "HH:mm"),
                        moment(values.timings[1], "HH:mm")
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())
            if (res?.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something Went Wrrong")
        }
    }
    // ------Update doc--------


    const getDoctorInfo = async () => {
        try {
            const res = await axios.get('/doctor/getDoctorInfo', {
                userId: params.id
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            if (res.data.success) {
                setDoctors(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctorInfo()
    }, [])

    return (
        <Layout>
            <h3 className="text-center">Profilni boshqarish</h3>
            {
                doctor && (
                    <Form
                        layout="vertical"
                        onFinish={handleFinish}
                        initialValues={{
                            ...doctor,
                            timings: [
                                moment(doctor.timings[0], "HH:mm"),
                                moment(doctor.timings[1], "HH:mm")
                            ]
                        }}
                        className="FormApply"
                    >
                        <h4>Shaxsiy ma'lumotlar:</h4>
                        <Row className="Row">
                            <Col className="Col-Form" >
                                <Form.Item
                                    label="Ism"
                                    name="firstName"
                                    required
                                    rules={[{ required: true }]}
                                >
                                    <Input type="text" placeholder="your first name" />
                                </Form.Item>
                            </Col>
                            <Col className="Col-Form">
                                <Form.Item
                                    label="Familiya"
                                    name="lastName"
                                    required
                                    rules={[{ required: true }]}
                                >
                                    <Input type="text" placeholder="your last name" />
                                </Form.Item>
                            </Col>
                            <Col className="Col-Form">
                                <Form.Item
                                    label="Telefon raqami"
                                    name="phone"
                                    required
                                    rules={[{ required: true }]}
                                >
                                    <Input type="text" placeholder="your phone number" />
                                </Form.Item>
                            </Col >
                        </Row >

                        <Row className="Row">
                            <Col className="Col-Form" >
                                <Form.Item
                                    label="Elektron pochta"
                                    name="email"
                                    required
                                    rules={[{ required: true }]}
                                >
                                    <Input type="text" placeholder="your email address" />
                                </Form.Item>
                            </Col>
                            <Col className="Col-Form">
                                <Form.Item
                                    label="Website"
                                    name="website"
                                    required
                                    rules={[{ required: true }]}
                                >
                                    <Input type="text" placeholder="your website" />
                                </Form.Item>
                            </Col >
                            <Col className="Col-Form">
                                <Form.Item
                                    label="Manzili"
                                    name="address"
                                    required
                                    rules={[{ required: true }]}
                                >
                                    <Input type="text" placeholder="your address" />
                                </Form.Item>
                            </Col>

                        </Row >
                        <h4>Professional tafsilotlar:</h4>

                        <Row className="Row">
                            <Col className="Col-Form" >
                                <Form.Item
                                    label="Mutaxassislik"
                                    name="specialization"
                                    required
                                    rules={[{ required: true }]}
                                >
                                    <Input type="text" placeholder="your specialization" />
                                </Form.Item>
                            </Col>
                            <Col className="Col-Form">
                                <Form.Item
                                    label="Tajriba"
                                    name="experience"
                                    required
                                    rules={[{ required: true }]}
                                >
                                    <Input type="text" placeholder="experience" />
                                </Form.Item>
                            </Col>
                            <Col className="Col-Form">
                                <Form.Item
                                    label="Kunsaltatsia uchun to'lovlar"
                                    name="feesPerCunsaltation"
                                    required
                                    rules={[{ required: true }]}
                                >
                                    <Input type="number" placeholder="fees Per Cunsaltation " />
                                </Form.Item>
                            </Col >
                        </Row >
                        <Row className="Row">
                            <Col className="Col-Form" >
                                <Form.Item
                                    label="Vaqtlar"
                                    name="timings"
                                    required
                                    rules={[{ required: true }]}
                                >
                                    <TimePicker.RangePicker format="HH:mm" />
                                </Form.Item>
                            </Col>

                            <Col className="Col-Form" >

                                <button className="btn btn-primary" type="submit">
                                    Yangilash
                                </button>
                            </Col>

                        </Row >
                    </Form >
                )
            }

        </Layout>
    )
}

export default Profile
