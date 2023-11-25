import iconsImgs from "./plus.svg";
import "./Cards.css";
import { NumberFormat } from '../../../hook/NumberFormat'

const Cards = ({ dataTrue }) => {

    let time = new Date()
    let date = time.getDate() + "/" + (time.getMonth() + 1)


    let result = dataTrue?.reduce(function (prev, cur) {
        return prev + cur.paySumm
    }, 0);


    return (
        <div className="grid-one-item grid-common grid-c1">

            <div className="grid-c1-content">
                <p>Balans</p>
                <div className="lg-value">{NumberFormat(result)} so'm</div>
                <div className="card-wrapper">
                    <span className="card-pin-hidden">**** **** **** </span>
                    <span>1234</span>
                </div>
                <div className="card-logo-wrapper">
                    <div>
                        <p className="text text-silver-v1 expiry-text">Expires</p>
                        <p className="text text-sm text-white">{date}</p>
                    </div>
                    <div className="card-logo">
                        <div className="logo-shape1"></div>
                        <div className="logo-shape2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards
