import React, {
    FC,
    useState
} from 'react';
import HomeHeader from './HomeHeader';
import WelcomeBanner from './WelcomeBanner';
import HowItWorks from './HowItWorks'
import Actions from './Actions'
import ConfessionsFeed from './ConfessionsFeed';
import SubmissionBox from './SubmissionBox';
import { ucs2 } from 'node:punycode';

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

            <div className={
                `transition-opacity duration-500 ease-in-out ${email.includes('@usc.edu') ? 'opacity-1' : 'opacity-0'}`
            }>
                <div className="flex justify-center">
                    <SubmissionBox />
                </div>
            </div>
            

            <div className={`
                flex justify-center content-center flex-row space-x-5 
                transform duration-500 ease-in-out ${email.includes('@usc.edu') ? '-translate-y-0' : '-translate-y-28'}`}>
                <div className="flex-1 max-w-md justify-right">
                    <div className="bg-gray-200 rounded-lg px-5 shadow-sm">
                        <HowItWorks 
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            imageUrl={imageUrl}
                        />
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
                <div className="flex-1 max-w-md justify-left">
                    <ConfessionsFeed />
                </div>
            </div>
        </div>
    )
}



export default Home;