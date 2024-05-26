import React from 'react';
import Banner from '../Banner/Banner';
import MedmeCrm from '../MedmeCrm/MedmeCrm';
import MedmeSuma from '../MedmeSuma/MedmeSuma';
import MedmeFoydalanuv from '../MedmeFoydalanvchi/MedmeFoydalanuv';
import MedmeImg from '../MedmeImg/MedmeImg';
import Footer from '../Footer/Footer';
import Medem from '../Medme/Medem';

const Home = () => {
    return (
        <div style={{ overflow: "hidden" }}>
            <Banner />
            <MedmeCrm />
            <MedmeSuma />
            <MedmeFoydalanuv />
            <MedmeImg />
            <Medem />
            <Footer />
        </div>
    )
}

export default Home;