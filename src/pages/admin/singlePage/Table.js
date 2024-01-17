import React, { useState, useRef } from 'react';
import { PrinterOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Space, Table } from 'antd';
import { useGetAllUsersQuery } from "../../../redux/clientApi";
import { NumberFormat } from '../../../hook/NumberFormat';
import ReactToPrint from "react-to-print";
import { useDispatch } from "react-redux";
import { setInfo } from "../../../redux/recordList/recordList";

const TableUse = () => {
    let { data: users, isLoading: loading } = useGetAllUsersQuery();
    let allUsers = users?.data || [];
    const dataTrue = allUsers?.filter(
        (i) => i?.stories[0]?.payState === true && i?.stories[0]?.view === true);
    const componentRef = useRef();

    let Phone = "+998";
    const [idUser, setIDUser] = useState(null);
    const dispatch = useDispatch();

    const checkID = (id) => {
        dispatch(setInfo(id));
    };
    const expandedRowRender = () => {
        const columns = [
            {
                title: 'Sana',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: 'Tashxis',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: "Dorilar ro'yxati",
                dataIndex: 'upgradeNum',
                key: 'upgradeNum',
            },
            {
                title: 'Chop etish',
                dataIndex: 'print',
                key: 'print',
                render: () => (
                    <ReactToPrint
                        trigger={() => (
                            <button
                                // onFocus={() =>
                                //     checkID({
                                //         _id: _id,
                                //         choseDoctor: a?.choseDoctor,
                                //         day: a?.retsept?.writed_at,
                                //         address: item?.address,
                                //         doctorFirstName: a?.doctorFirstName,
                                //         doctorLastName: a?.doctorLastName,
                                //         firstname: item?.firstname,
                                //         lastname: item?.lastname,
                                //         phone: item?.phone,
                                //         retsept: a?.retsept?.retseptList,
                                //         sickname: a?.retsept?.sickname,
                                //         year: item?.year,
                                //         doctorPhone: a?.doctorPhone,
                                //     })
                                // }
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    fontSize: "13px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {" "}
                                <PrinterOutlined className="Printer" />
                            </button>
                        )}
                        content={() => componentRef.current}
                    />
                ),

            },
        ];

        const data = [];
        for (const item of dataTrue) {
            // let dataFilter = item?.filter((i)=> i?.stories === )
            data.push({
                print: item?._id,
                date: item?.stories?.map((i) => i?.retsept?.writed_at),
                name: item?.stories?.map((i) => i?.retsept?.sickname),
                status: item?.stories?.map((i) => i?.retsept?.patientStatus),
                upgradeNum: item?.stories?.map((i) => i?.retsept?.retseptList)
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [

        {
            title: 'Isim/Familiya',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Manzili',
            dataIndex: 'platform',
            key: 'platform',
        },
        {
            title: '№ Tel',
            dataIndex: 'version',
            key: 'version',
        },
        {
            title: 'Tashrifi',
            dataIndex: 'upgradeNum',
            key: 'upgradeNum',
        }
    ];

    const data = [];
    for (const item of dataTrue) {
        data.push(
            {
                key: item,
                name: item?.firstname + " " + item?.lastname,
                platform: item?.address,
                version: Phone + " " + NumberFormat(item?.phone),
                upgradeNum: item?.stories?.length,
            }
        );
    }

    console.log(idUser);
    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender,
                defaultExpandedRowKeys: ["0"],
            }}
            pagination={false}
            dataSource={data}
        />
    );
};
export default TableUse;