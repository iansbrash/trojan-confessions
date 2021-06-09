import React, {
    FC,
} from 'react';
import ThemeProps from './ThemeProps';
import generateSignature from './generateSignature';
import AppleEmojifier from './AppleEmojifier';

const Reddit : FC<ThemeProps> = ({
    confessionInput,
    location,
    school,
    fraternity,
    year,
    tags
} : ThemeProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-start items-start h-96 w-96 bg-white shadow-md">
                {/* Maroon Header */}
                <div className="w-full h-10 bg-red-900">

                </div>

                {/* Padding Div */}
                <div className="px-3 w-full flex flex-col justify-start items-start">
                    {/* Icon, r/USC and u/____, * 15h, +Join */}
                    <div className="my-2 flex w-full flex-row justify-between items-center">
                        
                        {/* Left Side */}
                        <div className="flex flex-row justify-start items-center">
                            {/* Icon */}
                            <div className="h-8 w-8 rounded-full bg-red-500">
                                {/* <img /> */}
                            </div>

                            {/* r/USC and u/_______ */}
                            <div className="ml-2 flex flex-col justify-center items-start">
                                {/* r/USC */}
                                <div className="text-gray-400 text-sm font-medium -mb-0.5">
                                    r/USC
                                </div>

                                {/* u/________ + * + 15h */}
                                <div className="flex flex-row justify-start items-center">

                                    {/* u/ */}
                                    <div className="text-blue-400 text-sm -mt-0.5">
                                        u/fuckhelton1111
                                    </div>

                                    {/* Dot */}
                                    <div className="text-xs text-gray-400 mx-1">
                                        •
                                    </div>

                                    {/* 15h */}
                                    <div className="text-xs text-gray-400 mx-1">
                                        15h
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        {/* Right Side (+ Join) */}
                        <div className="flex flex-row justify-center items-center bg-blue-700 rounded-3xl h-6 text-white font-medium text-sm py-1 pl-1 pr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Join
                        </div>
                        
                    </div>

                    {/* Title */}
                    <div className="text-black text-xl font-medium">
                        Blackboard still sucks
                    </div>

                    {/* Flair */}
                    <div className="my-1 px-2 font-medium h-4 text-sm flex justify-center items-center rounded-2xl bg-yellow-400 text-white">
                        Confession
                    </div>

                    {/* Confession */}
                    <div className="leading-5 text-black text-md">
                        {confessionInput}
                    </div>

                    {/* Upvotes, Comments, Share */}
                    <div className="text-gray-400 text-sm font-medium my-1 w-full flex flex-row justify-between items-center">
                        {/* Upvotes, Downvotes Icon + Number */}
                        <div className="flex flex-row items-center justify-center"> 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            <div className="mx-1">
                                100
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>

                        {/* Comments */}
                        <div className="flex flex-row justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            8
                        </div>

                        {/* Share */}
                        <div className="flex flex-row justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Share
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reddit;