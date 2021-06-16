import React, {
    FC
} from 'react';
import Logo160 from '../../resources/images/logo/logo160x160.png';

const WelcomeBanner : FC = () => {
    return (
        <div className="mx-2 flex flex-col justify-center content-center my-10">
            <div className="text-left font-bold text-4xl sm:text-5xl text-gray-700">
                Welcome to
            </div>
            <div className="sm:-my-6 -my-5 text-left font-bold text-3xl xs:text-4xl sm:text-5xl text-gray-800 flex flex-row items-center">
                Trojan Confessions {/**✌️ */} <img src={Logo160} className="hidden xs:block sm:w-14 sm:h-14 w-10 h-10"/>
            </div>
        </div>
    )
}

export default WelcomeBanner;