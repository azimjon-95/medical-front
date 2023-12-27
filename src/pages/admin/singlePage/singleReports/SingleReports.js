import React, { useEffect, useState } from 'react'
import './style.css'
import { PhoneNumberFormat, NumberFormat } from '../../../../hook/NumberFormat';
import img1 from '../../../../assets/img/singleImg1.png';
import img2 from '../../../../assets/img/singleImg2.png';
import LogoMedme from '../../../../assets/img/logo.png'
import { useGetDailyReportsQuery, useGetAllUsersQuery } from "../../../../redux/apiSlice";
import { Link, useParams } from "react-router-dom";

function SingleReports() {
  const { _id } = useParams();

  let { data: dailyReports } = useGetDailyReportsQuery();
  let data = dailyReports?.innerData;
  let doctors = data?.doctors || [];
  let dailyMoney = data?.doctorDailyMoney || [];
  let todaysClients = data?.todaysClient || [];


  let { data: allClient } = useGetAllUsersQuery();
  let client = allClient?.data;




  let filterDoctors = doctors?.filter(i => i.specialization === _id)
  console.log(filterDoctors);
  let clients = client?.filter(client => client.choseDoctor
    .toLowerCase() === _id
      ?.toLowerCase() && client.view === true)

  let time = new Date()
  let day = (time.getDate() - 1) + "." + (time.getMonth() + 1) + "." + time.getFullYear();
  let dayMonth = time.toLocaleString("default", { month: 'long' })
  let filterarxiv = clients?.filter(i => i.day == day)
  let getMonth = client?.filter(i => i.month == dayMonth)


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

export default SingleReports
