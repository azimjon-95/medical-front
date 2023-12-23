import React, { useEffect, useState } from "react";
import './style.css';
import axios from "../../../../api/index";
import imgNoData from '../../../../assets/nodata.png'
import { Link, useParams } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import img1 from '../../../../assets/img/singleImg1.png'
import img2 from '../../../../assets/img/singleImg2.png'
import { NumberFormat, PhoneNumberFormat } from "../../../../hook/NumberFormat";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const SingleReports = () => {

    const { _id } = useParams()
    const [eye, setEye] = useState(false);
    const [doctors, setDoctors] = useState(null);
    const [dailyMoney, setDailyMoney] = useState(null);
    const [todaysClients, setTodaysClients] = useState(null);

    useEffect(() => {
        axios
            .get("/dailiyReports/doctorsMoney")
            .then((res) => {
                console.log(res.data);
                if (res.data.state) {
                    setDoctors(res.data.innerData.doctors);
                    setDailyMoney(res.data.innerData.doctorDailyMoney);
                    setTodaysClients(res.data.innerData.todaysClient);
                }
            })
            .catch((err) => console.log(err));
    });


    let time = new Date();
    let day = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();


    const res = doctors?.filter((i) => i.specialization === _id)

    return (
        <div className='Search-Box'>
            <div className="searchingBox">
                <Link to="/">
                    <h4>Xisobotlar</h4>
                </Link>
            </div>
            <Tabs>
                {
                    res == 0 ?
                        <div className='NoData'>
                            <div className="NoDataImg">
                                <img src={imgNoData} alt="No Data" />
                            </div>

                        </div>
                        :
                        <div className="SingleReports_Conts">
                            {
                                res?.map((value, inx) => {
                                    return (
                                        <div key={inx} className="sing_rep">
                                            {
                                                value.lastName?.endsWith("v") ?
                                                    <div className="imgSingle_box">
                                                        <img src={img1} alt="" />
                                                    </div>
                                                    :
                                                    <div className="imgSingle_box">
                                                        <img src={img2} alt="" />
                                                    </div>
                                            }
                                            <h2>{value.firstName} {value.lastName}</h2>
                                            <h4>{value.specialization}</h4>

                                            <div className="div_doctorINF">
                                                <div className="me_docBox">
                                                    <b>{todaysClients[value.specialization]}</b>
                                                    <div>Bemorlar soni</div>
                                                </div>
                                                <div className="me_docBox">
                                                    <b>{" " + NumberFormat(dailyMoney[value.specialization])} so'm</b>
                                                    <div>Tushum</div>
                                                </div>
                                                {value.percent === 0 ?
                                                    <div className="me_docBox">
                                                        <b>{NumberFormat(value.salary)} so'm</b>
                                                        <div>Doktor oyligi</div>
                                                    </div>
                                                    :
                                                    <div className="me_docBox">
                                                        <b>{value.percent}%</b>
                                                        <div>Doktor oyligi</div>
                                                    </div>

                                                }
                                                {value.percent !== 0 ?
                                                    <div className="me_docBox">
                                                        <b>
                                                            {value.specialization === 0 ?
                                                                <> {NumberFormat(
                                                                    (dailyMoney[value.specialization] * value.percent) /
                                                                    100
                                                                )} so'm</>
                                                                : ""
                                                            }
                                                        </b>
                                                        <div>Doktor oyligi</div>
                                                    </div> : ""
                                                }


                                            </div>
                                            <div className="div_doctorINF">
                                                <div className="me_docBox">
                                                    <BsTelephone />
                                                    <div>+998{PhoneNumberFormat(value.phone)}</div>
                                                </div>
                                                <div className="me_docBox">
                                                    <CiLocationOn />
                                                    <div>{value.address}</div>
                                                </div>
                                                <div className="me_docBox">
                                                    <b>{NumberFormat(value.feesPerCunsaltation)} so'm</b>
                                                    <div>Qabuli</div>
                                                </div>

                                            </div>
                                            <div className="div_doctorINF">
                                                <div className="me_docBox">
                                                    {eye ?
                                                        <b>{value.login}</b>
                                                        :
                                                        <b>*******</b>
                                                    }
                                                    <div>Login</div>
                                                </div>
                                                <div className="me_docBox">
                                                    {eye ?
                                                        <b>{value.password}</b>
                                                        :
                                                        <b>*******</b>}
                                                    <div>Parol</div>
                                                </div>
                                                <div className="me_docBox">
                                                    {
                                                        eye ?
                                                            <Button onClick={() => setEye(false)}><IoEyeOutline /></Button>
                                                            :
                                                            <Button onClick={() => setEye(true)}><FaRegEyeSlash /></Button>
                                                    }
                                                </div>
                                            </div>




                                        </div>
                                    )
                                })
                            }
                        </div>
                }

            </Tabs>


        </div>
    )
}

export default SingleReports;

