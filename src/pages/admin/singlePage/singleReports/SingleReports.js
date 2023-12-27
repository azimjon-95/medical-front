import React, { useEffect, useState } from 'react'
import axios from '../../../../api'
import './style.css'
import { useParams } from 'react-router-dom'
import { PhoneNumberFormat, NumberFormat } from '../../../../hook/NumberFormat'
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../redux/get/getDataClice";
import { showLoading, hideLoading } from "../../../../redux/features/lineIoad";
import img1 from '../../../../assets/img/singleImg1.png';
import img2 from '../../../../assets/img/singleImg2.png';
import LogoMedme from '../../../../assets/img/logo.png'


const SingleReports = () => {
    const { _id } = useParams()
    const dispatch = useDispatch();
    const [client, setClient] = useState([])

    const data = useSelector((state) => state.data);
    let doctors =
        useSelector((state) => state?.data?.data?.innerData?.doctors) || [];
    let dailyMoney =
        useSelector((state) => state?.data?.data?.innerData?.doctorDailyMoney) ||
        [];
    let todaysClients =
        useSelector((state) => state?.data?.data?.innerData?.todaysClient) || [];

    useEffect(() => {
        dispatch(fetchData());
    }, []);


    const getUsers = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.get('/client/all')
            dispatch(hideLoading())
            if (res.data.success) {
                setClient(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    let filterDoctors = doctors.filter(i => i.specialization === _id)
    let clients = client.filter(client => client.choseDoctor
        .toLowerCase() === _id
            ?.toLowerCase() && client.view === true)

    let time = new Date()
    let day = (time.getDate() - 1) + "." + (time.getMonth() + 1) + "." + time.getFullYear();
    let dayMonth = time.toLocaleString("default", { month: 'long' })
    let filterarxiv = clients.filter(i => i.day == day)
    let getMonth = client.filter(i => i.month == dayMonth)

    return (
        <div className='Search-Box'>
            <div class="containerWallet">
                {
                    filterDoctors?.map((value, inx) => {
                        return (
                            <div key={inx} className="Wallet" style={{ height: '96.5vh' }}>
                                <div className="headerWallet">
                                    <div className="header-summary">
                                        <div className="summary-text">
                                            Bir kunlik tushim
                                        </div>
                                        <div className="summary-balance">
                                            {value.specialization === 0 ? (
                                                ""
                                            ) : (<>
                                                {" "}
                                                {NumberFormat(
                                                    (dailyMoney[value.specialization] *
                                                        value.percent) /
                                                    100
                                                )}{" "}
                                                so'm
                                            </>

                                            )}
                                        </div>
                                    </div>
                                    <div className="imgBox_doc">
                                        {
                                            value.lastName?.endsWith("v") ?
                                                <div className="user-profileOv">
                                                    <img src={img1} alt="" />
                                                </div>
                                                :
                                                <div className="user-profileOv">
                                                    <img src={img2} alt="" />
                                                </div>
                                        }
                                         <div className="summary-textOv">
                                         {value.firstName + " " + value.lastName}
                                        </div>
                                        <span>{value.specialization}</span>
                                    
                                    </div>

                                </div>
                                <div className="contentWallet">
                                    <div className="cardWallet">
                                        <div className="upper-row">
                                            <div className="card-item">
                                                <span>Bugungi balans</span>

                                                <span> {" " + NumberFormat(dailyMoney[value.specialization])}{" "}so'm</span>
                                            </div>
                                            <div className="card-item">
                                                <span>Oylik foizda</span>
                                                <span>{value.percent}%</span>
                                            </div>
                                        </div>
                                        <div className="lower-row">
                                            <div className="icon-item">
                                                <div className="icon">{filterarxiv.length}</div>
                                                <div className="icon-text">Bugun</div>
                                            </div>
                                            <div className="icon-item">
                                                <div className="icon">{getMonth.length}</div>
                                                <div className="icon-text">{time.toLocaleString("default", { month: 'long' })}</div>
                                            </div>
                                            <div className="icon-item">
                                                <div className="icon"><i className="fal fa-paper-plane"></i></div>
                                                <div className="icon-text">Bir oylik tushim</div>
                                            </div>
                                            <div className="icon-item">
                                                <div className="icon">{NumberFormat(value.feesPerCunsaltation)} so'm</div>
                                                <div className="icon-text">Qabul</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="drawer">
                                    <img width={200} src={LogoMedme} alt="" />
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default SingleReports;

