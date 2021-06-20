import React, {
    FC, ReactChild
} from 'react';
import HomeHeader from '../Home/HomeHeader';
import { Link } from 'react-router-dom';


interface HeaderProps {
    text: string
}

const Header : FC<HeaderProps> = ({
    text
} : HeaderProps) => {
    return (
        <div className="font-bold text-4xl text-white">
            {text}
        </div>
    )
}

interface BorderWrapperProps {
    children: ReactChild
}

const BorderWrapper : FC<BorderWrapperProps> = ({
    children
} : BorderWrapperProps) => {
    return (
        <div className="max-w-2xl shadow-md rounded-md bg-red-400 p-2 m-2">
            {children}
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

interface SubtextProps {
    text : ReactChild
}

const Subtext : FC<SubtextProps> = ({
    text
} : SubtextProps) => {
    return (
        <div className="text-lg text-gray-600 flex flex-row">
            <RightCaret />
            {text}
        </div>
    )
}

const RightCaret = () => {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
        </div>

    )
}

const Divider = () => {
    return (
        <div className="bg-gradient-to-r h-0.5 w-full from-red-400">

        </div>
    )
}

interface QnAProps {
    q: string,
    a: ReactChild
}

const QnA : FC<QnAProps> = ({
    q, a
} : QnAProps) => {
    return (
        <div className="max-w-2xl w-full flex flex-col justify-left items-left">
            <HeaderTwo text={q}/>
            <Divider />
            <Subtext text={a}/>
        </div>
    )
}

const About = () => {
    return (
        <div className="w-screen">
            <HomeHeader />
            <div className="flex flex-1 justify-center items-center flex-col space-y-8 p-4">

                {/* Spacer */}
                <div className="h-0"></div>
                
                <QnA 
                    q={'Who runs this site?'}
                    a={'I\'m a computer science student at USC'}
                />

                <QnA 
                    q={'Are submissions 💯% anonymous?'}
                    a={
                        <div>
                            See <Link className="font-bold" to={'/anonymity/'}>Anonymity</Link>
                        </div>
                    }
                />

                <QnA 
                    q={'How did you make this website?'}
                    a={
                        <div className="flex flex-col justify-left">
                            <div>
                                Front End: <a className="font-bold" href={'https://reactjs.org/'}>React</a> + <a href={'https://tailwindcss.com/'} className="font-bold">Tailwind</a>
                            </div>
                            <div>
                                Back End: <a className="font-bold" href={'https://expressjs.com/'}>Express</a> + <a className="font-bold" href={'https://firebase.google.com/'}>Firebase</a>
                            </div>
                            <div>
                                Database: <a className="font-bold" href={'https://firebase.google.com/'}>Firebase</a>
                            </div>
                            <div>
                                Hosting: <a className="font-bold" href={'https://www.heroku.com/'}>Heroku</a>
                            </div>
                        </div>
                    }
                />
                
            </div>
        </div>
    )
}

export default About;