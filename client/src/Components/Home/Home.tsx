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
import ThemeRenderer from '../AdminLogin/ThemeRenderer';
import SuccessPopup from './SuccessPopup';

enum Themes {
    imessage = "imessage",
    zoom = "zoom",
    email = "email",
    tinder = "tinder",
    twitter = "twitter",
    snapchat = "snapchat",
    notes = "notes",
    instagram = "instagram",
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
    const [tags, setTags] = useState<string[]>([]);
    const [theme, setTheme] = useState<Themes>(Themes.imessage);


    // for AddIdentifiers
    const [location, setLocation] = useState<string>('');
    const [school, setSchool] = useState<string>('');
    const [fraternity, setFraternity] = useState<string>('');
    const [year, setYear] = useState<string>('');

    // Submissions Complete and Form Reset
    const [submitted, setSubmitted] = useState<boolean>(false);

    // dark mode
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {

        // Identifiers
        setLocation('');
        setSchool('');
        setFraternity('');
        setYear('');

        // Other shit
        setConfessionInput('');
        setTags([]);
        setSignDropped(false);
        setPreviewDropped(false);
        setTheme(Themes.imessage);

        return () => {

        }

    }, [submitted])


    useEffect(() => {

        if (signedDropped){
            setPreviewDropped(false);
        }

    }, [signedDropped])


    return (
        <div className="relative flex flex-1 flex-col">

            <SuccessPopup 
            submitted={submitted}
            setSubmitted={setSubmitted} />
            
            <div className="z-20">
                <HomeHeader />
            </div>
            <div className="z-10 bg-gray-100">
                <div className="flex justify-center content-center">
                    <WelcomeBanner />
                </div>
                <div className="my-4"></div>
            </div>


            <div className="w-full flex justify-center items-center z-0">
                <div className="flex flex-col max-w-4xl w-full mx-5 items-center">
                    {/* Submission */}
                    <div className={`${email.includes('@usc.edu') ? 'pointer-events-auto' : 'pointer-events-none'} z-20 text-center w-full items-center max-w-xl mdlg:max-w-none`}>
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
                                    tags={tags}
                                    setTags={setTags}
                                    theme={theme}
                                    setTheme={setTheme}
                                    setSubmitted={setSubmitted}
                                    darkMode={darkMode}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Everything Else */}
                    {/* We do the email.includes check because the invisible submission box fucks with some stuff */}
                    <div className={`w-full ${email.includes('@usc.edu') ? 'z-10' : 'z-30'} flex flex-row transform duration-500 ease-in-out ${email.includes('@usc.edu') ? 'translate-y-0' : '-translate-y-52'}`}>

                        {/* Left side */}
                        <div className={`mdlg:w-1/2 w-full transform duration-500 ease-in-out ${previewDropped ? 'translate-y-101 xs:translate-y-104 ' : 'translate-y-0'} flex flex-col items-center`}>
                            
                            {/* This div enforces the margin-right-3 for the gap in the middle */}
                            <div className="flex flex-col mdlg:items-start flex-1 mdlg:mr-3 items-center">

                            
                                {/* Preview */}
                                <div className={`w-full relative transform duration-500 ease-in-out ${previewDropped ? 'opacity-1' : 'opacity-0'}`}>

                                    {/* BG Color is from below div */}
                                    <div className={`hidden mdlg:block w-full aspect-h-1 aspect-w-1 transform -translate-y-6  absolute duration-500 ease-in-out  bottom-0  bg-gray-200 rounded-lg shadow-md`}>
                                        <div className="flex justify-center items-center">
                                            <button className="absolute top-2.5 right-2.5 focus:outline-none"
                                            onClick={() => setDarkMode(!darkMode)}
                                            >
                                                <div className="w-8 h-8 bg-red-400 rounded-md shadow-md z-40 flex justify-center items-center text-white">
                                                    {darkMode ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg> 
                                                        : 
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                                        </svg>
                                                    }
                                                </div>
                                            </button>
                                            
                                            <ThemeRenderer 
                                            theme={Themes[theme]}
                                            themeprops={{
                                                confessionInput: confessionInput,
                                                location: location,
                                                school: school,
                                                fraternity: fraternity,
                                                year: year,
                                                tags: tags,
                                                timestamp: new Date().toISOString(),
                                                dark: darkMode
                                            }}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Mobile view since breakpoints with aspect-w/h is being dick */}
                                    <div className={`block mdlg:hidden w-full py-0 xs:py-6 transform -translate-y-6 absolute duration-500 ease-in-out bottom-0 bg-gray-200 rounded-lg shadow-md`}>
                                        <div className="transform scale-75 xs:scale-100 flex justify-center items-center relative">
                                            <div className="relative">
                                                <button className="absolute -top-4 -right-4 focus:outline-none"
                                                onClick={() => setDarkMode(!darkMode)}
                                                >
                                                    <div className="w-8 h-8 bg-red-400 rounded-md shadow-md z-40 flex justify-center items-center text-white">
                                                        {darkMode ? 
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg> 
                                                            : 
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                                            </svg>
                                                        }
                                                    </div>
                                                </button>
                                                <ThemeRenderer 
                                                theme={Themes[theme]}
                                                themeprops={{
                                                    confessionInput: confessionInput,
                                                    location: location,
                                                    school: school,
                                                    fraternity: fraternity,
                                                    year: year,
                                                    tags: tags,
                                                    timestamp: new Date().toISOString(),
                                                    dark: darkMode
                                                }}
                                                />
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Add Identifiers + HowItWorks */}
                                <div className={`transform duration-500 ease-in-out ${signedDropped ? 'translate-y-72' : 'translate-y-0'} flex flex-1 flex-col  h-12 items-start`}>
                                    <div className={`${signedDropped ? 'pointer-events-auto' : 'pointer-events-none'} w-full relative transform duration-500 ease-in-out ${signedDropped ? 'opacity-1' : 'opacity-0'}`}>
                                        <div className={`transform -translate-y-6 w-full absolute duration-500 ease-in-out bottom-0 bg-gray-200 rounded-lg px-5 shadow-md`}>
                                            <AddIdentifiers 
                                                setLocation={setLocation}
                                                setSchool={setSchool}
                                                setFraternity={setFraternity}
                                                setYear={setYear}
                                            />
                                        </div>
                                    </div>
                                    

                                    <div className="max-w-xl flex-1 flex flex-col bg-gray-200 rounded-lg px-5 shadow-md">
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
                        </div>
                        <div className={`hidden mdlg:block flex w-1/2 h-12 items-start`}>
                            <div className={`${submitted ? 'hidden' : ''} ml-3 flex-1 bg-gray-200 rounded-lg px-5 shadow-md`}>
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