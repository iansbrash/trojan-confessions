import React, {
    FC,
    useState
} from 'react';
import ThemeProps from './ThemeProps';
import generateSignature from './generateSignature';
import AppleEmojifier from './AppleEmojifier';

// Randoms
import ReplyUsersArray from './TwitterRandoms/ReplyUsers';
import ReplyCommentsArray from './TwitterRandoms/ReplyComments';


const Dot : FC = () => {
    return (
        <div className="text-xs text-gray-400 mx-1">
            •
        </div>
    )
}

interface DividerProps {
    dark: boolean
}

const Divider : FC<DividerProps> = ({
    dark
} : DividerProps) => {
    return (
        <div className="h-0.25 w-full my-1">
            <div className={`h-0.25 ${dm(dark)['divider-color']} mx-4`}>

            </div>
        </div>
    )
}

const LongerDivider : FC<DividerProps> = ({
    dark
} : DividerProps) => {
    return (
        <div className="h-0.25 w-full my-1">
            <div className={`h-0.25 ${dm(dark)['divider-color']}`}>

            </div>
        </div>
    )
}

interface IconProps {
    cName: string
}

const Share : FC<IconProps> = ({
    cName
} : IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
    )
}

const Retweet : FC<IconProps> = ({
    cName
} : IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    )
}

const Comment : FC<IconProps> = ({
    cName
} : IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
    )
}

const Like  : FC<IconProps> = ({
    cName
} : IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
    )
}

const Options = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
    )
}

const Buttons = () => {
    return (
        <div className="flex flex-row space-x-14">
            <Comment cName={'h-7 w-7'}/>
            <Retweet cName={'h-7 w-7'} />
            <Like cName={'h-7 w-7'} />
            <Share cName={'h-7 w-7'} />
        </div>
    )
};

interface TweetCommentProps {
    replyingTo: string,
    dark: boolean
};

