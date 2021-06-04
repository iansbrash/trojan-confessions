import React, {
    FC,
    useState,
    useEffect
} from 'react';
import axios from 'axios';

import LoadingIndicator from './LoadingIndicator';



interface ConfessionProps {
    timestamp: string,
    submission: string,
    hashedId: string,
    signature: SignatureProps,
    tags: string[]
}

interface SignatureProps {
    location: string,
    school: string,
    fraternity: string,
    year: string
}

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

const Confession : FC<ConfessionProps> = ({
    timestamp,
    submission,
    hashedId,
    signature,
    tags
} : ConfessionProps) => {

    const {
        location,
        school,
        fraternity,
        year
    } = signature;

    return (
        <div className="my-4">
            <div className="leading-7 break-all font-bold text-2xl text-gray-500">
                {new Date(timestamp).toISOString().substring(0, 10)}
            </div>
            <div className="leading-6 break-all text-2xl text-gray-500">
                {submission}
            </div>
            <div className="flex flex-row flex-wrap mt-2 -mx-2">
                <FeedTag color={'bg-red-800'} text={location}/>
                <FeedTag color={'bg-red-700'} text={school}/>
                <FeedTag color={'bg-red-600'} text={fraternity}/>
                <FeedTag color={'bg-red-500'} text={year}/>
                {
                    tags.map(tag => <FeedTag color={'bg-red-400'} text={tag === '' ? '' : `#${tag}`}/> )
                }
            </div>
        </div>
    )
}

const Spacer : FC = () => {
    return (
        <div className="my-2 flex">
            <div className="flex-1 mx-2 h-0.5 bg-gray-300">

            </div>
        </div>
    )
}

const SpacerNoLine : FC = () => {
    return (
        <div className="my-2 flex">
            <div className="flex-1 mx-2 h-0.5">

            </div>
        </div>
    )
}

const ConfessionsFeed : FC = () => {

    const [confessions, setConfessions] = useState<object[]>([]);
    const [loadingPosts, setLoadingPosts] = useState<boolean>(false);

    const fetchConfessions = async () : Promise<any> => {
        setLoadingPosts(true);

        var config : object = {
            method: 'get',
            url: '/api/confessions/',
            headers: {
                lastkey: '',
                amount: 10
            }
        };

        try {
            const res = await axios(config)

            // @ts-ignore
            setConfessions(Object.values(res.data).sort((a,b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0)));
        }
        catch (err) {
            console.error(err);
        }

        setLoadingPosts(false);
    }

    useEffect(() => {
        console.log(`in useEffect()`)
        fetchConfessions();

        return (() => {
            // some cleanup here ?
        });
    }, []);

    return (
        <div>
            <div className="font-bold text-4xl text-gray-700">
                Live Feed
            </div>
            {loadingPosts
            ?
                <div className="flex justify-center my-4">
                    <LoadingIndicator size={12}/>
                </div>
            :
                null
            }
            <div>
                {
                    confessions.map((confObj : any, i : number) => (
                        <>
                            <Confession
                                submission={confObj.content}
                                timestamp={confObj.timestamp}
                                hashedId={confObj.hashedId}
                                signature={confObj.signature} 
                                tags={confObj.tags.split(',')}
                            />

                            {i !== confessions.length - 1 ? <Spacer /> : <SpacerNoLine/>}
                        </>
                    ))
                }
            </div>


        </div>
    )
}

export default ConfessionsFeed;