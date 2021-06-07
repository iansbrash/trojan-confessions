import React, {
    FC,
    useState,
    useEffect
} from 'react';
import isEmoji, {
    retrieveEmojipediaImage
} from './isEmoji';
import runes from 'runes';

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

interface AppleEmojifierProps {
    content: string
}

const AppleEmojifier : FC<AppleEmojifierProps> = ({
    content
} : AppleEmojifierProps) => {

    const [newContent, setNewContent] = useState<string[]>([]);

    useEffect(() => {
        let newArray : string[] = [];
        runes(content).forEach((value: string, index: number) => {
            if (isEmoji(value)) {
                newArray.push(value);
            }
            else {
                if (newArray.length === 0){
                    newArray.push(value);
                }
                else if (isEmoji(newArray[newArray.length - 1])){
                    newArray.push(value);
                }
                else {
                    newArray[newArray.length - 1] = newArray[newArray.length - 1] + value;
                }
            }
        })

        let newNewArray : string[] = [];

        newArray.forEach(s => {
            if (!isEmoji(s)){
                newNewArray = [...newNewArray, ...(s.split(' '))]
            }
            else {
                newNewArray.push(s);
            }
        })

        setNewContent(newNewArray);
        console.log(newNewArray);
    }, [content])


    return (
        <>
            {newContent ? newContent.map((char : string, index : number) => {
                if (isEmoji(char)){
                    return <EmojiHandler emoji={char}/>
                }
                else {
                    if (char !== ' '){
                        // if we're not at the end
                        if (index !== newContent.length - 1){
                            // if the next item is an emoji, don't put a space
                            if (isEmoji(newContent[index + 1])){
                                return <span>{char}</span>
                            }
                        }
                        return <span>{char}&nbsp;</span>;
                    }
                    return <>&nbsp;</>
                }
            }) : null}
        </>
    )
}

export default AppleEmojifier;