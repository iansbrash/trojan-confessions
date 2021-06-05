import React, {
    FC,
    useRef,
    useEffect,
    useState
} from 'react';
import axios from 'axios';


interface TagProps {
    tag: string
}

const Tag : FC<TagProps> = ({
    tag
} : TagProps) => {
    return (
        <div className="px-2 rounded-md bg-red-800 shadow-md">
            <div className="text-xl text-white">
                {`#${tag}`}
            </div>
        </div>
    )
}

interface TagErrorPopupProps {
    tagError: TagErrors
}

const TagErrorPopup : FC<TagErrorPopupProps> = ({
    tagError
} : TagErrorPopupProps) => {

    const hints = [
        '',
        'Tags must start with a #',
        'Tags can\'t contains spaces',
        'Tags can\'t be empty',
        'Tags can only contain letters and numbers',
        'This tag has already exists'
    ]

    const [currentHint, setCurrentHint] = useState<string>(hints[0]);

    useEffect(() => {

        if (tagError !== TagErrors.None){
            setCurrentHint(hints[tagError]);
        }

    }, [tagError])


    

    return (
        <div className={`transform-opacity duration-500 ease-in-out ${tagError !== TagErrors.None ? 'opacity-1' : 'opacity-0'} z-10 absolute left-0 bottom-10`}>
            <div className={`relative m-2 p-2 bg-red-500 rounded-md shadow-md`}>
                <div className="z-0 absolute left-6 -bottom-2 flex justify-center">
                    <div className="transform rotate-45 bg-red-500 h-4 w-4">

                    </div>
                </div>
                <div className="z-10 break-normal text-xl text-white">
                    {currentHint}
                </div>
            </div>
        </div>
    )
}




enum TagErrors {
    None,
    NeedsHash,
    HasSpace,
    EmptyTag,
    ContainsNonAlphaNumeric,
    TagExists
}

    
interface AddTagsProps {
    hashtags: string[],
    setHashtags: (x : string[]) => void
}

const AddTags : FC<AddTagsProps> = ({
    hashtags,
    setHashtags
} : AddTagsProps) => {

    

    const inputRef = useRef<HTMLInputElement>(document.createElement('input'))
    const [tagError, setTagError] = useState<TagErrors>(TagErrors.None);

    const HandleChange = (e : any) => {
        const t : string = e.target.value;

        if (t.length === 0){
            setTagError(TagErrors.None)
        }
        else {
            // Needs a hashtag
            if (t.charAt(0) !== '#'){
                setTagError(TagErrors.NeedsHash)
            }
            // Tag is empty
            else if (t.substr(1) === ' '){
                setTagError(TagErrors.EmptyTag);
            }
            // Tag contains a space somewhere
            else if (t.indexOf(' ') !== -1 && t.indexOf(' ') !== t.length - 1){
                setTagError(TagErrors.HasSpace);
            }
            // We check if tag ends in a space
            else if (t.charAt(t.length - 1) === ' '){
                console.log('time to tag!')

                const trimmedTag = (t.substr(1)).trim();

                // if trimmed tag isn't alphanumeric
                if (!trimmedTag.match(/^[a-z0-9]+$/i)){
                    setTagError(TagErrors.ContainsNonAlphaNumeric);
                }
                // if the tag is a go
                else if (!hashtags.includes(trimmedTag)){
                    setHashtags([...hashtags, trimmedTag])
                    inputRef.current.value = '';
                    setTagError(TagErrors.None);
                }
                // tag already exists
                else {
                    setTagError(TagErrors.TagExists);
                }
            }
            else {
                setTagError(TagErrors.None);
            }
        }
    }
    
    return (
        <div className="relative self-center">
            <input 
                ref={inputRef}
                onChange={(e) => HandleChange(e)}
                placeholder={`#tag`}
                className="bg-gray-200 ml-2 text-2xl z-10 leading-6 break-all whitespace-normal break-text flex-1 placeholder-gray-400 text-gray-700 relative rounded border-0 outline-none focus:outline-none w-full text-left"
            />
            <TagErrorPopup 
                tagError={tagError}
            />
        </div>
    )
}

/** More shit we need to pass down:
 *  userName (we need to hash it),
 *  tags, theme,
 *  signature: { location, school, frat, year }
 */

interface SignatureProps {
    location: string,
    school: string,
    fraternity: string,
    year: string
}

interface SubmissionBoxProps {
    id_token: string,
    signDropped: boolean,
    setSignDropped: (sD : boolean) => void,
    setPreviewDropped: (pD : boolean) => void,
    previewDropped: boolean,
    setConfessionInput: (conf : string) => void,
    username: string,
    signature: SignatureProps,
    tags: string[],
    setTags: (x : string[]) => void,
    theme: Themes,
    setTheme: (x : Themes) => void,
    setSubmitted: (s : boolean) => void
}

enum Themes {
    imessage = "imessage",
    zoom = "zoom",
    email = "email",
    tinder = "tinder",
    twitter = "twitter",
    snapchat = "snapchat",
    notes = "notes",
}

const SubmissionBox : FC<SubmissionBoxProps> = ({
    id_token,
    signDropped,
    setSignDropped,
    setPreviewDropped,
    previewDropped,
    setConfessionInput,
    username,
    signature,
    tags,
    setTags,
    theme,
    setTheme,
    setSubmitted
} : SubmissionBoxProps) => {

    const inputSpan = useRef<HTMLTextAreaElement>(document.createElement('textarea'));
    const [inputLength, setInputLength] = useState<number>(0);
    const [themesIndex, setThemesIndex] = useState<number>(0);

    /** Idea: Semi-Anonymous Submissions
     *  i.e. 
     *      -Marshall '25 Student
     *      -Viterbi '23 Student at University Gateway
     *      -Sigma Nu '23 Brother
     */


    const toggleSignDropped = () => {
        setSignDropped(!signDropped);
    }

    const togglePreviewDropped = () => {
        setPreviewDropped(!previewDropped);
    }

    const toggleTheme = () => {
        const themesArray : Themes[] = [
            Themes.imessage,
            Themes.zoom,
            Themes.email,
            Themes.tinder,
            Themes.twitter,
            Themes.snapchat,
            Themes.notes
        ]

        console.log(`themesIndex before setting: ${themesIndex}`)

        let newValue = themesIndex + 1;
        console.log(`newValue: ${newValue}`)

        setThemesIndex(newValue)
        console.log(`themesIndex after setting: ${themesIndex}`)


        setTheme(themesArray[newValue % themesArray.length]);
        console.log(`Toggled theme to: ${Themes[theme]}`)

    }



    const writeUserData = async (submission : string, email : string) : Promise<any> =>{
        const maxCharLength = 280;

        if (inputLength > maxCharLength){
            return;
        }
        else {
            const userName = Date.now();

            console.log(`About to send axios.post at // submission: ${submission}, hashedId: ${userName}`)

            console.log(`Themes[theme]: ${Themes[theme]}`)

            var config : object = {
                method: 'post',
                url: '/api/confessions/',
                headers: { 
                    // we use .value now because it is a textarea
                    'content': inputSpan.current.value, 
                    'hashedid': userName,
                    'tags': tags,
                    'theme': Themes[theme],
                    'id_token': id_token,
                    // 'signature': signature
                    'location': signature.location,
                    'school': signature.school,
                    'fraternity': signature.fraternity,
                    'year': signature.year
                }
            };

            // Propogates upwards and resets everything
            setSubmitted(true);
              
            await axios(config);
        }
    }


    // Dynamically sets starting size on page load
    useEffect(() => {
        auto_grow(inputSpan.current)
    }, [])

    function auto_grow(element : HTMLElement) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";

        // updates the X/280 counter
        setInputLength(inputSpan.current.value.length)

        // updates confession for preview
        setConfessionInput(inputSpan.current.value);
    }

    return (
        <div className="flex flex-1 flex-col rounded-lg pb-6">
            <div className="break-all whitespace-normal flex-1 flex flex-col space-y-4 p-5 bg-gray-200 shadow-md rounded-md">
                {/* Submission Text Span */}
                <div className="flex flex-1 flex-row space-x-4">
                    <div className="relative flex-1 flex">
                        <textarea 
                            maxLength={280}
                            id="editable"
                            ref={inputSpan}
                            onInput={e => auto_grow(e.currentTarget)}
                            contentEditable={true}
                            placeholder="I left my camera on in my 300 person lecture while I..."
                            className="bg-gray-200 min-h-0 resize-none overflow-hidden z-10 leading-6 break-all whitespace-normal break-text text-2xl flex-1 px-3 py-3 placeholder-gray-400 text-gray-700 relative rounded text-sm border-0 outline-none focus:outline-none w-full text-left"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="my-2 flex">
                    <div className="flex-1 mx-2 h-0.5 bg-gray-300">

                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-row justify-between space-x-2">
                    <AddTags 
                        hashtags={tags}
                        setHashtags={setTags}
                    />
                    <div className="flex flex-wrap space-x-2">
                        {tags.map(tag => <Tag tag={tag}/>)}
                    </div>
                </div>

                {/* Preview Submit Sign */}
                <div className="relative flex flex-row">
                    <div className="flex-1 flex-row flex space-x-2">
                        <div className="flex flex-col justify-center content-center px-2 h-8 bg-red-400 rounded-md shadow-md">
                            <button
                                onClick={() => writeUserData(inputSpan.current.innerHTML, 'test@usc.edu')}
                                className="focus:outline-none text-center font-bold text-xl text-white">
                                Submit
                            </button>
                        </div>
                        <div className="flex flex-col justify-center content-center px-2 h-8 bg-red-400 rounded-md shadow-md">
                            <button 
                                onClick={() => togglePreviewDropped()}
                                className="focus:outline-none text-center font-bold text-xl text-white">
                                Preview
                            </button>
                        </div>
                        <div className="flex flex-col justify-center content-center px-2 h-8 bg-red-400 rounded-md shadow-md">
                            <button 
                                onClick={() => toggleTheme()}
                                className="focus:outline-none text-center font-bold text-xl text-white">
                                Theme
                            </button>
                        </div>
                        <div className="flex flex-col justify-center content-center px-2 h-8 bg-red-400 rounded-md shadow-md">
                            <button 
                                onClick={() => toggleSignDropped()}
                                className="focus:outline-none text-center font-bold text-xl text-white">
                                Sign
                            </button>
                        </div>
                    </div>
                    <div className={`flex flex-col justify-center content-center px-2 h-8 transition-colors duration-500 ease-in-out ${inputLength === 280 ? 'bg-red-900' : 'bg-red-400'} bg-red-400 rounded-md shadow-md`}>
                        <div className={`text-center font-bold text-xl text-white`}>
                            {`${inputLength}/280`}
                        </div>
                    </div>
                    <div className={`font-bold text-md `}></div>
                </div>
            </div>
        </div>
    )
}

export default SubmissionBox;