import React from "react";
import Layout from "../../../components/layout/Layout";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./App.css";
import Balans from "../balans/Balans";
import DoctorsSlite from "../swiper/Carousel";
import { useGetAllUsersQuery } from "../../../redux/clientApi";

const HomePage = () => {
  let { data: allUser } = useGetAllUsersQuery();
  let users = allUser?.data || [];

  let currentMonth = new Date().getMonth() + 1;

  let alluser = [];
  for (const item of users) {
    item.stories.forEach((i) => (i.view === true ? alluser.push(i) : i));
  }

  let allUserForChart = alluser
    ?.filter((i) => i?.day?.split(".")[1] == currentMonth)
    ?.sort((a, b) => a?.day?.split(".")[2] < b?.day?.split(".")[2]);

  // pastdagi commentdagi kodlar bir oylik summa ni kodi

  let week1 = allUserForChart?.filter(
    (i) => i.day.split(".")[0] >= 1 && i.day.split(".")[0] <= 7
  )?.length;
  // ?.reduce((a, b) => a + b.paySumm, 0);
  let week2 = allUserForChart?.filter(
    (i) => i.day.split(".")[0] >= 8 && i.day.split(".")[0] <= 14
  )?.length;
  // ?.reduce((a, b) => a + b.paySumm, 0);
  let week3 = allUserForChart?.filter(
    (i) => i.day.split(".")[0] >= 15 && i.day.split(".")[0] <= 21
  )?.length;
  // ?.reduce((a, b) => a + b.paySumm, 0);
  let week4 = allUserForChart?.filter(
    (i) => i.day.split(".")[0] >= 22 && i.day.split(".")[0] <= 31
  )?.length;
  // ?.reduce((a, b) => a + b.paySumm, 0);

  const data = [
    {
      name: "1-hafta",
      Kirim: week1,
    },
    {
      name: "2-hafta",
      Kirim: week2,
    },
    {
      name: "3-hafta",
      Kirim: week3,
    },
    {
      name: "4-hafta",
      Kirim: week4,
    },
  ];

  const dataTrue = users?.filter((i) => i.payState === true);

  return (
    <Layout>
      <div className="HomeOwner">
        <DoctorsSlite />
      </div>
      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={"Kirim"}
              stroke="dodgerblue"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <Balans dataTrue={dataTrue} />
      </div>
    </Layout>
  );
};

export default HomePage;
