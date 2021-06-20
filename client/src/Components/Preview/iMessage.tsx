import React, {
    FC,
} from 'react';
import ThemeProps from './ThemeProps';
import generateSignature from './generateSignature';
import AppleEmojifier from './AppleEmojifier';

interface TextProps {
    content: string,
    hasTail: boolean,
    dark: boolean
}

const Text : FC<TextProps> = ({
    content,
    hasTail,
    dark
} : TextProps) => {


    return (
        <>
            {content === '' ? null : 
                <div className="justify-start flex-none flex flex-row flex-wrap leading-6 mr-4 break-none max-w-xs relative rounded-3xl text-white text-xl bg-blue-400 py-2 px-4 mb-0.5">
                    
                    <AppleEmojifier content={content}/> 

                    {
                        hasTail ? 
                        <>
                            <div className="transform translate-x-0.5 absolute bottom-0 -right-2.5 h-5 w-5 bg-blue-400 rounded-full"></div>
                            <div className={`transform translate-x-0.5 absolute bottom-0 -right-3.5 h-4 w-4 ${dm(dark)['bg']} rounded-full`}></div>
                            <div className={`transform translate-x-0.5 absolute bottom-2 -right-3.5 h-4 w-4 ${dm(dark)['bg']}`}></div>
                        </> 
                            : 
                        null
                    }

                </div>
            }
        </>
    )
}


const IMessage : FC<ThemeProps> = ({
    confessionInput,
    location,
    school,
    fraternity,
    year,
    tags,
    dark
} : ThemeProps) => {

    

    return (
        <div className="flex justify-center items-center">
            <div className={`h-96 w-96 ${dm(dark)['bg']} shadow-md flex justify-end items-center`}>
                <div className="flex flex-shrink flex-col justify-center items-end">
                    <Text content={confessionInput} hasTail={false} dark={dark}/>
                    <Text content={
                        generateSignature({location, school, fraternity, year})
                    } hasTail={true} dark={dark}/>
                    {/* Delivered */}
                    <div className="text-gray-400 font-medium text-xss mr-4">
                        Delivered
                    </div>
                </div>
                
            </div>
        </div>
    )
}

const dm = (dark: boolean) => {
    if (dark) return darkStyles;
    return lightStyles;
}

const darkStyles = {
    bg: 'bg-black',
}

const lightStyles = {
    bg: 'bg-white',
}

export default IMessage;