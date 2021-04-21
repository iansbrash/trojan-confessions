import React, {
    FC,
    useState,
    useEffect,
    useRef
} from 'react';
import GoogleLogin from 'react-google-login';
import WhiteGoogleLogo from './glogo.png';

enum loginState {
    Default,
    Success,
    Failure
};

interface LoginStateVisualizerProps {
    lstate: loginState,
    email: string
}



const LoginStateVisualizer : FC<LoginStateVisualizerProps> = ({lstate, email} : LoginStateVisualizerProps) => {

    const [notiClassList, setNotiClassList] = useState<string>('wiggle relative m-2 p-2 bg-red-500 rounded-md shadow-md');

    useEffect(() => {

        if (lstate === loginState.Failure){
            // setNotiClassList('transition-opacity delay-2000 duration-1000 ease-in-out opacity-100 relative m-2 p-2 bg-red-500 rounded-md shadow-md')
        }
        else {
            // setNotiClassList('transition-opacity delay-2000 duration-1000 ease-in-out opacity-0 relative m-2 p-2 bg-red-500 rounded-md shadow-md');
        }
    
    }, [lstate]);

    if (lstate === loginState.Default){
        return (
            null
        )
    }
    else if (lstate === loginState.Success){
        return (
            null
        )
    }
    else {
        return (
            <div className={notiClassList}>
                <div className="z-0 absolute left-0 right-0 -top-2 flex justify-center">
                    <div className="transform rotate-45 bg-red-500 h-4 w-4">

                    </div>
                </div>
                <div className="z-10 break-words text-xl text-white">
                    Please use an <b>@usc.edu</b> email.
                </div>
            </div>
        )
    }
}


const GmailLogin : FC<ActionsProps> = ({
    firstName,
    lastName,
    email,
    imageUrl,
    setFirstName,
    setLastName,
    setEmail,
    setImageUrl
} : ActionsProps) => {

    

    
    const [containsUsc, setContainsUsc] = useState<loginState>(loginState.Default);
    const [googleId, setGoogleId] = useState<string>('');


    useEffect(() => {
        console.log('useEffect loading')
        console.log(`containsUsc: ${containsUsc}`)

        return (() => {
            console.log('useEffect unloading');
        });
    }, [containsUsc]);


    const responseGoogle = (res : any) => {
        const { 
            email,
            familyName,
            givenName,
            googleId,
            imageUrl,
            name
        } = res.profileObj;

        const containsUniversityEmail = email.includes('@usc.edu');

        if (containsUniversityEmail){
            // funnilly enough we use 0 for true here
            setContainsUsc(loginState.Success);
            setFirstName(givenName);
            setLastName(familyName);
            setEmail(email);
            setGoogleId(googleId);
            setImageUrl(imageUrl);
        }
        else {
            setContainsUsc(loginState.Failure);
            setFirstName('');
            setLastName('');
            setEmail(email);
            setGoogleId('');
            setImageUrl('');
        }

        
    }

    return (
        <div>
            <GoogleLogin
                clientId="672847048149-cqlgs1ultc184pqoqebbtuja0fktiv4j.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                    <div className="flex pb-4">
                        <button 
                        className="flex-1 m-2 p-2 rounded-md shadow-md bg-red-400"
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled}
                        >
                            <div className="flex flex-row h-6 justify-center content-center space-x-2">
                                <div className="text-lg font-bold text-white">
                                    Login With Google
                                </div>
                                <img className="object-contain self-auto" src={WhiteGoogleLogo}/>
                            </div>
                        </button>
                    </div>
                    
                )}
            />
            <div className="relative">
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <LoginStateVisualizer 
                        lstate={containsUsc}
                        email={email}/>
                </div>
            </div> 
        </div>
    )
}

interface ActionsProps {
    firstName: string,
    lastName: string,
    email: string,
    imageUrl: string,
    setFirstName: (fname : string) => void,
    setLastName: (fname : string) => void,
    setEmail: (fname : string) => void,
    setImageUrl: (fname : string) => void
}

const Actions : FC<ActionsProps> = ({
    firstName,
    lastName,
    email,
    imageUrl,
    setFirstName,
    setLastName,
    setEmail,
    setImageUrl
} : ActionsProps) => {
    return (
        <>
            <div className="font-bold text-4xl text-gray-700">
                Login
            </div>
            <GmailLogin 
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
            />
            
        </>

    )
}

export default Actions;