import React, {
    FC
} from 'react';
import ThemeProps from './ThemeProps';
import generateSignature from './generateSignature';



const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
)

const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
    </svg>
)

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
    </svg>
)

const CameraButton = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
)

const MicrophoneButton = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
    </svg>
)

const Photos = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
)

const Rocket = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
    </svg>
)

const Snapchat : FC<ThemeProps> = ({
    confessionInput,
    location,
    school,
    fraternity,
    year,
    tags
} : ThemeProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-between items-center h-96 w-96 bg-white shadow-md">
                <div className="w-full flex flex-col justify-start items-center ">
                    {/* Top Banner (Bitmoji, Name, Call, Video, Exit) */}
                    <div className="flex flex-row justify-between items-center w-full h-12 border-gray-200 border-b">

                        {/* Bitmoji and Name */}
                        <div className="flex flex-row flex-1 justify-start items-center">
                            {/* Bitmoji */}
                            <div className="h-12 w-12 flex justify-center items-center">
                                <div className="h-8 w-8 xrounded-md shadow-md">
                                
                                </div>
                            </div>

                            {/* Name */}
                            <div className="font-bold text-gray-800 text-1.5xl">
                                *A$AP Tit$
                            </div>
                        </div>

                        {/* Call, Video, Exit */}
                        <div className="flex flex-row items-center">
                            {/* Call and Video */}
                            <div className="flex flex-row space-x-0.5">
                                <div className="text-gray-600 flex justify-center items-center rounded-l-full bg-gray-150 h-8 w-12">
                                    <PhoneIcon />
                                </div>
                                <div className="text-gray-600 flex justify-center items-center rounded-r-full bg-gray-150 h-8 w-12">
                                    <VideoIcon />
                                </div>
                            </div>

                            {/* Exit */}
                            <div className="mx-2 text-gray-600">
                                <ChevronRight />
                            </div>
                        </div>

                    </div>

                    {/* Today */}
                    <div className="text-gray-500 text-xss font-medium">
                        TODAY
                    </div>

                    {/* ME + Message */}
                    <div className="flex flex-col w-full justify-start items-start">
                        <div className="ml-2 flex flex-col">

                            {/* ME */}
                            <div className="text-xs text-red-400 font-bold ">
                                ME
                            </div>

                            {/* Vertical Line + Message */}
                            <div className="border-l-2 border-red-400 pl-1.5 font-medium">
                                <div>
                                    {confessionInput}
                                </div>
                                <div>
                                    {generateSignature({location, school, fraternity, year})}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Input Bar */}
                <div className="w-full border-t border-gray-100 h-12 flex flex-row justify-start items-center">

                    {/* Camera Button */}
                    <div className="text-gray-500 mx-1.5 rounded-full bg-gray-150 flex justify-center items-center h-9 w-9">
                        <CameraButton />
                    </div>

                    {/* Send a Chat + Mic */}
                    <div className="h-9 flex-1 rounded-full bg-gray-150 flex flex-row justify-between items-center">
                        {/* Send a Chat */}
                        <div className="ml-3 text-lg text-gray-400">
                            Send a chat
                        </div>

                        {/* Mic */}
                        <div className="text-gray-500 mr-3">
                            <MicrophoneButton />
                        </div>
                    </div>
                    {/* Photos + Rocket */}
                    <div className="flex flex-row space-x-1 mx-2">
                        {/* Photos */}
                        <div className="text-gray-500">
                            <Photos />
                        </div>

                        {/* Rocket Button */}
                        <div className="text-gray-500">
                            <Rocket />
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default Snapchat;