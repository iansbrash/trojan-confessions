import React, {
    FC
} from 'react';
import ThemeProps from './ThemeProps';
import generateSignature from './generateSignature';
import AppleEmojifier from './AppleEmojifier';

interface IconProps {
    cName: string
}

const ChevronDown : FC<IconProps> = ({
    cName
} : IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
    )
}

interface ZoomTextProps {
    message: string
}

const ZoomText : FC<ZoomTextProps> = ({
    message
} : ZoomTextProps) => {
    return (
        <div className="flex flex-row flex-wrap">
            <AppleEmojifier content={message} />
        </div>
    )
}


const Zoom : FC<ThemeProps> = ({
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
                {/* Chat / Caret Header */}
                <div className="relative flex w-full h-12 justify-center items-center">
                    <div className="text-l text-black">
                        Chat
                    </div>
                    <div className="absolute top-4 left-4 text-gray-500">
                        <ChevronDown cName="h-4 w-4"/>
                    </div>
                </div>

                {/* Chat */}
                <div className="flex-1 bg-white w-full">
                    <div className="mx-5 my-2 flex flex-col" >
                        <div className="text-sm text-gray-500">
                            {`From Me to `}
                            <span className="text-blue-400">Everyone</span>
                            :
                        </div>
                        <ZoomText message={confessionInput}/>
                        <ZoomText message={generateSignature({location, school, fraternity, year})}/>
                    </div>
                </div>

                {/* Chat Box */}
                <div className="w-full h-auto flex flex-col justify-start items-center">
                    <div className="w-full h-8 flex flex-row items-center justify-between">
                        <div className="flex flex-row space-x-2">
                            <div className="ml-5 text-gray-500">
                                To:
                            </div>
                            <div className="bg-blue-500 rounded-3xl h-6 flex justify-center items-center flex-row">
                                <div className="text-white text-sm mx-3">
                                    Everyone
                                </div>
                                <div className="text-white -ml-2 mr-2">
                                    <ChevronDown cName="h-3 w-3"/>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-sm shadow-md bg-gray-100 mr-4 px-1 flex flex-row items-center">
                            <div className="mx-1 text-gray-700 my-1 text-sm">
                                More
                            </div>
                            <div className="text-gray-700">
                                <ChevronDown cName="h-3 w-3"/>
                            </div>
                        </div>
                        
                    </div>
                    <div className="w-full h-8">
                        <div className="ml-5 text-lg text-gray-400">
                            Type message here...
                        </div>
                    </div>
                    <div className="w-full h-2">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Zoom;