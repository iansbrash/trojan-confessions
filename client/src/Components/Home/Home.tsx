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
        <div className="flex flex-1 flex-col">
            <HomeHeader />
            <div className="flex justify-center content-center">
                <WelcomeBanner />
            </div>
            {/* <Question /> */}
            <div className="my-4"></div>

            <div>
                <div className="flex flex-col max-w-4xl mx-auto">
                    <div className="text-center flex-1 items-center">
                        <div className={
                            `transition-opacity duration-500 ease-in-out ${email.includes('@usc.edu') ? 'opacity-1' : 'opacity-0'}`
                        }>
                            <div className="flex justify-center">
                                <SubmissionBox />
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-row space-x-6 transform duration-500 ease-in-out ${email.includes('@usc.edu') ? 'translate-y-0' : '-translate-y-36'}`}>
                        <div className="flex flex-1 h-12 items-start">
                            <div className="bg-gray-200 rounded-lg px-5 shadow-md">
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
                        <div className="flex flex-1 h-12 items-start">
                            <div className="flex-1 bg-gray-200 rounded-lg px-5 shadow-md">
                                <ConfessionsFeed />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-16"></div>



            {/* <div className={
                `transition-opacity duration-500 ease-in-out ${email.includes('@usc.edu') ? 'opacity-1' : 'opacity-0'}`
            }>
                <div className="flex justify-center">
                    <SubmissionBox />
                </div>
            </div> */}
            {/* <div className="mx-auto max-w-3xl bg-black flex flex-1 flex-col">
                <SubmissionBox />
            </div> */}

                    {/* <SubmissionBox /> */}

            {/* <div className={`
                max-w-2xl bg-black flex flex-col justify-center 
                space-y-5
            `}>
                <div className="flex justify-center">
                    <SubmissionBox />
                </div>

            </div> */}
            {/* <div className={
                `bg-black flex flex-col justify-items-center justify-center`
            }>
                <div className="flex-1 align-middle flex items-center justify-center max-w-5xl">
                    <SubmissionBox />
                </div>
            </div> */}

            {/* <div className={`
                flex justify-center content-center flex-row space-x-5 
                transform duration-500 ease-in-out ${email.includes('@usc.edu') ? '-translate-y-0' : '-translate-y-28'}`}>
                <div className="flex flex-col flex-1 max-w-md justify-right">
                    <div className="bg-gray-200 rounded-lg px-5 shadow-md">
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
            </div> */}
        </div>
    )
}



export default Home;