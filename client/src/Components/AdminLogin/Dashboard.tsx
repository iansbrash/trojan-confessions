import React, {
    FC,
    useState
} from 'react';
import HomeHeader from '../Home/HomeHeader';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router';

const Dashboard : FC = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);
    const [isAuthed, setIsAuthed] = useState<boolean>(true);

    const logout = () => {
        if (cookies['jwt_token']){
            removeCookie('jwt_token');
            setIsAuthed(false);
        }
        else {
            alert('somehow the jwt tkoen doesnt exist');
        }
    }

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