import React, {
    FC
} from 'react';


const SignInWithEmail : FC<HowItWorksProps> = ({
    firstName,
    lastName,
    email,
    imageUrl
} : HowItWorksProps) => {
    return (
        <div>
            <div className="break-words text-2xl text-gray-500">
                Sign in with your <b>@usc.edu</b> email
            </div>
            <div className="py-4 px-2">
                <div className="flex flex-row p-2 rounded-lg bg-gray-100 shadow-md">
                    <div className="mx-1 my-1 h-20 w-20 bg-gray-200 rounded-3xl">
                        <img alt="" className="object-contain h-20 w-20 rounded-3xl shadow-md" src={email === '' || !email.includes('@usc.edu') ? "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png" : imageUrl}/>
                    </div>
                    <div className="flex flex-1 flex-col px-3">
                        <div className="-mb-3 text-left font-bold text-4xl text-gray-600">
                            {email === '' || !email.includes('@usc.edu') ? 'Tommy Trojan' : `${firstName} ${lastName}`}
                        </div>
                        <div className="text-left text-2xl text-gray-500">
                            {email === '' || !email.includes('@usc.edu') ? 'ttrojan@usc.edu' : email}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

interface HowItWorksProps {
    firstName: string,
    lastName: string,
    email: string,
    imageUrl: string
}

const HowItWorks : FC<HowItWorksProps> = ({
    firstName,
    lastName,
    email,
    imageUrl
} : HowItWorksProps) => {
    return (
        <div>
            <div className="font-bold text-4xl text-gray-700">
                How it works
            </div>
            <SignInWithEmail
                firstName={firstName}
                lastName={lastName}
                email={email}
                imageUrl={imageUrl}
            />
        </div>
    )
}

export default HowItWorks;