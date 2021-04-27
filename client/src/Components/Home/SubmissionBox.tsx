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

    
interface AddTagsProps {
    hashtags: string[],
    setHashtags: (x : string[]) => void
}

const AddTags : FC<AddTagsProps> = ({
    hashtags,
    setHashtags
} : AddTagsProps) => {

    const inputRef = useRef<HTMLInputElement>(document.createElement('input'))

    const HandleChange = (e : any) => {
        const t : string = e.target.value;

        if (t.length === 0){
            return;
        }
        else {
            if (t.charAt(0) !== '#'){
                return;
            }
            else if (t.charAt(t.length - 1) === ' '){
                console.log('time to tag!')

                const trimmedTag = (t.substr(1)).trim();

                if (!hashtags.includes(trimmedTag)){
                    setHashtags([...hashtags, trimmedTag])
                    inputRef.current.value = '';
                    
                }
                else {
                    // error
                }
            }
        }
    }
    
    return (
        <div className="self-center">
            <input 
                ref={inputRef}
                onChange={(e) => HandleChange(e)}
                placeholder={`#tag`}
                className="bg-gray-200 ml-2 text-2xl z-10 leading-6 break-all whitespace-normal break-text flex-1 placeholder-gray-400 text-gray-700 relative rounded border-0 outline-none focus:outline-none w-full text-left"
            />
        </div>
    )
}

interface SubmissionBoxProps {
    id_token: string,
    signDropped: boolean,
    setSignDropped: (sD : boolean) => void,
    setPreviewDropped: (pD : boolean) => void,
    previewDropped: boolean
}

const SubmissionBox : FC<SubmissionBoxProps> = ({
    id_token,
    signDropped,
    setSignDropped,
    setPreviewDropped,
    previewDropped
} : SubmissionBoxProps) => {

    const inputSpan = useRef<HTMLSpanElement>(document.createElement('span'));
    const [inputLength, setInputLength] = useState<number>(0);
    const [isKeydown, setIsKeydown] = useState<boolean>(false);

    /** Idea: Semi-Anonymous Submissions
     *  i.e. 
     *      -Marshall '25 Student
     *      -Viterbi '23 Student at University Gateway
     *      -Sigma Nu '23 Brother
     */

    const [hashtags, setHashtags] = useState<string[]>([]);

    const toggleSignDropped = () => {
        setSignDropped(!signDropped);
    }

    const togglePreviewDropped = () => {
        setPreviewDropped(!previewDropped);
    }


    const writeUserData = async (submission : string, email : string) : Promise<any> =>{
        const maxCharLength = 280;

        if (inputLength > maxCharLength){
            return;
        }
        else {
            const userName = Date.now();

            console.log(`About to send axios.post at // submission: ${submission}, hashedId: ${userName}`)
            
            // https://git.heroku.com/afternoon-stream-90210.git/
            // const res : object = await axios.post('http://localhost:5000/api/confessions/', {
            //     submission: inputSpan.current.textContent,
            //     // timestamp: 123,
            //     hashedId: userName
            // });

            var config : object = {
                method: 'post',
                url: 'http://localhost:5000/api/confessions/',
                headers: { 
                  'submission': inputSpan.current.textContent, 
                  'hashedId': userName,
                  'id_token': id_token
                }
            };
              
            await axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                // console.log(error);
            });
        }
    }



    const handleKeydown = (evt : any) => {
        setIsKeydown(true);
        if (inputSpan !== null){

            const maxLength = 280;

            const l = inputSpan.current.innerHTML.toString().length;

            if (l >= maxLength){
                if (evt.key !== "Backspace"){
                    evt.preventDefault();
                }
            }
            else if (evt.key === "Enter") {
                evt.preventDefault();
            }
        }
    }

    const handleKeyup = (evt : any) => {
        setIsKeydown(false);
        if (inputSpan !== null){
            setInputLength(inputSpan.current.innerHTML.toString().length);
        }
    }

    useEffect(() => {
        if (inputSpan !== null){
            inputSpan.current.addEventListener('keydown', handleKeydown);
            inputSpan.current.addEventListener('keyup', handleKeyup);
        }
        return (() => {
            if (inputSpan !== null){
                inputSpan.current.removeEventListener('keydown', handleKeydown);
                inputSpan.current.removeEventListener('keyup', handleKeyup);
            }
        })
    })

    return (
        <div className="flex flex-1 flex-col rounded-lg pb-6">
            <div className="break-all whitespace-normal flex-1 flex flex-col space-y-4 p-5 bg-gray-200 shadow-md rounded-md">
                {/* Submission Text Span */}
                <div className="flex flex-1 flex-row space-x-4">
                    <div className="relative flex-1 flex">
                        <span
                            id="editable"
                            ref={inputSpan}
                            contentEditable={true}
                            placeholder="I left my camera on in my 300 person lecture while I..."
                            className="z-10 leading-6 break-all whitespace-normal break-text text-2xl flex-1 px-3 py-3 placeholder-gray-400 text-gray-700 relative rounded text-sm border-0 outline-none focus:outline-none w-full text-left"
                        />
                        <div className={`z-0 text-2xl ml-3 text-gray-400 absolute top-0 bottom-0 left-0 flex flex-1 items-center`}>
                            {inputSpan.current.textContent === '' && !isKeydown ? 'I left my Zoom camera on and...' : null}
                        </div>
                    </div>

                    <div className="w-36 bg-black">

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
                        hashtags={hashtags}
                        setHashtags={setHashtags}
                    />
                    <div className="flex flex-wrap space-x-2">
                        {hashtags.map(tag => <Tag tag={tag}/>)}
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
                                onClick={() => toggleSignDropped()}
                                className="focus:outline-none text-center font-bold text-xl text-white">
                                Sign
                            </button>
                        </div>
                    </div>
                    <div className={`flex flex-col justify-center content-center px-2 h-8 ${inputLength > 280 ? 'bg-red-900' : 'bg-red-400'} bg-red-400 rounded-md shadow-md`}>
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