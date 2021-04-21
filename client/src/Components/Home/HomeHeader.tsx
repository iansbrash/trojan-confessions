import React, {
    FC
} from 'react';


interface HeaderLinkProps {
    title: string,
    path?: string,
}

const HeaderLink : FC<HeaderLinkProps> = ({title, path} : HeaderLinkProps) => {
    return (
        <div className="flex mx-1">
            <div className="cursor-pointer flex px-2 justify-center content-center flex-1 transition duration-400 ease-in-out shadow-none hover:shadow-lg rounded-md">
                <div className="my-auto text-center text-white text-xl">
                    {title}
                </div>
            </div>
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
                    <HeaderLink title={'Home'}/>
                    <HeaderLink title={'Instagram'}/>
                    <HeaderLink title={'Submit'}/>
                    <HeaderLink title={'About'}/>
                    <HeaderLink title={'Policy'}/>
                </div>
            </div>
        </div>
    )
}

const Logo : FC = () => {
    return (
        <div className="h-10 flex">
            <div className="flex-1 bg-red-500 rounded-md shadow-md">

            </div>
        </div>
    )
}

export default HomeHeader;