import React, {
    FC,
    useState
} from 'react';
import HomeHeader from '../Home/HomeHeader';
import GoogleLogin from 'react-google-login';
import WhiteGoogleLogo from '../../resources/images/home/glogo.png';
import axios from 'axios';
import { Redirect } from 'react-router';

import { useCookies } from 'react-cookie';


interface GLoginProps {
    setTokenObj: (x : string) => void
}

const GLogin : FC<GLoginProps> = ({
    setTokenObj
} : GLoginProps) => {

    // const [firstName, setFirstName] = useState<string>('');
    // const [lastName, setLastName] = useState<string>('');
    // const [email, setEmail] = useState<string>('');
    // const [imageUrl, setImageUrl] = useState<string>('');
    // const [googleId, setGoogleId] = useState<string>('');


    const responseGoogle = (res : any) => {
        setTokenObj(res.tokenId);
    }

    return (
        <>
        <GoogleLogin
                clientId="672847048149-cqlgs1ultc184pqoqebbtuja0fktiv4j.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                    <div className="flex pb-4">
                        <button
                        className="outline-none flex-1 m-2 p-2 rounded-md shadow-md bg-red-400"
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
            {/* {
                email === 'brash@usc.edu' ?
                    <Redirect to="/admin/dashboard"/>
                : null
            } */}
        </>
    )
}

const Login : FC = () => {

    const [tokenObj, setTokenObj] = useState<string>('');
    const [cookies, setCookie] = useCookies(['jwt_token']);
    const [isAuthed, setIsAuthed] = useState<boolean>(false);

    const attemptLogin = async () => {

        console.log('abbout to login')

        const res = await axios({
            method: 'post',
            url: `http://localhost:5000/api/login/`,
            headers: {
                id_token: tokenObj
            }
        })

        console.log(res);

        if (res.status === 200){
            setCookie('jwt_token', res.data, {
                sameSite: true
            })
            console.log('just set da cookie)');
            setIsAuthed(true);
        }
        else {
            console.log('error with jwt stop trying to be admin lol');
        }
    }

    return (
        <div className="flex flex-col h-screen w-screen justify-start">
            <HomeHeader />
            <div className="max-w-md mx-auto my-auto flex justify-center flex-col items-center">
                <GLogin 
                    setTokenObj={setTokenObj}
                />

                <button 
                className="w-20 bg-red-500 py-0.5 rounded-md shadow-md focus:outline-none"
                onClick={() => attemptLogin()}
                >
                    <div className="font-bold text-xl text-white">
                        Login
                    </div>
                </button>
            </div>
            {
                isAuthed ? 
                    <Redirect to={{
                    pathname: "/admin/dashboard",
                    // state: { from: location }
                  }}/> : null
            }
        </div>
    )
}

export default Login;