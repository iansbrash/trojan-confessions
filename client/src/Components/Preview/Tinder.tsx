import React, {
    FC
} from 'react';
import ThemeProps from './ThemeProps';

interface TinderTextProps {
    text: string
}

interface TinderTextPropsTwo {
    needsCorner: boolean
}

const TinderText : FC<TinderTextProps & TinderTextPropsTwo> = ({
    text,
    needsCorner
} : (TinderTextProps & TinderTextPropsTwo)) => {
    return (
        <div className="flex-row flex">
            <div className="w-28">

            </div>

            <div className="w-full flex flex-row justify-end relative">
                <div className="z-10 relative">
                    <div className="z-10 bg-tinderblue rounded-3xl mr-3 py-2">
                        <div className="leading-6 mx-3 text-white text-lg text-left">
                            {text}
                        </div>
                    </div>
                    
                </div>
                <div className="z-0 absolute bottom-0 right-0 bg-tinderblue rounded-md h-10 w-10 mr-3 py-2">
                   
                </div>
                {
                    needsCorner ?
                        <>
                            <div className="z-0 absolute top-0 right-0 bg-tinderblue rounded-md h-10 w-10 mr-3 py-2">
                            </div>
                        </>
                    : null
                }
            </div>
        </div>
    )
}

const Tinder : FC<ThemeProps> = ({
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
                {/* Header */}
                <div>

                </div>

                {/* You Matched With */}
                <div className="text-xs text-gray-400 my-2">
                    {`YOU MATCHED WITH CAROL ON ${`4/8/21`}`}
                </div>
                <TinderText 
                    text={confessionInput}
                    needsCorner={false}
                />
                <div className="h-1">

                </div>

                <TinderText 
                    text={`-Anonymous ${year === '' ? 'Student' : year} ${location === '' ? '' : `at ${location}`} ${school === '' ? '' : `studying at ${school}`} ${fraternity === '' ? '' : `in ${fraternity}`}`}
                    needsCorner={true}
                />
                
                
                
            </div>
        </div>
    )
}

export default Tinder;