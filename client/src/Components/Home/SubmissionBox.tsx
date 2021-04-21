import React, {
    FC,
    useRef,
    useEffect,
    useState
} from 'react';
import firebase from 'firebase';



const SubmissionBox : FC = () => {

    var database = firebase.database();

    const writeUserData = (submission : string, email : string) : void =>{
        console.log('test');

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
                    timestamp: Date.now(),
                    hashedId : email
                });

                posterRef.push().set({
                    hashedId: userName
                })
            }
        });

        
    }

    const inputSpan = useRef<HTMLSpanElement>(document.createElement('span'));
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
        }
    }

    const handleKeyup = (evt : any) => {
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
        <div className="flex flex-1 flex-col max-w-4xl rounded-lg px-6 pb-6">
            <div className="break-all whitespace-normal flex-1 flex flex-col p-5 bg-gray-200 shadow-md">
                <span 
                    ref={inputSpan}
                    contentEditable={true}
                    placeholder="I left my camera on in my 300 person lecture while I..." 
                    className="leading-6 break-all whitespace-normal break-text text-2xl flex-1 px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none w-full"/>
                <div className="relative flex flex-row">
                    <div className={`absolute -top-0.5 left-0 font-bold text-md ${inputLength > 280 ? 'text-red-500' : 'text-gray-800'}`}>
                        {`${inputLength}/280`}
                    </div>
                    <div>
                        <button
                        className="w-6 h-6 cursor-pointer bg-black"
                        onClick={() => writeUserData(inputSpan.current.innerHTML, 'test@usc.edu')}
                        >
                            
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SubmissionBox;