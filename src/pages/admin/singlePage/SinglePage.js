import React from 'react';
import './style.css';
import GetPatients from './getPatients/GetPatients'
import SingleReports from './singleReports/SingleReports';



const SinglePage = () => {
    return (
        <div className='SearchBar-Box'>
            <SingleReports />
            <GetPatients />

        </div >
    )
}

export default SinglePage

