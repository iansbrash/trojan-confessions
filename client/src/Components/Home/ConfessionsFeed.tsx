import React, {
    FC,
    useState,
    useEffect
} from 'react';
import firebase from 'firebase';

// var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// starCountRef.on('value', (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });

// OR read data 'once' with { get }



interface ConfessionProps {
    timestamp: string,
    submission: string,
    hashedId: string
}

const Confession : FC<ConfessionProps> = ({
    timestamp,
    submission,
    hashedId
} : ConfessionProps) => {
    return (
        <div className="my-4">
            <div className="leading-7 break-all font-bold text-2xl text-gray-500">
                {new Date(timestamp).toISOString().substring(0, 10)}
            </div>
            <div className="leading-6 break-all text-2xl text-gray-500">
                {submission}
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
        setLoadingPosts(true)
        let recentPostsRef = firebase.database().ref('submissions');

        await recentPostsRef.limitToLast(10).on('value', snapshot => {
            if (snapshot.exists()){
                console.log('snapshot exists in ConfFeed!');
                console.log(snapshot.val());

                const toSet : any[] = Object.values(snapshot.val()).reverse();

                setConfessions(toSet);
            }
            setLoadingPosts(false);
        })

    }

    useEffect(() => {

        fetchConfessions();

        return (() => {
            // some cleanup here ?
        })
    }, [])

    // let tempConfArr = [
    //     {
    //         date: 'feb 10',
    //         confession: 'i ate andy cruz`s ass and it was fucking distusgintg. do not reocmmend whatsoever'
    //     },
    //     {
    //         date: '4/20',
    //         confession: 'rohan kalra robbed me at gunpoiint. he is my roomate. we are no longer on good terms because of this occurence'
    //     },
    //     {
    //         date: 'january 69',
    //         confession: 'justin childress told me that asian lives do not matter. although i agree, i think he could have been more tactful because i am one fifth asian (i am japaneez)'
    //     }
    // ]

    return (
        <div>
            <div className="font-bold text-4xl text-gray-700">
                Live Feed
            </div>
            {loadingPosts
            ?
                <>
                    <div className="animate-spin h-5 w-5 mr-3" >
                        Loading Posts
                    </div>
                </>
            :
                null
            }
            <div>
                {
                    confessions.map((confObj : any, i : number) => (
                        <>
                            <Confession
                                submission={confObj.submission}
                                timestamp={confObj.timestamp}
                                hashedId={confObj.hashedId} />

                            {i !== confessions.length - 1 ? <Spacer /> : <SpacerNoLine/>}
                        </>
                    ))
                }
            </div>


        </div>
    )
}

export default ConfessionsFeed;