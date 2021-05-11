import React, {
    FC,
    useState
} from 'react';
import ThemeProps from './ThemeProps';


const Dot : FC = () => {
    return (
        <div className="text-xs text-gray-400 mx-1">
            •
        </div>
    )
}

const Divider : FC = () => {
    return (
        <div className="h-0.25 w-full my-1">
            <div className="h-0.25 bg-gray-600 mx-4">

            </div>
        </div>
    )
}

const Twitter : FC<ThemeProps> = ({
    confessionInput,
    location,
    school,
    fraternity,
    year,
    tags
} : ThemeProps) => {

    enum Popularity {
        LOW,
        MEDIUM,
        HIGH,
        VIRAL
    }

    const rand = Math.random();

    const popularity : Popularity = rand < 0.75 ? Popularity.LOW : (
        rand < 0.9 ? Popularity.MEDIUM : (
            rand < 0.99 ? Popularity.HIGH : Popularity.VIRAL
        )
    );

    const likes =  Math.round(((10 ** popularity) * Math.random() * 10));
    const retweets = Math.round(((5 ** popularity) * Math.random() * 10));
    const quoteTweets = Math.round(((5 ** popularity) * Math.random() * 5));

    

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-start items-center h-96 w-96 bg-twitterblue rounded-md shadow-md">
                {/* People liked... */}
                <div className="flex flex-row justify-center items-center my-2">
                    <div className="text-gray-300 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    
                    <div className="text-md text-gray-300">
                        Iaen and {Math.round(Math.random() * 10)} others liked
                    </div>
                </div>

                {/* Avi and @ */}
                <div className="flex flex-row items-start justify-start w-full">
                    <div className="flex flex-row items-start justify-start w-full">
                        {/* Avi */}
                        <div className="h-14 w-14 ml-4 mr-2">
                            <div className="h-14 w-14 rounded-full bg-white">

                            </div>
                        </div>

                        {/* Handle and @ */}
                        <div className="flex flex-col justify-center h-14">
                            {/* Handle */}
                            <div className="font-bold text-white -mb-1">
                                Anonymous {`Student`}
                            </div>
                            {/* @ */}
                            <div className="text-gray-400 -mt-1">
                                @{`firehelton220`}
                            </div>
                        </div>
                    </div>
                    
                    {/* Options Button */}
                    <div className="h-14 flex justify-center items-center text-gray-300 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </div>
                </div>

                {/* Tweet */}
                <div className="flex justify-start flex-row w-full">
                    <div className="m-4 text-gray-100 text-lg">
                        {confessionInput}
                    </div>
                </div>

                

                {/* Timestamp, twitter for ________ */}
                <div className="flex flex-row justify-start w-full items-center">
                    {/* Timestamp */}
                    <div className="text-gray-400 text-md ml-4">
                        {`4:39 AM`}
                    </div>

                    <Dot />

                    <div className="text-gray-400 text-md">
                        {`4/30/21`}
                    </div>

                    <Dot />


                    {/* Twitter for */}
                    <div className="text-gray-400 text-md mr-4">
                        Twitter for <span className="text-twitterlogoblue">USC</span>
                    </div>
                </div>

                <Divider />

                {/* Retweets Quote Tweets Likes */}
                <div className="flex flex-row justify-start w-full ml-8 space-x-2">
                    {/* Retweets */}
                    <div className="text-gray-100">
                        <span className="font-bold">{retweets}</span> Retweets
                    </div>

                    {/* Quote Tweets */}
                    <div className="text-gray-100">
                        <span className="font-bold">{quoteTweets}</span> Quote Tweets
                    </div>

                    {/* Likes */}
                    <div className="text-gray-100">
                        <span className="font-bold">{likes}</span> Likes
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Twitter;