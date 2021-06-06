import React, {
    FC,
    useEffect,
    useState
} from 'react';
import ThemeProps from './ThemeProps';
import generateSignature from './generateSignature';
import runes from 'runes';
import isEmoji, {
    retrieveEmojipediaImage
} from './isEmoji';

interface EmojiHandlerProps {
    emoji: string
}

const EmojiHandler : FC<EmojiHandlerProps> = ({
    emoji
} : EmojiHandlerProps) => {

    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        (async () => {
            const url = await retrieveEmojipediaImage(emoji);

            setUrl(url);
        })();
    }, [])

    return (
        <div className="w-6 h-6">
            <img src={url}/>
        </div>
    )
}


interface TextProps {
    content: string,
    hasTail: boolean
}

const Text : FC<TextProps> = ({
    content,
    hasTail
} : TextProps) => {
    return (
        <>
            {content === '' ? null : 
                <div className="flex flex-col leading-6 mr-4 break-words max-w-xs relative rounded-xl text-white text-xl bg-blue-400 py-1 px-2 mb-0.5">
                    {content ? runes(content).map((char : string) => {
                        if (isEmoji(char)){
                            // return char;

                            return <EmojiHandler emoji={char}/>

                            retrieveEmojipediaImage(char).then(res => {
                                console.log(res);

                                return (
                                    // <img src={res}/>
                                    <div>wtf</div>
                                )
                            })

                            // return char;
                            
                        }
                        else {
                            return char;
                        }
                    }) : null}
                    {
                        hasTail ? 
                        <>
                            <div className="transform translate-x-0.5 absolute bottom-0 -right-2.5 h-5 w-5 bg-blue-400 rounded-full"></div>
                            <div className="transform translate-x-0.5 absolute bottom-0 -right-3.5 h-4 w-4 bg-gray-900 rounded-full"></div>
                            <div className="transform translate-x-0.5 absolute bottom-2 -right-3.5 h-4 w-4 bg-gray-900"></div>
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
    tags
} : ThemeProps) => {

    

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-end h-96 w-96 bg-black shadow-md">
                <Text content={confessionInput} hasTail={false}/>
                <Text content={
                    generateSignature({location, school, fraternity, year})
                } hasTail={true} />
            </div>
        </div>
    )
}

export default IMessage;