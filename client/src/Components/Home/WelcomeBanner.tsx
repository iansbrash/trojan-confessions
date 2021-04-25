import React, {
    FC
} from 'react';

const WelcomeBanner : FC = () => {
    return (
        <div className="mx-auto flex flex-col justify-center content-center my-10">
            <div className="text-left font-bold text-5xl text-gray-700">
                Welcome to
            </div>
            <div className="-my-6 text-left font-bold text-5xl text-gray-800">
                Trojan Confessions ✌️
            </div>
            {/* <div className="relative flex">
                <div className="z-20 absolute top-0 left-0 right-0 flex-1 flex">
                    <div className="flex-1 text-center font-bold text-7xl text-red-500">
                        Trojan Confessions
                    </div>
                </div>
                <div className="z-10 absolute top-0 left-0 right-0 flex-1 flex">
                    <div className="flex-1 text-center font-bold text-7.1xl text-yellow-500">
                        Trojan Confessions
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default WelcomeBanner;