const TweetComment : FC<TweetCommentProps>= ({
    replyingTo,
    dark
} : TweetCommentProps) => {

    const getUserByIndex = (i : number) => {
        return (
            ReplyUsersArray[
                Math.floor(
                    rand2 * 
                    (ReplyUsersArray.length - 0.000001))
                ]
            [i]
        );
    }

    const getCommentByIndex = () : string => {
        return (
            ReplyCommentsArray[
                Math.floor(
                    rand3 * 
                    (ReplyCommentsArray.length - 0.000001)
                )
            ]
        );
    }

    const rand = Math.random();

    const rand2 = Math.random();

    const rand3 = Math.random();

    const [isMin] = useState<boolean>(
        rand > 0.5 ? true : false
    );

    const [timeNumber] = useState<number>(
        rand > 0.5 ? (
            Math.round(Math.random() * 58) + 1
        ) : (
            Math.round(Math.random() * 22) + 1
        )
    )

    return (
        <div className="w-full flex flex-row justify-start mt-2">
            {/* Icon */}
            <div className="mt-1 h-12 w-12 ml-4 mr-2">
                <div className="h-12 w-12 rounded-full bg-white">

                </div>
            </div>

            {/* The Rest */}
            <div className="flex flex-col w-full">

                {/* Handle, @, Date, Options */}
                <div className="flex flex-row items-center">
                    {/* Handle */}
                    <div className={`font-bold text-md ${dm(dark)['text-color-handle']}`}>
                        {getUserByIndex(0)}
                    </div>

                    {/* @ */}
                    <div className={`ml-1.5 ${dm(dark)['text-color-at']}`}>
                        @{getUserByIndex(1)}
                    </div>

                    {/* Dot, need make smaller in general */}
                    <Dot />

                    {/* Time Ago */}
                    <div className="text-gray-400">
                        {isMin ? `${timeNumber}m` : `${timeNumber}h`}
                    </div>

                    {/* Options */}
                    <div className="absolute right-5 text-gray-300">
                        <Options />
                    </div>
                </div>

                {/* Replying to @name */}
                <div className="text-gray-400 -mt-1.5">
                    Replying to <span className="text-twitterlogoblue">@{replyingTo}</span>
                </div>

                {/* Tweet Comment */}
                <div className={`${dm(dark)['text-color-content']} break-words pr-4`}>
                    {getCommentByIndex()}
                </div>

                {/* Reply, RT, Like, Share Buttons */}
                <div className="text-gray-400 mt-0.5 flex flex-row justify-start">
                    <div className="w-16 mr-2 flex flex-row items-center justify-start">
                        <Comment cName={'h-5 w-5'}/>
                        <div className="ml-2 text-sm">
                            {Math.round(((3 ** 0) * Math.random() * 10))}
                        </div>
                    </div>
                    <div className="w-16 mr-2 flex flex-row items-center justify-start">
                        <Retweet cName={'h-5 w-5'}/>
                        <div className="ml-2 text-sm">
                            {Math.round(((6 ** 0) * Math.random() * 10))}
                        </div>
                    </div><div className="w-16 mr-2 flex flex-row items-center justify-start">
                        <Like cName={'h-5 w-5'}/>
                        <div className="ml-2 text-sm">
                            {Math.round(((10 ** 0) * Math.random() * 10))}
                        </div>
                    </div><div className="w-16 mr-2 flex flex-row items-center justify-start">
                        <Share cName={'h-5 w-5'}/>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

const Twitter : FC<ThemeProps> = ({
    confessionInput,
    location,
    school,
    fraternity,
    year,
    tags,
    dark
} : ThemeProps) => {

    enum Popularity {
        LOW,
        MEDIUM,
        HIGH,
        VIRAL
    }

    const twitterAt = 'firehelton220';

    const rand = Math.random();

    const popularity : Popularity = rand < 0.75 ? Popularity.LOW : (
        rand < 0.9 ? Popularity.MEDIUM : (
            rand < 0.99 ? Popularity.HIGH : Popularity.VIRAL
        )
    );

    const likes =  Math.round(((10 ** popularity) * Math.random() * 10));
    const retweets = Math.round(((5 ** popularity) * Math.random() * 10));
    const quoteTweets = Math.round(((5 ** popularity) * Math.random() * 5));


    return (
        <div className="flex justify-center items-center">
            <div className={`flex flex-col justify-start items-center h-96 w-96 ${dm(dark)['bg']} shadow-md`}>
                {/* People liked... */}
                <div className="flex flex-row justify-center items-center my-2">
                    <div className={`${dm(dark)['blank-liked-color']} mr-1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    
                    <div className={`text-md ${dm(dark)['blank-liked-color']}`}>
                        Zukoski and {Math.round(Math.random() * 10)} others liked
                    </div>
                </div>

                {/* Avi and @ */}
                <div className="flex flex-row items-start justify-start w-full">
                    <div className="flex flex-row items-start justify-start w-full">
                        {/* Avi */}
                        <div className="mt-1 h-12 w-12 ml-4 mr-2">
                            <div className="h-12 w-12 rounded-full bg-white">

                            </div>
                        </div>

                        {/* Handle and @ */}
                        <div className="flex flex-col justify-center h-14">
                            {/* Handle */}
                            <div className={`font-bold ${dm(dark)['text-color-handle']} -mb-1`}>
                                Anonymous {`Student`}
                            </div>
                            {/* @ */}
                            <div className={`${dm(dark)['text-color-at']} -mt-1`}>
                                @{twitterAt}
                            </div>
                        </div>
                    </div>
                    
                    {/* Options Button */}
                    <div className="h-14 flex justify-center items-center text-gray-300 mr-4">
                        <Options />
                    </div>
                </div>

                {/* Tweet */}
                <div className="flex justify-start flex-row w-full">
                    <div className={`flex flex-row flex-wrap m-4 ${dm(dark)['text-color-content']} text-lg`}>
                        <AppleEmojifier content={confessionInput}/>
                    </div>
                </div>

                

                {/* Timestamp, twitter for ________ */}
                <div className={`${dm(dark)['text-color-sub']} flex flex-row justify-start w-full items-center`}>
                    {/* Timestamp */}
                    <div className={`text-md ml-4`}>
                        {`4:39 AM`}
                    </div>

                    <Dot />

                    <div className="text-md">
                        {`4/30/21`}
                    </div>

                    <Dot />


                    {/* Twitter for */}
                    <div className="text-twitterlogoblue text-md mr-4">
                        Twitter for USC
                    </div>
                </div>

                <Divider dark={dark}/>

                {/* Retweets Quote Tweets Likes */}
                <div className={`${dm(dark)['text-color-sub']} flex flex-row justify-start w-full ml-8 space-x-2`}>
                    {/* Retweets */}
                    <div>
                        <span className={`font-bold ${dm(dark)['text-color-main-metrics']}`}>{retweets}</span> Retweets
                    </div>

                    {/* Quote Tweets */}
                    <div>
                        <span className={`font-bold ${dm(dark)['text-color-main-metrics']}`}>{quoteTweets}</span> Quote Tweets
                    </div>

                    {/* Likes */}
                    <div>
                        <span className={`font-bold ${dm(dark)['text-color-main-metrics']}`}>{likes}</span> Likes
                    </div>
                </div>

                <Divider dark={dark}/>

                {/* Comment, RT, Like, Share button */}
                <div className={`${dm(dark)['icon-color']}`}>
                    <Buttons />
                </div>

                {/* Need a wide divider */}
                <LongerDivider dark={dark}/>

                {/* Comments */}
                <TweetComment replyingTo={twitterAt} dark={dark}/>

            </div>
        </div>
    )
}

const dm = (dark: boolean) => {
    if (dark) return darkStyles;
    return lightStyles;
}

const darkStyles = {
    bg: 'bg-twitterblue',
    'text-color-handle': 'text-white',
    'text-color-main-metrics': 'text-gray-100',
    'text-color-content': 'text-gray-100',
    'text-color-at': 'text-gray-400',
    'text-color-sub': 'text-gray-400',
    'icon-color': 'text-gray-400',
    'divider-color': 'bg-gray-600',
    'blank-liked-color': 'text-gray-300'
}

const lightStyles = {
    bg: 'bg-white',
    'text-color-handle': 'text-black',
    'text-color-main-metrics': 'text-black',
    'text-color-content': 'text-black',
    'text-color-at': 'text-gray-500',
    'text-color-sub': 'text-gray-500',
    'icon-color': 'text-gray-400',
    'divider-color': 'bg-gray-400',
    'blank-liked-color': 'text-gray-500'
}

export default Twitter;