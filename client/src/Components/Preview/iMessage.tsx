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
                <div className="flex flex-row flex-wrap leading-6 mr-4 break-words max-w-xs relative rounded-xl text-white text-xl bg-blue-400 py-1 px-2 mb-0.5">
                    
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
            <div className={`flex flex-col justify-center items-end h-96 w-96 ${dm(dark)['bg']} shadow-md`}>
                <Text content={confessionInput} hasTail={false} dark={dark}/>
                <Text content={
                    generateSignature({location, school, fraternity, year})
                } hasTail={true} dark={dark}/>
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