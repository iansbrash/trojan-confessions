import React, {
    FC,
    useState,
    useEffect,
} from 'react';
import GoogleLogin from 'react-google-login';
import WhiteGoogleLogo from '../../resources/images/home/glogo.png';

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

    return (
        <div className={`transform-opacity duration-500 ease-in-out ${lstate === loginState.Failure ? 'opacity-1' : 'opacity-0'} relative m-2 p-2 bg-red-500 rounded-md shadow-md`}>
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


const GmailLogin : FC<ActionsProps> = ({
    firstName,
    lastName,
    email,
    imageUrl,
    id_token,
    setFirstName,
    setLastName,
    setEmail,
    setImageUrl,
    setId_token
} : ActionsProps) => {

    const [containsUsc, setContainsUsc] = useState<loginState>(loginState.Default);
    
    const [, setGoogleId] = useState<string>('');

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
            // name,
        } = res.profileObj;

        const {
            id_token
        } = res.tokenObj;

        console.log(res)

        

        const containsUniversityEmail = email.includes('@usc.edu');

        if (containsUniversityEmail){
            // funnilly enough we use 0 for true here
            setContainsUsc(loginState.Success);
            setFirstName(givenName);
            setLastName(familyName);
            setEmail(email);
            setGoogleId(googleId);
            setImageUrl(imageUrl);
            setId_token(id_token);
        }
        else {
            setContainsUsc(loginState.Failure);
            setFirstName('');
            setLastName('');
            setEmail(email);
            setGoogleId('');
            setImageUrl('');
            setId_token('');
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
                        className="focus:outline-none flex-1 m-2 p-2 rounded-md shadow-md bg-red-400"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        >
                            <div className="flex flex-row h-6 justify-center content-center space-x-2">
                                {/* <div className="text-lg font-bold text-white">
                                    Login With Google
                                </div> */}
                                <img alt="" className="object-contain self-auto" src={WhiteGoogleLogo}/>
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
    id_token: string,
    setFirstName: (fname : string) => void,
    setLastName: (fname : string) => void,
    setEmail: (fname : string) => void,
    setImageUrl: (fname : string) => void,
    setId_token: (fname : string) => void
}

const Actions : FC<ActionsProps> = ({
    firstName,
    lastName,
    email,
    imageUrl,
    id_token,
    setFirstName,
    setLastName,
    setEmail,
    setImageUrl,
    setId_token
} : ActionsProps) => {
    return (
        <div>
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
                id_token={id_token}
                setId_token={setId_token}
            />

        </div>

    )
}

export default Actions;