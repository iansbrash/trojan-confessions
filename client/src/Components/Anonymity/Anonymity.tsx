import React, {
    FC
} from 'react';
import HomeHeader from '../Home/HomeHeader';



const Divider = () => {
    return (
        <div className="bg-gradient-to-r h-0.5 w-full from-red-400">

        </div>
    )
}

interface HeaderTwoProps {
    text: string
}

const HeaderTwo : FC<HeaderTwoProps> = ({
    text
} : HeaderTwoProps) => {
    return (
        <div className="text-gray-700 text-4xl font-bold">
            {text}
        </div>
    )
}

const TommyGmail = () => {
    return (
        <div className="flex justify-center items-center my-4">
            <div className="py-2 px-2 flex-shrink flex bg-gray-200 rounded-md shadow-md">
                <div className="flex flex-row p-2 rounded-lg bg-gray-100 shadow-md">
                    <div className="mx-1 my-1 h-20 w-20 bg-gray-200 rounded-3xl">
                        <img alt="" className="object-contain h-20 w-20 rounded-3xl shadow-md" src={"https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"}/>
                    </div>
                    <div className="flex flex-1 flex-col px-3">
                        <div className="-mb-3 text-left font-bold text-4xl text-gray-600">
                            Tommy Trojan
                        </div>
                        <div className="text-left text-2xl text-gray-500">
                            ttrojan@usc.edu
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SmallDivider = () => {
    return (
        <div className="my-2 flex flex-row justify-center items-center">
            <div className="h-0.5 bg-gradient-to-r from-transparent to-gray-300 w-1/2">
            </div>
            <div className="h-0.5 bg-gradient-to-r from-gray-300 w-1/2">
            </div>
        </div>
        
    )
}

const Anonymity : FC = () => {
    return (
        <div className="w-screen">
            <HomeHeader />
            <div className="mt-8 flex flex-col justify-center items-center">
                <div className="p-4 flex-col max-w-2xl w-full justify-left">
                    <HeaderTwo text={'How is this completely anonymous?'}/>
                    <Divider />

                    <div className="text-xl text-gray-600">
                        You might've noticed you have to sign in with your <span className="font-bold">@usc.edu</span> email to submit a confession. What's up with that?
                    </div>

                    <TommyGmail />

                    <div className="text-xl text-gray-600">
                        We require you to sign in with your <span className="font-bold">@usc.edu</span> email as a measure to both prevent spam, and to ensure only USC students can submit confessions.
                    </div>

                    <SmallDivider />

                    <div className="text-xl text-gray-600">
                        Logins are handled directly through <a href={'https://developers.google.com/identity/protocols/oauth2'} className="font-bold">Google's OAuth 2.0 API</a>, so we do not have access to your password or any other sensitive information.
                    </div>

                    <SmallDivider />

                    <div className="text-xl text-gray-600">
                        After logging in and upon submitting a confession, the following data is sent to our back-end server:
                    </div>
                    <div className="mx-10 my-5">
                        <div className="p-2 rounded-md shadow-md border border-gray-500">
                            <ul className="text-xl text-gray-700">
                                <li><span className="font-bold">content:</span> your submission as plain text</li>
                                <li><span className="font-bold">tags:</span> any tags you added</li>
                                <li><span className="font-bold">theme:</span> the theme you selected</li>
                                <li><span className="font-bold">location:</span> location, if you added one</li>
                                <li><span className="font-bold">school:</span> school, if you added one</li>
                                <li><span className="font-bold">fraternity:</span> fraternity, if you added one</li>
                                <li><span className="font-bold">year:</span> year, if you added one</li>
                                <li><span className="font-bold">hashedid:</span> THIS WILL PROBABLY BE REMOVED</li>
                                <li><span className="font-bold">id_token:</span> the token (a long string of numbers and letters) Google's OAuth 2.0 API provides to us when you log in.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-xl text-gray-600">
                        As you can see, seven of the eight data fields sent to our back-end server were created by you. The last one, <span className="font-bold">id_token</span>, allows us to make sure someone with a USC email really did make this submission. 
                    </div>

                    <SmallDivider />

                    <div className="text-xl text-gray-600">
                        This <span className="font-bold">id_token</span> is discarded after it is used to verify the legitimacy of the submission request, and is exchanged for a <span className="font-bold">hashedId</span>, which is a random string of numbers and letters generated by a <span className="font-bold">hashing algorithm</span>.
                    </div>

                    <SmallDivider />

                    <div className="text-xl text-gray-600">
                        The <span className="font-bold">hashedId</span> prevents our servers from being spammed while simultaneously keeping users anonymous. Each user has a <span className="font-bold">hashedId</span> associated with them, which is generated based on a set of account-specific parameters. 
                    </div>

                    <SmallDivider />

                    <div className="text-xl text-gray-600">
                        When recieving a submission, our back-end checks that any given hashedId hasn't submitted more than once within an hour. The important part is it is impossible to find any given account's information given the <span className="font-bold">hashedId</span>, which means even in a data breach, there is zero identifying information at risk.
                    </div>

                    <SmallDivider />

                    <div className="text-xl text-gray-600">
                        After validating the submission without any errors, we add the submission to two different databases, both of which are completely devoid of any identifying information. We even discard the <span className="font-bold">hashedId</span> because we don't need it anymore. And that is where our journey ends.
                    </div>

                    
                </div>
                
            </div>
        </div>
    )
}

export default Anonymity;