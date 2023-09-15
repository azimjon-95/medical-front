import React from 'react'
import Layout from '../layout/Layout'

const DoctorList = ({ doctor }) => {
    return (
        // <Layout>
        //     <h3 className="text-center">List</h3>

        // </Layout>
        <>
            <div className="DrCard">
                <div className="card-header">
                    Dr. {doctor.firstName} {doctor.lastName}
                </div>
                <div className="card-body">
                    <p>
                        <b>Mutaxassisligi:</b> {doctor.specialization}
                    </p>
                    <p>
                        <b>Tajribasi:</b> {doctor.experience}
                    </p>
                    <p>
                        <b>Kunsaltatsia to'lovi:</b> {doctor.feesPerCunsaltation}
                    </p>
                    <p>
                        <b>Vaqtlar:</b> {doctor.timings[0]} - {doctor.timings[1]}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DoctorList
