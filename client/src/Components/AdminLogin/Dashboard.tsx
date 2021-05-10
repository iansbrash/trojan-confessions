import React, {
    FC
} from 'react';
import HomeHeader from '../Home/HomeHeader';

const Dashboard : FC = () => {
    return (
        <div className="flex flex-1 flex-col">
            <HomeHeader />

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