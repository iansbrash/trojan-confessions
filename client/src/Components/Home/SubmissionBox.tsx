import React, {
    FC,
    useRef,
    useEffect,
    useState
} from 'react';

const SubmissionBox : FC = () => {

    const htmlToElement = (html : string) : HTMLSpanElement => {
        var template = document.createElement('span');
        // html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template;
    }

    const inputSpan = useRef<HTMLSpanElement>(htmlToElement(''));
    const [inputLength, setInputLength] = useState<number>(0);

    const handleKeydown = (evt : any) => {
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

            console.log(evt.key);
            updateInputSpanLength();
        }
    }

    const updateInputSpanLength = () => {


        console.log(inputSpan.current.textContent);
        // console.log(inputSpan.current.textContent.toString().length)
        setInputLength(inputSpan.current.innerHTML.toString().length);
    }

    useEffect(() => {
        if (inputSpan !== null){
            inputSpan.current.addEventListener('keydown', handleKeydown);
        }

        return (() => {
            if (inputSpan !== null){
                inputSpan.current.removeEventListener('keydown', handleKeydown);
            }
        })
    })

    return (
        <div className="flex flex-1 flex-col max-w-4xl rounded-lg px-6 pb-6">
            <div className="break-all whitespace-normal flex-1 flex p-5 bg-gray-200 shadow-md">
                <span 
                    ref={inputSpan}
                    contentEditable={true}
                    placeholder="I left my camera on in my 300 person lecture while I..." 
                    className="leading-6 break-all whitespace-normal break-text text-2xl flex-1 px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none w-full"/>
            </div>
            <div className="relative">
                <div className="absolute top-0 left-0 font-bold text-xl text-gray-800">
                    {inputLength}
                </div>
            </div>
        </div>
    )
}

export default SubmissionBox;