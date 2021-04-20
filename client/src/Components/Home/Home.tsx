import React, {
    FC
} from 'react';
import HomeHeader from './HomeHeader';
import WelcomeBanner from './WelcomeBanner';


const Home : FC = () => {
    return (
        <div className="h-screen w-screen bg-gray-100">
            <HomeHeader />
            <div className="flex justify-center content-center">
                <WelcomeBanner />
            </div>
        </div>
    )
}



export default Home;