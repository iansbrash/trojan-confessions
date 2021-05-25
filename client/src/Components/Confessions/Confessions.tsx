import React, {
    FC,
    useEffect,
    useState
} from 'react';
import HomeHeader from '../Home/HomeHeader'
import axios from 'axios';
import LoadingIndicator from '../Home/LoadingIndicator';


interface FeedTagProps {
    text: string,
    color: string
}

const FeedTag : FC<FeedTagProps> = ({
    text,
    color
} : FeedTagProps) => {

    if (text === ''){
        return null;
    }

    return (
        <div className="p-0.5 transform transition duration-400 ease-in-out hover:scale-105">
            <button className={`focus:outline-none ${color} transition duration-400 ease-in-out shadow-md hover:shadow-lg rounded-md`}>
                <div className="text-white font-bold text-md mx-2 my-0.5 text-center">
                    {text}
                </div>
            </button>
        </div>
        
    )
}

interface SignatureProps {
    fraternity: string,
    location: string,
    school: string,
    year: string
}

interface ConfessionProps {
    content: string,
    hashedId: string,
    signature: SignatureProps,
    tags: string[],
    theme: string,
    timestamp: string
}

const Confession : FC<ConfessionProps> = ({
    content,
    hashedId,
    signature,
    tags,
    theme,
    timestamp
} : ConfessionProps) => {

    const {
        location,
        school,
        fraternity,
        year
    } = signature;

    return (
        <div className="p-4 w-96 bg-gray-200 shadow-md rounded-md">
            <div className="leading-7 break-all font-bold text-2xl text-gray-500">
                {new Date(timestamp).toISOString().substring(0, 10)}
            </div>
            <div className="leading-6 break-all text-2xl text-gray-500">
                {content}
            </div>
            <div className="flex flex-row flex-wrap mt-2 -mx-2">
                <FeedTag color={'bg-red-800'} text={location}/>
                <FeedTag color={'bg-red-700'} text={school}/>
                <FeedTag color={'bg-red-600'} text={fraternity}/>
                <FeedTag color={'bg-red-500'} text={year}/>
                {
                    tags.map(tag => <FeedTag color={'bg-red-400'} text={tag === '' ? '' : `#${tag}`} /> )
                }
            </div>
        </div>
    )
}

const Confessions : FC = () => {

    const [confessions, setConfessions] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        (async () => {
            const res = await axios({
                method: 'get',
                url: '/api/confessions/',
                headers: { }
            })

            console.log(res.data);

            setConfessions(res.data);

            setLoading(false);
        })();

        return () => {

        }
    }, [])


    return (
        <div className="w-screen">
            <HomeHeader />

            {
                loading ? 
                <div className="mt-10 w-screen flex justify-center items-center">
                    <LoadingIndicator size={20}/>
                </div>
                
                : null
            }

            <div className="mt-4 w-screen flex flex-col justify-center items-center">
                
                {/* Maybe a lil sorting action */}

                {/* Actual confessions */}
                <div className="gap-4 grid grid-cols-2 flex flex-col">
                    <div className="flex flex-col space-y-4">
                        {
                            confessions.map((subObj : any, i : number) => i % 2 !== 0 ? null :
                                // <div className="w-full">
                                    <Confession 
                                        content={subObj.content}
                                        hashedId={subObj.hashedId}
                                        signature={subObj.signature}
                                        tags={subObj.tags.split(',')}
                                        theme={subObj.theme}
                                        timestamp={subObj.timestamp}
                                    />
                                // </div>
                            )
                        }
                    </div>
                    <div className="flex flex-col space-y-4">
                        {
                            confessions.map((subObj : any, i : number) => i % 2 === 0 ? null :
                                // <div className="w-full">
                                <>
                                    <Confession 
                                        content={subObj.content}
                                        hashedId={subObj.hashedId}
                                        signature={subObj.signature}
                                        tags={subObj.tags.split(',')}
                                        theme={subObj.theme}
                                        timestamp={subObj.timestamp}
                                    />
                                </>
                                // </div>
                            )
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Confessions;