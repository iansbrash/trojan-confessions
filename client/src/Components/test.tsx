import React, {
    FC
} from 'react';


const FlexText : FC = () => {
    return (
        <div className="flex-1 inline-flex bg-red-400">
            <div className="transition duration-400 ease-in-out bg-red-400 hover:bg-red-500 rounded-lg flex-1 mx-2 my-2 font-bold text-white text-2xl">
                Test
            </div>
        </div>
    )
}

const Test : FC<any> = ({props}) => {
    return (
        <>
            <div className="flex">
                <FlexText />
                <FlexText />
                <FlexText />
                <FlexText />
                <FlexText />
                <FlexText />
            </div>
            <div className="mx-auto">
                <div className="shadow-md space-y-3 inline bg-red-100 mx-5 my-5 rounded-xl inline-flex flex-col px-3 py-3">
                    <div className="flex-1 font-bold font-bold text-2xl">
                        1). Login
                    </div>
                    <div className="flex-1 font-bold">
                        2). Write
                    </div>
                    <div className="flex-1 font-bold">
                        1). Submit
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <h1 className="font-bold text-2xl">Hello Tailwind</h1>
                <p className="my-5">Let's learn how to use this framework</p>
                <button
                    className="text-white font-bold bg-blue-700 hover:bg-blue-900 py-2 px-4 rounded">
                    Button!
                </button>
            </div>
        </>

    )
}

export default Test;