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
    timestamp: number,
    submission: string,
    hashedId: string
}

const Confession : FC<ConfessionProps> = ({
    timestamp,
    submission,
    hashedId
} : ConfessionProps) => {
    return (
        <>
            <div className="my-4">
                <div className="leading-7 break-words font-bold text-2xl text-gray-500">
                    {timestamp}
                </div>
                <div className="leading-6 break-words text-2xl text-gray-500">
                    {submission}
                </div>
            </div>
            <Spacer />
        </>
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

const ConfessionsFeed : FC = () => {


    const [confessions, setConfessions] = useState<object[]>([]);

    
    useEffect(() => {
        var recentPostsRef = firebase.database().ref('submissions');

        recentPostsRef.on('value', snapshot => {
            if (snapshot.exists()){
                console.log('snapshot exists in ConfFeed!');
                console.log(snapshot.val());

                setConfessions(Object.values(snapshot.val()));
            }
        });

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
        <div className="bg-gray-200 rounded-lg px-5 shadow-sm">
            <div className="font-bold text-4xl text-gray-700">
                Live Feed
            </div>
            {
                confessions.map((confObj : any) => (
                    <Confession 
                        submission={confObj.submission} 
                        timestamp={confObj.timestamp} 
                        hashedId={confObj.hashedId} />
                ))
            }
        </div>
    )
}

export default ConfessionsFeed;