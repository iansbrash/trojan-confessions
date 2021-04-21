import React, {
    FC,
    useState,
    useEffect
} from 'react';
import GoogleLogin from 'react-google-login';
import WhiteGoogleLogo from './glogo.png';

enum loginState {
    Default,
    Success,
    Failure
};

interface LoginStateVisualizerProps {
    lstate: loginState
}

const LoginStateVisualizer : FC<LoginStateVisualizerProps> = ({lstate} : LoginStateVisualizerProps) => {
    if (lstate === loginState.Default){
        return (
            null
        )
    }
    else if (lstate === loginState.Success){
        return (
            <div>
                success
            </div>
        )
    }
    else {
        return (
            <div>
                failure
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
            setEmail('');
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
                    <div className="flex">
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
            <LoginStateVisualizer lstate={containsUsc}/>

            
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
        <div className="bg-gray-200 rounded-lg px-5 shadow-sm">
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
            
        </div>

    )
}

export default Actions;