import React, {
    FC
} from 'react';

const Check : FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

interface SuccessPopupProps {
    submitted: boolean,
    setSubmitted: (s : boolean) => void
}

const SuccessPopup : FC<SuccessPopupProps> = ({
    submitted,
    setSubmitted
} : SuccessPopupProps) => {

    return (
        <div className={`z-40 transform transition duration-800 ease-in-out ${submitted ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'} absolute top-0 h-screen left-0 right-0 bg-white flex justify-center items-center flex-row`}>
            <div className="animate-bounce flex justify-center items-center flex-row">
                <button className="focus:outline-none bg-red-400 rounded-full shadow-md font-bold text-white text-xl"
                onClick={() => setSubmitted(false)}
                >
                    <Check />
                </button>
                <button className="focus:outline-none ml-4 font-bold text-4xl text-black"
                >
                    Success!
                </button>
            </div>
            

        </div>
    )
}


export default SuccessPopup;