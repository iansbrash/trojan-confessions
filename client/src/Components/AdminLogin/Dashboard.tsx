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
                        tags: tags,
                        timestamp: timestamp
                    }}
                />
            </div>
        </div>
    )
}

const Check = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    )
}

const Edit = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    )
}

const Delete = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    )
}

const ApprovalBlock : FC<any> = ({
    subObj,
    submissions,
    setSubmissions
} : any) => {

    const [cookies, setCookie] = useCookies(['jwt_token']);
    const [edit, setEdit] = useState<boolean>(false);
    const [currentContent, setCurrentContent] = useState<string>(subObj.content);
    const [editingCurrentContent, setEditingCurrentContent] = useState<string>(subObj.content)


    const toggleEdit = () => {
        setEdit(!edit);
    }

    const deleteSubmission = async () => {

        console.log(`delete pressed with subObj.key=${subObj.key}`)

        const newSub = submissions.filter(
            (obj : any) => {
                // console.log(`obj.key: ${obj.key}, subObj.key: ${subObj.key}`)
                return obj.key !== subObj.key;
            }
        )

        setSubmissions(
            newSub
        )

        console.log('gets here!!')
        
        axios({
            method: 'delete',
            url: '/api/admin/submissions/',
            headers: {
                jwt_token: cookies['jwt_token'],
                key: subObj.key
            }
        })

        return;
    }

    const editSubmission = async () => {
        setCurrentContent(editingCurrentContent);
        setEdit(false);


        const res = await axios({
            method: 'patch',
            url: '/api/admin/submissions/',
            headers: {
                jwt_token: cookies['jwt_token'],
                key: subObj.key,
                content: editingCurrentContent
            }
        })
    }


    const approveSubmission = async () => {

        const newSub = submissions.filter(
            (obj : any) => {
                // console.log(`obj.key: ${obj.key}, subObj.key: ${subObj.key}`)
                return obj.key !== subObj.key;
            }
        )

        setSubmissions(
            newSub
        )
        
        const res = await axios({
            method: 'post',
            url: '/api/admin/approve',
            headers: {
                'jwt_token': cookies['jwt_token'],
                'content': subObj.content, 
                'hashedid': subObj.userName,
                'tags': subObj.tags,
                'theme': subObj.theme,
                'timestamp': subObj.timestamp,
                // 'id_token': id_token,
                // 'signature': signature
                'location': subObj.signature.location,
                'school': subObj.signature.school,
                'fraternity': subObj.signature.fraternity,
                'year': subObj.signature.year,
                'key': subObj.key
            }
        });
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row h-96">
                <div className="h-full w-12 mr-4 flex flex-col space-y-4">
                    <button className="text-white flex justify-center items-center bg-red-400 w-12 h-12 rounded-md shadow-md"
                    onClick={() => approveSubmission()}>
                        <Check />
                    </button>
                    <button className="text-white flex justify-center items-center bg-red-400 w-12 h-12 rounded-md shadow-md"
                    onClick={() => toggleEdit()}>
                        <Edit />
                    </button>   
                    <button className="text-white flex justify-center items-center bg-red-400 w-12 h-12 rounded-md shadow-md"
                    onClick={() => deleteSubmission()}>
                        <Delete />
                    </button>
                </div>
                <AdminSubmission 
                    content={currentContent}
                    hashedId={subObj.hashedId}
                    tags={subObj.tags.split(',')}
                    theme={subObj.theme}
                    timestamp={subObj.timestamp}
                    signature={subObj.signature}
                />
            </div>
            {
                edit 
                ?
                    <>
                        <div className="border- mt-5 flex flex-row">
                            <button className="mr-4 h-12 w-12 bg-red-400 focus:border-none rounded-md shadow-md text-white text-xl font-bold"
                            onClick={() => editSubmission()}
                            >
                                Edit
                            </button>
                            <div className="w-96 h-12">
                                <textarea 
                                value={editingCurrentContent}
                                onChange={(e) => setEditingCurrentContent(e.target.value)}
                                className="focus:outline-none resize-none h-20 w-96"/>
                            </div>
                        </div>
                        
                    </>
                :
                    null
            }
        </div>
        
    )
}

const Dashboard : FC = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);
    const [isAuthed, setIsAuthed] = useState<boolean>(true);
    // const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
    const [submissions, setSubmissions] = useState<object[]>([]);
    const [toPost, setToPost] = useState<object[]>([]);

    const logout = () => {
        if (cookies['jwt_token']){

            console.log('REMOVE JWT')
            removeCookie('jwt_token', {
                path: '/'
            });
            setIsAuthed(false);
        }
        else {
            alert('somehow the jwt tkoen doesnt exist');
        }
    }

    useEffect(() => {

        (async () : Promise<any> => {
            // setLoadingPosts(true);
    
            var configSubmissions : object = {
                method: 'get',
                url: '/api/admin/submissions/',
                headers: {
                    jwt_token: cookies['jwt_token']
                }
            };
    
            await axios(configSubmissions)
            .then(function (response) {
                setSubmissions(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

            
    
            // setLoadingPosts(false);
        })();

        (async () => {

            var configToPost : object = {
                method: 'get',
                url: '/api/admin/toPost/',
                headers: {
                    jwt_token: cookies['jwt_token']
                }
            };

            await axios(configToPost)
            .then(function (response) {
                setToPost(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        })();

    }, [cookies])



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

                <div className="flex flex-row space-x-12">
                    {/* toPost Feed */}
                    <div className="flex flex-col">
                        <div className="w-96 mb-4 bg-red-400 rounded-md shadow-md text-white text-center text-4xl font-bold">
                            toPost
                        </div>
                        {
                            toPost.map((subObj : any) =>
                                <div key={subObj.key}>
                                    <AdminSubmission 
                                        content={subObj.content}
                                        hashedId={subObj.hashedId}
                                        tags={subObj.tags.split(',')}
                                        theme={subObj.theme}
                                        timestamp={subObj.timestamp}
                                        signature={subObj.signature}
                                    />
                                    <div className="h-5"></div>
                                </div>
                            )
                        }
                    </div>

                    {/* ConfessionsFeed of uncomfirmed submissions */}
                    <div className="flex-col justify-center items-center bg-gray100">
                        <div className="ml-16 w-96 mb-4 bg-red-400 rounded-md shadow-md text-white text-center text-4xl font-bold">
                            Submissions
                        </div>
                        {
                            submissions.map((subObj : any) =>
                                <div key={subObj.key}>
                                    <ApprovalBlock 
                                        subObj={subObj}
                                        submissions={submissions}
                                        setSubmissions={setSubmissions}
                                    />
                                    {/* <div className="h-5"></div> */}
                                </div>
                            )
                        }
                    </div>
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