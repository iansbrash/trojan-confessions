import React, {
    FC
} from 'react';
import { Link } from 'react-router-dom';


interface HeaderLinkProps {
    title: string,
    path: string,
}

const HeaderLink : FC<HeaderLinkProps> = ({title, path} : HeaderLinkProps) => {
    return (
        <div className="flex mx-1">
            <Link className="cursor-pointer flex px-2 justify-center content-center flex-1 transition duration-400 ease-in-out shadow-none hover:shadow-lg rounded-md"
            to={path}>
                <div className="my-auto text-center text-white text-xl">
                    {title}
                </div>
            </Link>
        </div>
    )
}

const HomeHeader : FC = () => {
    return (
        <div className="flex flex-row bg-red-500 p-2 shadow-md">
            <div className="flex-1 flex flex-row space-x-2 justify-between">
                <div className="h-10 w-10">
                    <Logo />
                </div>
                <div className="flex flex-row">
                    <HeaderLink title={'Home'} path="/"/>
                    <HeaderLink title={'Confessions'} path="/confessions/"/>
                    <HeaderLink title={'Anonomity'} path="/anonimity/"/>
                    <HeaderLink title={'About'} path="/about/"/>
                </div>
            </div>
        </div>
    )
}

const Logo : FC = () => {
    return (
        <div className="h-10 flex">
            <Link className="flex-1 bg-red-500 rounded-md shadow-md"
            to="/admin/login/">

            </Link>
        </div>
    )
}

export default HomeHeader;