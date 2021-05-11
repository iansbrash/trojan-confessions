import React, {
    FC,
    useState,
    useEffect
} from 'react';
import HomeHeader from '../Home/HomeHeader';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router';
import axios from 'axios';
import ThemeRenderer from './ThemeRenderer';

interface SignatureProps {
    location: string,
    school: string,
    fraternity: string,
    year: string
}

interface AdminSubmissionProps {
    content: string,
    hashedId: string,
    tags: string[],
    theme: string,
    timestamp: string
    signature: SignatureProps
}

enum Themes {
    imessage = "imessage",
    zoom = "zoom",
    email = "email",
    tinder = "tinder",
    twitter = "twitter",
}

const AdminSubmission : FC<AdminSubmissionProps> = ({
    content,
    hashedId,
    tags,
    theme,
    timestamp,
    signature
} : AdminSubmissionProps) => {

    // @ts-ignore
    // const OtherTheme : Themes = Themes[theme];

    return (
        <div className="w-96">
            <div className={`aspect-h-1 aspect-w-1 bg-gray-200 px-5 shadow-md`}>
                <ThemeRenderer 
                    theme={theme}
                    themeprops={{
                        confessionInput: content,
                        location: signature.location,
                        school: signature.school,
                        fraternity: signature.fraternity,
                        year: signature.year,
                        tags: tags
                    }}
                />
            </div>
        </div>
    )
}

const Dashboard : FC = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);
    const [isAuthed, setIsAuthed] = useState<boolean>(true);
    const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
    const [submissions, setSubmissions] = useState<object[]>([]);

    const logout = () => {
        if (cookies['jwt_token']){
            removeCookie('jwt_token');
            setIsAuthed(false);
        }
        else {
            alert('somehow the jwt tkoen doesnt exist');
        }
    }

    useEffect(() => {

        (async () : Promise<any> => {
            setLoadingPosts(true);
    
            var config : object = {
                method: 'get',
                url: 'http://localhost:5000/api/admin/submissions/',
                headers: {
                    jwt_token: cookies['jwt_token']
                }
            };
    
            await axios(config)
            .then(function (response) {
                console.log(`response: XDD`);
                console.log(response.data);
                setSubmissions(response.data);
                // console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    
            setLoadingPosts(false);
        })();

    }, [])



    return (
        <div className="flex flex-1 flex-col">
            {/* Header */}
            <HomeHeader />

            {/* Wrap in flex so header doesnt die */}
            <div className="flex flex-1 flex-col justify-center items-center">

                {/* Logout Button */}
                <div className="m-2 flex">
                    <div className="justify-center flex items-center rounded-md shadow-md bg-red-400">
                        <button className="m-2 text-white font-bold text-xl"
                        onClick={() => logout()}>
                            Logout
                        </button>
                    </div>
                </div>

                {/* ConfessionsFeed of uncomfirmed submissions */}
                <div className="flex-col justify-center items-center bg-gray100">
                    {
                        submissions.map((subObj : any) =>
                            <>
                                <AdminSubmission 
                                    content={subObj.content}
                                    hashedId={subObj.hashedId}
                                    tags={subObj.tags.split(',')}
                                    theme={subObj.theme}
                                    timestamp={subObj.timestamp}
                                    signature={subObj.signature}
                                />
                                <div className="h-5"></div>
                            </>
                        )
                    }
                </div>

            </div>



            {/* Redirect on Logout */}
            {
                isAuthed 
                ? 
                    null 
                : 
                    <Redirect 
                    to={{
                        pathname: "/admin/login" 
                    }} />
            }

            

            {/* 
                    What to do
                Need to establish some JWT shit for logging in
                To make sure it is actually me requesting data and admin/dashboard

                Need to make a get request to an admin endpoint with
                Those JWT credentials and my google sessions ID

                Endpoint only returns from the /submissions firebase
                database if the JWT creds match

                Upon getting data, display it with its theme
                    Perhaps make a <ThemeRenderer /> that makes things easy
                
                Add admin options to delete, reword, or blur content
                    When satisfied, click check button twice to push
                
                Another feed of posts waiting for posting to instagram
                    Should be no more than 10 at a time

                Also admin controls to disable submission, disable puppeteer, etc
                
            
            
            */}
        </div>
    )
}

export default Dashboard;