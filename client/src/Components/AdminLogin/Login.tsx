import React, {
    FC,
    useState
} from 'react';
import HomeHeader from '../Home/HomeHeader';
import GoogleLogin from 'react-google-login';
import WhiteGoogleLogo from '../../resources/images/home/glogo.png';

const GLogin : FC = () => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [googleId, setGoogleId] = useState<string>('');


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
            setFirstName(givenName);
            setLastName(familyName);
            setEmail(email);
            setGoogleId(googleId);
            setImageUrl(imageUrl);
        }
        else {
            setFirstName('');
            setLastName('');
            setEmail(email);
            setGoogleId('');
            setImageUrl('');
        }
    }

    return (
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
    )
}

const Login : FC = () => {
    return (
        <div className="flex flex-col h-screen w-screen">
            <HomeHeader />
            <div className="max-w-md mx-auto my-auto">
                <GLogin />
            </div>
        </div>
    )
}

export default Login;