import React from "react";
import Layout from "../../../components/layout/Layout";
import "./style.css";
import { NumberFormat } from "../../../hook/NumberFormat";
import img1 from "../../../assets/img/singleImg1.png";
import img2 from "../../../assets/img/singleImg2.png";
import LogoMedme from "../../../assets/img/logo.png";
import { useGetReportsQuery } from "../../../redux/reports";

function Wallet() {
  let _id = localStorage?.getItem("category");

  let { data: allReports } = useGetReportsQuery();
  let data = allReports?.innerData || [];

  let time = new Date();
  let day =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
  let filterDoctors = data?.filter((i) => i.specialization === _id);

  let dayMonth = time.toLocaleString("en-US", { month: "long" });

  const CountMoney = (money) => {
    const getMoney = money?.stories?.filter((i) => i?.month === dayMonth);
    return getMoney?.reduce((a, b) => a + b?.totalSumm, 0);
  };

  const CountUsers = (users) => {
    const getUsers = users?.stories?.filter((i) => i?.month === dayMonth);
    return getUsers?.reduce((a, b) => a + b?.totalClient, 0);
  };

  return (
    <Layout>
      <div className="containerWallet">
        {filterDoctors?.map((value, inx) => {
          return (
            <div key={inx} className="Wallet">
              <div className="headerWallet">
                <div className="header-summary">
                  <div className="summary-text">Bir kunlik tushim</div>
                  <div className="summary-balance">
                    {!value?.stories[0]?.percent ? (
                      <>
                        {value?.stories[0]?.doctorTP === 0 ? (
                          ""
                        ) : (
                          <> {NumberFormat(value?.stories[0]?.doctorTP)}</>
                        )}
                      </>
                    ) : (
                      NumberFormat(value?.stories[0]?.salary)
                    )}{" "}
                    so'm
                  </div>
                </div>

                <div className="imgBoxProfile">
                  {value.doctorFullName?.endsWith("a") ? (
                    <div className="user-profile">
                      <img src={img2} alt="" />
                    </div>
                  ) : (
                    <div className="user-profile">
                      <img src={img1} alt="" />
                    </div>
                  )}
                  <div>{value?.doctorFullName}</div>
                  <p>{value?.specialization}</p>
                </div>
              </div>
              <div className="contentWallet">
                <div className="cardWallet">
                  <div className="upper-row">
                    <div className="card-item">
                      <span>Bugungi balans</span>

                      <span>
                        {" "}
                        {" " + NumberFormat(value?.stories[0]?.totalSumm)} so'm
                      </span>
                    </div>
                    {value?.percent ? (
                      <div className="card-item">
                        <span>Oylik foizda</span>
                        <span>{value?.percent}%</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="lower-row">
                    <div className="icon-item">
                      <div className="icon">
                        {value?.stories[0]?.totalClient}
                      </div>
                      <div className="icon-text">Bugun</div>
                    </div>
                    <div className="icon-item">
                      <div className="icon">{CountUsers(value)}</div>
                      <div className="icon-text">
                        {time.toLocaleString("en-Us", { month: "long" })}
                      </div>
                    </div>
                    <div className="icon-item">
                      <div className="icon">{CountMoney(value)} so'm</div>
                      <div className="icon-text">Bir oylik tushim</div>
                    </div>
                    <div className="icon-item">
                      <div className="icon">
                        {NumberFormat(value?.feesPerCunsaltation)} so'm
                      </div>
                      <div className="icon-text">Qabul</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="drawer">
                <img width={200} src={LogoMedme} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default Wallet;
