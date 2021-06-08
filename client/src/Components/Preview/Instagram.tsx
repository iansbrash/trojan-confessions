import React, {
    FC,
} from 'react';
import ThemeProps from './ThemeProps';
import generateSignature from './generateSignature';
import AppleEmojifier from './AppleEmojifier';

interface InstaTextProps {
    text: string,
    needsCorner?: boolean
}

const InstaText : FC<InstaTextProps> = ({
    text,
    needsCorner
} : InstaTextProps) => {
    return (
        <div className="relative w-full flex justify-end mr-2">
            <div className="z-30 leading-5 items-center flex flex-row flex-wrap relative max-w-3/4 bg-purple-500 rounded-3xl px-4 py-2 text-white text-md">
                <AppleEmojifier content={text}/>
            </div>
            {
                needsCorner ? 
                <>
                    <div className="z-10 bg-purple-500 absolute right-0 bottom-0 w-9 h-9 rounded-md">

                    </div>
                </>
                : 
                <>
                    <div className="z-10 bg-purple-500 absolute right-0 top-0 w-9 h-9 rounded-md">

                    </div>
                </>
            }

            {
                needsCorner ? 
                <>
                    <div className="z-10 absolute top-0 right-0 h-4.5 w-4.5 bg-black"> 
                        
                    </div>
                </>
                : 
                <>
                    <div className="z-10 absolute bottom-0 right-0 h-4.5 w-4.5 bg-black"> 
                        
                    </div>
                </>
            }
        </div>

    )
}

const Video = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
)

const Camera = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
)

const CameraBottom = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
)

const Microphone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
)

const Gallery = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
)

const Sticker = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
)

const Instagram : FC<ThemeProps> = ({
    confessionInput,
    location,
    school,
    fraternity,
    year,
    tags
} : ThemeProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-start items-end h-96 w-96 bg-black shadow-md">
                {/* Header */}
                <div className="w-full border-b border-gray-800 flex flex-row h-14 justify-between items-center">
                    {/* Left Chevron + Icon + Name */}
                    <div className="flex flex-row justify-start items-center">
                        {/* Chevron */}
                        <div className="text-white mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>

                        {/* Icon + Name + @ */}
                        <div className="flex flex-row justify-start items0center">
                            {/* Icon */}
                            <div className="rounded-full bg-gray-600 h-8 w-8">
                                {/* Img */}
                            </div>

                            {/* Name + Handle */}
                            <div className="-my-4 ml-2.5 flex flex-col justify-center items-start">
                                {/* Name */}
                                <div className="text-white font-medium text-lg">
                                    Ian Brash
                                </div>

                                {/* Handle */}
                                <div className="-mt-2 text-gray-400 text-sm">
                                    ian.trash
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phone + Video */}
                    <div className="text-white mr-2 space-x-4 flex flex-row justify-start items-center">
                        <Camera />

                        <Video />
                    </div>
                </div>

                {/* Timestamp */}
                <div className="w-full text-center mt-1 mb-3 text-gray-500 text-xs">
                    12:37 PM
                </div>

                {/* Text */}
                <div className="flex flex-col flex-1 items-end justify-start">
                    <InstaText text={confessionInput} needsCorner={true}/>
                    <div className="h-0.5"></div>
                    <InstaText text={generateSignature({location, school, fraternity, year})} needsCorner={false}/>
                </div>

                {/* Send Message */}
                <div className="mb-1 w-full h-11">
                    <div className="flex flex-row justify-between h-full flex-1 mx-1 rounded-3xl bg-gray-800">
                        {/* Camera Icon + Message... */}
                        <div className="flex flex-row items-center">
                            <div className="flex items-center justify-center text-white ml-1 w-9 h-9 rounded-full bg-purple-600">
                                <CameraBottom />
                            </div>
                            <div className="ml-2 text-gray-400 text-md">
                                Message...
                            </div>
                        </div>

                        {/* Mic Gallery Sticker */}
                        <div className="mr-3 space-x-1.5 text-white flex flex-row items-center">
                            <Microphone />
                            <Gallery />
                            <Sticker />
                        </div>
                    </div>
                </div>
                


            </div>  
        </div>
    )
}

export default Instagram;