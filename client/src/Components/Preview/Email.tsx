import React, {
    FC
} from 'react';
import ThemeProps from './ThemeProps';
import generateSignature from './generateSignature';


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

const Email : FC<ThemeProps> = ({
    confessionInput,
    location,
    school,
    fraternity,
    year,
    tags
} : ThemeProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-start items-center h-96 w-96 bg-white rounded-md shadow-md">
                {/* Icon */}
                <div className="flex flex-row justify-start w-full h-20">
                    {/* Icon */}
                    <div className="flex justify-center items-center h-20 w-20">
                        <div className="h-16 w-16 rounded-full">
                            <img alt="" className="rounded-full" src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"/>
                        </div>
                    </div>

                    {/* Signature */}
                    <div className="flex flex-col justify-start flex-1">
                        <div className="mt-3.5 flex flex-row justify-between">
                            <div>
                                <span className="font-bold text-lg">Student</span>
                                {/* <span className="text-gray-500 text-md">{`<brash@usc.edu>`}</span> */}
                            </div>
                            <div className="text-gray-500 text-md mr-3">
                                7:00 PM (3 hours ago)
                            </div>
                        </div>
                        <div className="flex flex-row text-gray-500 text-md -mt-1">
                            to Carol 
                            <ChevronDown cName="mt-2 ml-1 h-3 w-3"/>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="w-full h-full">
                    <div className="mx-4 mt-2 mb-2">
                        Hi President Folt,
                    </div>
                    <div className="mx-4">
                        {confessionInput}
                    </div>
                    <div className="mx-4 mt-4 mb-2">
                        Best,
                        <div>
                            {generateSignature({location, school, fraternity, year})}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Email;