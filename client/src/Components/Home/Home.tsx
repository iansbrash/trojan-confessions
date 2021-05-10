import React, {
    FC,
    useState,
    useEffect
} from 'react';
import HomeHeader from './HomeHeader';
import WelcomeBanner from './WelcomeBanner';
import HowItWorks from './HowItWorks';
import Actions from './Actions';
import ConfessionsFeed from './ConfessionsFeed';
import SubmissionBox from './SubmissionBox';
import AddIdentifiers from './AddIdentifiers';
import Preview from './Preview';
import axios from 'axios';

const Question : FC = () => {
    return (
        <div className="text-xl text-gray-700">
            Want to submit a confession about your USC experience?
        </div>
    )
}

interface TextProps {
    content: string,
    hasTail: boolean
}

const Text : FC<TextProps> = ({
    content,
    hasTail
} : TextProps) => {
    return (
        <>
            {content === '' ? null : 
                <div className="leading-6 break-words max-w-xs relative rounded-xl text-white text-xl flex-initial bg-blue-400 py-1 px-2 mb-0.5">
                    {content.trim()}
                    {
                        hasTail ? 
                        <>
                            <div className="transform translate-x-0.5 absolute bottom-0 -right-2.5 h-5 w-5 bg-blue-400 rounded-full"></div>
                            <div className="transform translate-x-0.5 absolute bottom-0 -right-3.5 h-4 w-4 bg-gray-900 rounded-full"></div>
                            <div className="transform translate-x-0.5 absolute bottom-2 -right-3.5 h-4 w-4 bg-gray-900"></div>
                        </> 
                            : 
                        null
                    }

                </div>
            }
        </>
    )
}


const Home : FC = () => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [id_token, setId_token] = useState<string>('');
    const [signedDropped, setSignDropped] = useState<boolean>(false);
    const [previewDropped, setPreviewDropped] = useState<boolean>(false);
    const [confessionInput, setConfessionInput] = useState<string>('');

    // for AddIdentifiers
    const [location, setLocation] = useState<string>('');
    const [school, setSchool] = useState<string>('');
    const [fraternity, setFraternity] = useState<string>('');
    const [year, setYear] = useState<string>('');



    useEffect(() => {

        if (signedDropped){
            setPreviewDropped(false);
        }

    }, [signedDropped])

    useEffect(() => {

        const theme = 'imessage';

        const toe = async () => {
            const res = await axios.get(`http://localhost:5000/api/preview/?theme=${theme}&confession=${confessionInput}&location=${location}&school=${school}&fraternity=${fraternity}&year=${year}`);
            console.log(res);
            if (res){
                document.getElementById('toPreview')!.innerHTML = res.data;
            }
            
        }
        if (previewDropped){
            toe();
        }
    }, [previewDropped]);


    return (
        <div className="flex flex-1 flex-col">
            <div className="z-20">
                <HomeHeader />
            </div>
            <div className="z-10 bg-gray-100">
                <div className="flex justify-center content-center">
                    <WelcomeBanner />
                </div>
                {/* <Question /> */}
                <div className="my-4"></div>
            </div>
            <div className="z-0">
                <div className="flex flex-col max-w-4xl mx-auto">
                    {/* Submission */}
                    <div className="z-20 text-center flex-1 items-center">
                        <div className={
                            `transition duration-500 ease-in-out ${email.includes('@usc.edu') ? 'opacity-1' : 'opacity-0'}`
                        }>
                            <div className="flex justify-center">
                                <SubmissionBox
                                    id_token={id_token}
                                    signDropped={signedDropped}
                                    setSignDropped={setSignDropped}
                                    setPreviewDropped={setPreviewDropped}
                                    previewDropped={previewDropped}
                                    setConfessionInput={setConfessionInput}
                                    username={email}
                                    signature={
                                        {
                                            location: location,
                                            school: school,
                                            fraternity: fraternity,
                                            year: year
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Everything Else */}
                    {/* We do the email.includes check because the invisible submission box fucks with some stuff */}
                    <div className={`${email.includes('@usc.edu') ? 'z-10' : 'z-30'} flex flex-row space-x-6 transform duration-500 ease-in-out ${email.includes('@usc.edu') ? 'translate-y-0' : '-translate-y-36'}`}>
                        <div className={`transform duration-500 ease-in-out ${previewDropped ? 'translate-y-105' : 'translate-y-0'} flex flex-1 flex-col items-start`}>

                            <div className={`w-full relative transform duration-500 ease-in-out ${previewDropped ? 'opacity-1' : 'opacity-0'}`}>
                                <div className={`transform -translate-y-6 aspect-h-1 aspect-w-1 w-full absolute duration-500 ease-in-out bottom-0 bg-gray-200 rounded-lg px-5 shadow-md`}>
                                    {/* <Preview /> */}

                                    {/* Ideas:
                                        iMessage
                                        Zoom Chat
                                        Email to Professor
                                        Instagram DM
                                        Snapchat
                                        Blackboard Post
                                        Post-it note
                                        Clash of clans chat
                                        Spotify Playlist
                                        Powerpoint / Google Docs
                                        VSCode
                                        MOSS Report
                                        SJACS
                                        PornHub Theme
                                        Twitter
                                        Tinder
                                        UCLA
                                        USC
                                        YouTube
                                        Local Community College
                                        uscmissedconfessions
                                        
                                    */}

                                    <div className="aspect-w-1 aspect-h-1">
                                        <div className="flex justify-center items-center">
                                            <div id="toPreview">

                                            </div>
                                            {/* <div className="flex flex-col justify-center items-center h-96 w-96 bg-gray-900 rounded-md shadow-md">
                                                <Text content={confessionInput} hasTail={false}/>
                                                <Text content={
                                                    `-Anonymous ${year === '' ? 'Student' : year} ${location === '' ? '' : `at ${location}`} ${school === '' ? '' : `studying at ${school}`} ${fraternity === '' ? '' : `in ${fraternity}`}`
                                                } hasTail={true} />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`transform duration-500 ease-in-out ${signedDropped ? 'translate-y-72' : 'translate-y-0'} flex flex-1 flex-col  h-12 items-start`}>
                                <div className={`w-full relative transform duration-500 ease-in-out ${signedDropped ? 'opacity-1' : 'opacity-0'}`}>
                                    <div className={`transform -translate-y-6 w-full absolute duration-500 ease-in-out bottom-0 bg-gray-200 rounded-lg px-5 shadow-md`}>
                                        <AddIdentifiers 
                                            setLocation={setLocation}
                                            setSchool={setSchool}
                                            setFraternity={setFraternity}
                                            setYear={setYear}
                                        />
                                    </div>
                                </div>
                                

                                <div className="flex-1 flex flex-col bg-gray-200 rounded-lg px-5 shadow-md">
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
                                        id_token={id_token}
                                        setId_token={setId_token}
                                    />
                                </div>
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

            {/* Enables gap between Live Feed and bottom of window */}
            <div className="my-16"></div>
            
        </div>
    )
}



export default Home;