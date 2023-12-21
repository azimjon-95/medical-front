import React, { useEffect, useState } from "react";
import './style.css';

import axios from "../../../../api/index";
import imgNoData from '../../../../assets/nodata.png'
import { Link, useParams } from 'react-router-dom';
import { Modal, Tabs, Button } from 'antd';


const SingleReports = () => {

    const { _id } = useParams()
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
    let day =
        time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

    // let clients = doctors.filter(client => client.choseDoctor
    //     .toLowerCase() === _id
    //         ?.toLowerCase())
    console.log(doctors);
    // console.log(doctors.find(doctors.data.specialization == _id ? "true" : "false"));
    return (
        <div className='Search-Box'>
            <div className="searchingBox">
                <Link to="/">
                    <h4>Xisobotlar</h4>
                </Link>


            </div>
            <Tabs>



                {
                    doctors == 0 ?
                        <div className='NoData'>
                            <div className="NoDataImg">
                                <img src={imgNoData} alt="No Data" />
                            </div>
                        </div>
                        :
                        <div className="SingleReports_Conts">
                            {
                                doctors?.map((value, inx) => {
                                    return (
                                        <div className="sing_rep">

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

