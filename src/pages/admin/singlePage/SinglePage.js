import React, { useEffect } from 'react';
import './style.css';
import axios from "../../../api";
import GetPatients from './getPatients/GetPatients'
import SingleReports from './singleReports/SingleReports';



const SinglePage = () => {



    // ----------------------------------------
    const getUsers = async () => {
        try {
            const res = await axios.get('/client/all')
            if (res.data.success) {

            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className='SearchBar-Box'>

            <GetPatients />

            <SingleReports />

        </div >
    )
}

export default SinglePage

