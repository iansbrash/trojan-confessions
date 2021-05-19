import React, {
    FC
} from 'react';
import HomeHeader from '../Home/HomeHeader';

const About = () => {
    return (
        <div className="w-screen">
            <HomeHeader />
            <div className="text-3xl font-bold text-black">
                About
            </div>
        </div>
    )
}

export default About;