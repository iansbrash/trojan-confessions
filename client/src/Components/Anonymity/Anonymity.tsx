import React, {
    FC
} from 'react';
import HomeHeader from '../Home/HomeHeader';

const Anonymity : FC = () => {
    return (
        <div className="w-screen">
            <HomeHeader />
            <div className="text-3xl font-bold text-black">
                Anonymity
            </div>
        </div>
    )
}

export default Anonymity;