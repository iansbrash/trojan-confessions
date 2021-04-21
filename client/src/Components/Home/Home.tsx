import React, {
    FC,
    useState
} from 'react';
import HomeHeader from './HomeHeader';
import WelcomeBanner from './WelcomeBanner';
import HowItWorks from './HowItWorks'
import Actions from './Actions'

const Question : FC = () => {
    return (
        <div className="text-xl text-gray-700">
            Want to submit a confession about your USC experience?
        </div>
    )
}


const Home : FC = () => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');

    return (
        <div className="h-screen w-screen bg-gray-100">
            <HomeHeader />
            <div className="flex justify-center content-center">
                <WelcomeBanner />
            </div>
            {/* <Question /> */}
            <div className="my-20"></div>
            <div className="flex justify-center content-center flex-row space-x-5">
                <div className="flex-1 max-w-md justify-right">
                    <HowItWorks 
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        imageUrl={imageUrl}
                    />
                </div>
                <div className="flex-1 max-w-md justify-left">
                    <Actions 
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                        />
                </div>
            </div>
        </div>
    )
}



export default Home;