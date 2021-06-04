import React, {
    FC,
    useState
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

const LargeScreenMenu = () => {
    return (
        <div className="hidden md:flex flex-row">
            <HeaderLink title={'Home'} path="/"/>
            <HeaderLink title={'Confessions'} path="/confessions/"/>
            <div className="flex mx-1">
                <a className="cursor-pointer flex px-2 justify-center content-center flex-1 transition duration-400 ease-in-out shadow-none hover:shadow-lg rounded-md"
                href={`https://www.instagram.com/usctrojanconfessions/`}>
                    <div className="my-auto text-center text-white text-xl">
                        {'Instagram'}
                    </div>
                </a>
            </div>
            <HeaderLink title={'Anonymity'} path="/anonymity/"/>
            <HeaderLink title={'About'} path="/about/"/>
        </div>
    )
}

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
)

interface MobileMenuTextProps {
    title: string,
    path: string
}

const MobileMenuText : FC<MobileMenuTextProps>= ({
    title,
    path
} : MobileMenuTextProps) => {
    return (
        <Link className="h-10 cursor-pointer flex px-2 justify-center content-center flex-1 transition duration-400 ease-in-out shadow-none hover:shadow-lg rounded-md"
            to={path}>
            <div className="font-bold text-white text-2xl">
                {title}
            </div>
        </Link>
    )
}

const HomeHeader : FC = () => {

    const [isDropped, setIsDropped] = useState<boolean>(false);

    const toggleDropDown = () => {
        setIsDropped(!isDropped);
    }

    return (
        <div className="h-auto">

            {/* Red Banner */}
            <div className="z-10 relative flex flex-col bg-red-500 p-2 shadow-md">
                <div className="flex flex-1 flex-row space-x-2 justify-between items-center">

                    <div className="h-10 w-10">
                        <Logo />
                    </div>

                    <LargeScreenMenu />

                    <div className="flex justify-center items-center block md:hidden text-white">
                        <button className="focus:outline-none"
                        onClick={() => toggleDropDown()}
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Invisible div that grows in height for dropdown */}
            <div className={`z-0 relative w-full transition-height duration-500 ease-in-out ${isDropped ? 'h-50' : 'h-0'}`}>
                {/* Dropdown for mobile that is absolute*/}
                <div className="z-0 w-full absolute bottom-0 bg-red-500 w-10 h-auto">
                    <MobileMenuText title={'Home'} path="/"/>
                    <MobileMenuText title={'Confessions'} path="/confessions/"/>
                    <a className="h-10 cursor-pointer flex px-2 justify-center content-center flex-1 transition duration-400 ease-in-out shadow-none hover:shadow-lg rounded-md"
                    href={`https://www.instagram.com/usctrojanconfessions/`}>
                        <div className="font-bold text-white text-2xl">
                        {'Instagram'}
                    </div>
                    </a>
                    <MobileMenuText title={'Anonymity'} path="/anonymity/"/>
                    <MobileMenuText title={'About'} path="/about/"/>

                </div>
            </div>

            <div className="relative w-full">
                
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