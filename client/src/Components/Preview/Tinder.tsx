import React, {
    FC,
    useEffect,
    useState
} from 'react';
import ThemeProps from './ThemeProps';

interface TinderTextProps {
    text: string
}

interface TinderTextPropsTwo {
    needsCorner: boolean
}

const Camera = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
    )
}

const Shield = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
        </svg>
    )
}

const ChevronDown = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
    )
}

const TinderHeader : FC = () => {
    return (
        <div className="z-10 h-16 shadow-md w-full flex flex-row justify-between items-center">
            <div className="ml-2 w-7 text-gray-300">
                <ChevronDown />
            </div>

            {/* Icon + Name */}
            <div className="flex flex-col justify-center items-center">
                <div className="mt-1 rounded-full h-9 w-9 bg-gray-300">
                    <img alt="" className="object-cover rounded-full h-9 w-9" src={'https://www.president.usc.edu/wp-content/uploads/2021/01/Carol-Folt-USC-President-784x1024.jpg'}/>
                </div>
                <div className="-mt-0.5 text-xs text-gray-400">
                    Carol
                </div>
            </div>

            {/* Buttons */}
            <div className="w-9 h-16 bg-pink relative">
                <div className="space-x-2 absolute right-4 top-0 bottom-0 flex flex-row justify-center items-center">
                    {/* Camera */}
                    <div className="text-blue-500">
                        <Camera />
                    </div>

                    {/* Shield */}
                    <div className="text-blue-500">
                        <Shield />
                    </div>
                </div>
            </div>
        </div>
    )
}

const TinderText : FC<TinderTextProps & TinderTextPropsTwo> = ({
    text,
    needsCorner
} : (TinderTextProps & TinderTextPropsTwo)) => {


    if (text === '') return null;

    return (
        <div className="flex-row flex">
            <div className="w-28">

            </div>

            <div className="w-full flex flex-row justify-end relative">
                <div className="z-30 relative">
                    <div className="z-10 bg-tinderblue rounded-3xl mr-3 py-2">
                        <div className="break-all leading-6 mx-3 text-white text-lg text-left">
                            {text}
                        </div>
                    </div>
                    
                </div>
                {/* Seems to be a block on the rightmost side that makes it not round */}
                <div className="z-0 absolute bottom-0 right-0 bg-tinderblue rounded-md h-10 w-10 mr-3 py-2">
                   
                </div>
                {needsCorner ? 
                <>
                    <div className="z-0 absolute top-0 right-0 bg-tinderblue rounded-md h-10 w-10 mr-3 py-2">
                   
                   </div>
                </>
                : 
                <>
                    <div className="z-10 absolute bottom-5 bg-white  h-5 w-10 mr-3 py-2">
                   
                   </div>
                   <div className="z-10 absolute bottom-0 right-5 bg-white  h-5 w-10 mr-3 py-2">
                      
                   </div>
                </>}
                {
                    needsCorner ?
                        <>
                            <div className="z-0 absolute bottom-0 right-0 bg-tinderblue rounded-md h-10 w-10 mr-3 py-2">
                            </div>
                        </>
                    : 
                        null
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

    const [textHeight, setTextHeight] = useState<number>(0);


    useEffect(() => {
        if (document.getElementById('text')){
            const height : number = document.getElementById('text')!.clientHeight;

            setTextHeight(height);
            //276 should be the max
        }

        return () => {
            // cleanup
        }
    }, [confessionInput, location, school, fraternity, year]);

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-start items-center h-96 w-96 bg-white shadow-md">
                {/* Header */}
                { textHeight > 276 ? null : <TinderHeader /> }

                {/* You Matched With */}
                <div className="text-xs text-gray-400 my-2">
                    {`YOU MATCHED WITH CAROL ON ${`4/8/21`}`}
                </div>

                <div id="text" className="flex flex-col justify-start items-end bg-white w-full">
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
        </div>
    )
}

export default Tinder;