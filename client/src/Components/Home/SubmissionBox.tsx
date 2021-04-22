import React, {
    FC,
    useRef,
    useEffect,
    useState
} from 'react';
import firebase from 'firebase';



const SubmissionBox : FC = () => {

    const inputSpan = useRef<HTMLSpanElement>(document.createElement('span'));
    const [inputLength, setInputLength] = useState<number>(0);
    const [isKeydown, setIsKeydown] = useState<boolean>(false);

    const writeUserData = (submission : string, email : string) : void =>{
        console.log('test');


        const maxCharLength = 280;

        if (inputLength > maxCharLength){
            return;
        }

        var subRef = firebase.database().ref('submissions');
        var posterRef = firebase.database().ref('recentPosters');

        // firebase.database().ref('recentPosters').push().set({
        //     hashedId: 'test'
        // })


            // need to find way to hash emails for
            // security
            // and cuz we cant store total email
            // cuz the @ messes it up
        
        let userName = Date.now();
    
        posterRef.orderByChild("hashedId").equalTo(userName).once("value",snapshot => {
            if (snapshot.exists()){
              const userData = snapshot.val();
              console.log("exists!", userData);
            }
            else {
                subRef.push().set({
                    submission: submission,
                    timestamp: new Date().toISOString(),
                    hashedId : email
                });

                posterRef.push().set({
                    hashedId: userName
                })
            }
        });

        
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
            <div className="break-all whitespace-normal flex-1 flex flex-col space-y-4 p-5 bg-gray-200 shadow-md">
                <div className="flex flex-1 flex-row space-x-4">
                    <div className="relative flex-1 flex">
                        <span 
                            ref={inputSpan}
                            contentEditable={true}
                            placeholder="I left my camera on in my 300 person lecture while I..." 
                            className="leading-6 break-all whitespace-normal break-text text-2xl flex-1 px-3 py-3 placeholder-gray-400 text-gray-700 relative rounded text-sm border-0 shadow outline-none focus:outline-none w-full text-left"
                        />
                        <div className={`text-2xl ml-3 text-gray-400 absolute top-0 bottom-0 left-0 flex flex-1 items-center`}>
                            {inputSpan.current.textContent === '' && !isKeydown ? 'I left my Zoom camera on and...' : null}
                        </div>
                    </div>
                        
                    <div className="w-36 bg-black">

                    </div>
                </div>
                
                <div className="relative flex flex-row">
                    <div className="flex-1 flex-row flex space-x-2">
                        <div className="flex flex-col justify-center content-center px-2 h-8 bg-red-400 rounded-md shadow-md">
                            <button className="text-center font-bold text-xl text-white">
                                Preview
                            </button>
                        </div>
                        <div className="flex flex-col justify-center content-center px-2 h-8 bg-red-400 rounded-md shadow-md">
                            <button 
                                onClick={() => writeUserData(inputSpan.current.innerHTML, 'test@usc.edu')}
                                className="text-center font-bold text-xl text-white">
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className={`flex flex-col justify-center content-center px-2 h-8 ${inputLength > 280 ? 'bg-red-900' : 'bg-red-400'} bg-red-400 rounded-md shadow-md`}>
                            <div className={`text-center font-bold text-xl text-white`}>
                                {`${inputLength}/280`}
                            </div>
                        </div>
                    <div className={`font-bold text-md `}>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SubmissionBox;