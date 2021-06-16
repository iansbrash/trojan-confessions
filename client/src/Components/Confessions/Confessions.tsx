import React, {
    FC,
    useEffect,
    useState
} from 'react';
import HomeHeader from '../Home/HomeHeader'
import axios from 'axios';
import LoadingIndicator from '../Home/LoadingIndicator';
import InfiniteScroll from 'react-infinite-scroller';

// for filters
import { useLocation, useParams } from 'react-router';
import queryString from 'query-string';


interface FeedTagProps {
    text: string,
    color: string,
    filter: string,
    setFilter: (f : string[]) => void,
    isTag?: boolean
}

const FeedTag : FC<FeedTagProps> = ({
    text,
    color,
    filter,
    setFilter,
    isTag
} : FeedTagProps) => {

    if (text === ''){
        return null;
    }

    const whenIncludes = (p : string[]) => {
        console.log('in whenIncludes');
        return p;
    }

    const doesntInclude = (p : string[]) => {
        console.log('in doesntInclude');
        // let refresh = 
        //     window.location.protocol + 
        //     "//" + 
        //     window.location.host + 
        //     window.location.pathname + 
        //     (window.location.search ? window.location.search : "?") +  
        //     `${filter}=${isTag ? text.substring(1) : text}&`;

        // @ts-ignore
        const url = new URL(window.location);

        // if (url.searchParams.has(filter)){
            // console.log('has!')

            // TEMP... THAT OVERRIDES. CANT FILTER FOR MULTIPLES RN BC OF BUG
            url.searchParams.set(filter, isTag ? text.substring(1) : text);
        // }
        // else {
            // console.log(`hasn't!`)
            // url.searchParams.set(filter, isTag ? text.substring(1) : text);
        // }
        console.log(`url:`)
        console.log(url.href)

        window.history.pushState({}, '', url.href.toString())

        return [...p, isTag ? text.substring(1) : text];
    }

    const onClick = () => {

        

        // @ts-ignore
        setFilter(prevFilter => {
            if (prevFilter.includes(isTag ? text.substring(1) : text)) {
                return whenIncludes(prevFilter)
            }
            else {
                return doesntInclude(prevFilter)
            }
        })
    }

    return (
        <div className="p-0.5 transform transition duration-400 ease-in-out hover:scale-105">
            <button className={`focus:outline-none ${color} transition duration-400 ease-in-out shadow-md hover:shadow-lg rounded-md`}
            onClick={() => onClick()}
            >
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
    timestamp: string,
    setLocation: (l : string[]) => void,
    setSchool: (l : string[]) => void,
    setFratenity: (l : string[]) => void,
    setYear: (l : string[]) => void,
    setTag: (l : string[]) => void
}

const Confession : FC<ConfessionProps> = ({
    content,
    hashedId,
    signature,
    tags,
    theme,
    timestamp,
    setLocation,
    setSchool,
    setFratenity,
    setYear,
    setTag
} : ConfessionProps) => {

    const {
        location,
        school,
        fraternity,
        year
    } = signature;

    return (
        <div className="p-4 m-2 flex-1 bg-gray-200 shadow-md rounded-md">
            <div className="leading-7 break-all font-bold text-2xl text-gray-500">
                {new Date(timestamp).toISOString().substring(0, 10)}
            </div>
            <div className="leading-6 break-all text-2xl text-gray-500">
                {content}
            </div>
            <div className="flex flex-row flex-wrap mt-2 -mx-2">
                <FeedTag color={'bg-red-800'} text={location} filter={'location'} setFilter={setLocation}/>
                <FeedTag color={'bg-red-700'} text={school} filter={'school'} setFilter={setSchool}/>
                <FeedTag color={'bg-red-600'} text={fraternity} filter={'fraternity'} setFilter={setFratenity}/>
                <FeedTag color={'bg-red-500'} text={year} filter={'year'} setFilter={setYear}/>
                {
                    tags.map((tag, i) => <FeedTag key={tag} isTag={true} color={'bg-red-400'} text={tag === '' ? '' : `#${tag}`} filter={'tag'} setFilter={setTag}/> )
                }
            </div>
        </div>
    )
}

interface FilterProps {
    content: string
    location: string,
    school: string,
    fraternity: string,
    year: string,
    tags: string[]
}

interface FilterInterfaceProps {
    contentFilter: string,
    setContentFilter: (c : string) => void,
    locationFilter: string[],
    setLocationFilter: (l : string[]) => void,
    schoolFilter: string[],
    setSchoolFilter: (s : string[]) => void,
    fraternityFilter: string[],
    setFraternityFilter: (f : string[]) => void,
    yearFilter: string[],
    setYearFilter: (y : string[]) => void,
    tagFilter: string[],
    setTagFilter: (t : string[]) => void,
    addFilterOn: boolean,
    setAddFilterOn: (f : boolean) => void
}

const FilterInterface : FC<FilterInterfaceProps> = ({
    contentFilter,
    setContentFilter,
    locationFilter,
    setLocationFilter,
    schoolFilter,
    setSchoolFilter,
    fraternityFilter,
    setFraternityFilter,
    yearFilter,
    setYearFilter,
    tagFilter,
    setTagFilter,
    addFilterOn,
    setAddFilterOn
} : FilterInterfaceProps) => {

    return (
        <div className="my-3 flex justify-center items-center flex-col">
            <div className="flex-wrap flex flex-row justify-start items-center">
                {
                    contentFilter ? 'content' : null
                }
                <button className="flex flex-row justif-center items-center focus:outline-none m-2 px-2 py-1 font-bold text-2xl text-gray-700 bg-gray-200 rounded-md transform transition duration-400 ease-in-out shadow-md hover:shadow-lg hover:scale-105"
                onClick={() => setAddFilterOn(!addFilterOn)}>
                    Add Filter
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
                <FilterMapper 
                    tagHook={locationFilter}
                    setTagHook={setLocationFilter}
                    bgColor={'bg-red-800'}
                    tagName={'location'}
                />
                <FilterMapper 
                    tagHook={schoolFilter}
                    setTagHook={setSchoolFilter}
                    bgColor={'bg-red-700'}
                    tagName={'school'}

                />
                <FilterMapper 
                    tagHook={fraternityFilter}
                    setTagHook={setFraternityFilter}
                    bgColor={'bg-red-600'}
                    tagName={'fraternity'}

                />
                <FilterMapper 
                    tagHook={yearFilter}
                    setTagHook={setYearFilter}
                    bgColor={'bg-red-500'}
                    tagName={'year'}

                />
                <FilterMapper 
                    tagHook={tagFilter}
                    setTagHook={setTagFilter}
                    bgColor={'bg-red-400'}
                    tagName={'tag'}
                />
                {/* Appears when we toggle 'Add Filter' */}
                <div className={`transition-opacity duration-400 ease-in-out ${addFilterOn ? 'opacity-1' : 'opacity-0'} h-12 flex flex-row justify-start items-center`}>
                    <FilterSelector 
                        filter={locationFilter}
                        setFilter={setLocationFilter}
                        filterName={'location'}
                        bgColor={'bg-red-800'}
                    />
                    <FilterSelector 
                        filter={schoolFilter}
                        setFilter={setSchoolFilter}
                        filterName={'school'}
                        bgColor={'bg-red-700'}
                    />
                    <FilterSelector 
                        filter={fraternityFilter}
                        setFilter={setFraternityFilter}
                        filterName={'fraternity'}
                        bgColor={'bg-red-600'}
                    />
                    <FilterSelector 
                        filter={yearFilter}
                        setFilter={setYearFilter}
                        filterName={'year'}
                        bgColor={'bg-red-500'}
                    />
                    <FilterSelector 
                        filter={tagFilter}
                        setFilter={setTagFilter}
                        filterName={'tag'}
                        bgColor={'bg-red-400'}
                    />
                </div>
            </div>
        </div>
    )
}

interface FilterSelectorProps {
    filter: string[],
    setFilter: (s : string[]) => void,
    filterName: string,
    bgColor: string
}

const FilterSelector : FC<FilterSelectorProps> = ({
    filter,
    setFilter,
    filterName,
    bgColor
} : FilterSelectorProps) => {

    const filterDisplayName = filterName.substring(0, 1).toUpperCase() + filterName.substring(1);
    const [selection, setSelection] = useState<string>(filterDisplayName);

    // this is because we can only select one filte right now
    if (filter.length !== 0) {
        return null;
    }


    const handleChange = (e : any) => {
        if (e.target.value === 'None'){
            setFilter([]);
        }
        else {
            setFilter([e.target.value]);
        }
        setSelection(e.target.value)
    }

    // if (false) {
    //     return (
    //         <select value={selection} onChange={(e) => handleChange(e)} className={`${selection === 'None' ? 'text-gray-400' : ''} text-2xl mt-2 appearance-none bg-gray-200 focus:outline-none`}>
    //             <option className="text-gray-400" value={`None`}>None</option>
    //             {datalistArray.map(item => <option className="text-black" value={item}>{item}</option>)}
    //         </select>
    //     )
    // }

    const datalistArray = ['one', 'two', 'three']

    return (
        <div className={`flex flex-row justify-center items-center text-white font-bold rounded-md shadow-md px-2 py-1 ${bgColor}`}>
            <select value={selection} onChange={(e) => handleChange(e)} className={`${bgColor} border-0 font-bold appearance-none focus:outline-none`}>
                <option className="text-white" value={filterDisplayName}>{filterDisplayName}</option>
                {datalistArray.map(item => <option className=" font-bold text-white" value={item}>{item}</option>)}
            </select>
            {/* {filterDisplayName} */}
        </div>
    )
}

interface FilterMapperProps {
    tagHook: string[],
    setTagHook: (x : string[]) => void,
    bgColor: string,
    tagName: string
}

const FilterMapper : FC<FilterMapperProps> = ({
    tagHook,
    setTagHook,
    bgColor,
    tagName
} : FilterMapperProps) => {
    return (
        <div className="flex flex-row space-x-4">
            {
                tagHook.map(
                    tag => 
                        <TagDisplay 
                            tag={tag}
                            tagHook={tagHook}
                            setTagHook={setTagHook}
                            bgColor={bgColor}
                            key={tag}
                            tagName={tagName}
                        />
                )
            }
        </div>
    )
}

interface TagDisplayProps {
    tag: string,
    tagHook: string[],
    setTagHook: (s : string[]) => void,
    bgColor: string,
    tagName: string
}

const TagDisplay : FC<TagDisplayProps> = ({
    tag,
    tagHook,
    setTagHook,
    bgColor,
    tagName
} : TagDisplayProps) => {

    const removeSelf = () => {

        // @ts-ignore
        const url = new URL(window.location);

        url.searchParams.delete(tagName);

        window.history.pushState({}, '', url.href);

        // @ts-ignore
        setTagHook(prevTags => {
            console.log('prevtags:')
            console.log(`isArray: ${Array.isArray(prevTags)} and ${prevTags}`)

            // @ts-ignore
            return prevTags.filter(t => t !== tag);
        })
    }

    

    return (
        <button className="focus:outline-none"
        onClick={() => removeSelf()}
        >
            <div className={`flex flex-row justify-center items-center text-white font-bold rounded-md shadow-md px-2 py-1 ${bgColor}`}>
                {tag}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                
            </div>
        </button>
    )
}

const Confessions : FC = () => {

    const [confessions, setConfessions] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [lastkey, setLastkey] = useState<string>('');
    const [hasMore, setHasMore] = useState<boolean>(true);
    const { search } = useLocation();
    // const location = useLocation();
    //@ts-ignore
    const {content,location,school,fraternity,year,tag
    } = useParams();

    // filters
    const [contentFilter, setContentFilter] = useState<string>('');
    const [locationFilter, setLocationFilter] = useState<string[]>([]);
    const [schoolFilter, setSchoolFilter] = useState<string[]>([]);
    const [fraternityFilter, setFraternityFilter] = useState<string[]>([]);
    const [yearFilter, setYearFilter] = useState<string[]>([]);
    const [tagFilter, setTagFilter] = useState<string[]>([]);

    const [addFilterOn, setAddFilterOn] = useState<boolean>(false);


    const wtf = {
        content: setContentFilter,
        location: setLocationFilter,
        school: setSchoolFilter,
        fraternity: setFraternityFilter,
        year: setYearFilter,
        tag: setTagFilter
    }



    // @ts-ignore
    const filterProps : FilterProps = queryString.parse(search);

    console.log('filterprops')
    console.log(filterProps)

    const loadConfession = async () => {

        // amount of posts we want to load at a time
        const amount = 20;

        const res = await axios({
            method: 'get',
            url: '/api/confessions/',
            headers: {
                lastkey: lastkey,
                amount: amount
            }
        })

        //@ts-ignore
        setConfessions([...confessions, ...(Object.values(res.data).sort((a,b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0)))]);

        const lastIndex = Object.values(res.data).length - 1;

        //@ts-ignore
        setLastkey(Object.keys(res.data)[0])

        if (res.headers.hasmore === 'false'){
            console.log('res.headers.hasMore === false');
            setHasMore(false);
        }

        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);

        loadConfession();

        // let refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?tag=one&tag=tne';

        // window.history.pushState({path: refresh}, '', refresh)

        return () => {

        }
    }, [])


    useEffect(() => {

        console.log('search ypdates')


        let newqs = queryString.parse(search);

        Object.keys(newqs).forEach(key => {
            console.log(key)

            // @ts-ignore
            wtf[key](Array.isArray( newqs[key] ) ? newqs[key] : [newqs[key]]); 
        })

        
        return () => {
            
        }
    }, [content, location, school, year, tag, fraternity])

    const filterAbstracter = (array : string[], lookingFor : string) => {
        if (array.length === 0) return true;
        return array.includes(lookingFor);
    }

    const applyFilter = (confObj : any) => {
        const {
            // content,
            // hashedId,
            signature,
            tags,
            // timestamp
        } = confObj;

        const {
            location,
            school,
            fraternity,
            year
        } = signature;

        console.log('in filter');
        return (
            filterAbstracter(locationFilter, location) &&
            filterAbstracter(schoolFilter, school) &&
            filterAbstracter(fraternityFilter, fraternity) &&
            filterAbstracter(yearFilter, year) &&
            filterAbstracter(tagFilter, tags)
        )
    }


    return (
        <div className="w-screen">
            <HomeHeader />
            <div className="mt-4 w-screen flex flex-col justify-center items-center">
                {/* Actual confessions */}
                <InfiniteScroll
                    pageStart={0}
                    // Why do I have to do the below lmao
                    // This is to fix double-loading of very last item in database
                    loadMore={() => hasMore ? loadConfession() : null}
                    hasMore={hasMore}
                    loader={
                        <div className="mt-5 justify-center items-center flex">
                            <LoadingIndicator size={20}/>
                        </div>
                    }
                    className="w-full flex justify-center items-center flex-col"
                >
                    <div className="max-w-4xl flex flex-col w-full m-4 justify-center items-center">

                        {/* Filter */}
                        <div className="w-full flex justify-start items-start">
                            <FilterInterface 
                                contentFilter={contentFilter}
                                setContentFilter={setContentFilter}
                                locationFilter={locationFilter}
                                setLocationFilter={setLocationFilter}
                                schoolFilter={schoolFilter}
                                setSchoolFilter={setSchoolFilter}
                                fraternityFilter={fraternityFilter}
                                setFraternityFilter={setFraternityFilter}
                                yearFilter={yearFilter}
                                setYearFilter={setYearFilter}
                                tagFilter={tagFilter}
                                setTagFilter={setTagFilter}
                                addFilterOn={addFilterOn}
                                setAddFilterOn={setAddFilterOn}
                            />
                        </div>
                        {/* Confessions */}
                        <div className="w-full">

                            {/* Single Column for small devices */}
                            <div className="flex flex-col block md:hidden">
                                {
                                    confessions.filter(confObj => applyFilter(confObj)).map((subObj : any, i : number) => {
                                        return (
                                            <div className="w-full">
                                                <Confession
                                                    key={(i).toString()} 
                                                    content={subObj.content}
                                                    hashedId={subObj.hashedId}
                                                    signature={subObj.signature}
                                                    tags={subObj.tags.split(',')}
                                                    theme={subObj.theme}
                                                    timestamp={subObj.timestamp}
                                                    setLocation={setLocationFilter}
                                                    setSchool={setSchoolFilter}
                                                    setFratenity={setFraternityFilter}
                                                    setYear={setYearFilter}
                                                    setTag={setTagFilter}
                                                />
                                        </div>)
                                    })
                                }
                            </div>

                            {/* Double column for bigger devices */}
                            <div className="hidden md:flex flex-row w-full">
                                <div className="w-1/2 flex flex-col">
                                    {
                                        confessions.filter(confObj => applyFilter(confObj)).map((subObj : any, i : number) => {
                                            // console.log(subObj);
                                            if (i % 2 === 0){
                                                return <Confession
                                                    key={(i * 2).toString()} 
                                                    content={subObj.content}
                                                    hashedId={subObj.hashedId}
                                                    signature={subObj.signature}
                                                    tags={subObj.tags.split(',')}
                                                    theme={subObj.theme}
                                                    timestamp={subObj.timestamp}
                                                    setLocation={setLocationFilter}
                                                    setSchool={setSchoolFilter}
                                                    setFratenity={setFraternityFilter}
                                                    setYear={setYearFilter}
                                                    setTag={setTagFilter}
                                                />
                                            }
                                            return null;
                                        })
                                    }
                                </div>
                                <div className="w-1/2 flex flex-col">
                                    {
                                        confessions.filter(confObj => applyFilter(confObj)).map((subObj : any, i : number) => {
                                            // console.log(subObj);
                                            if (i % 2 !== 0){
                                                return <Confession 
                                                    key={(i * 2 + 1).toString()} 
                                                    content={subObj.content}
                                                    hashedId={subObj.hashedId}
                                                    signature={subObj.signature}
                                                    tags={subObj.tags.split(',')}
                                                    theme={subObj.theme}
                                                    timestamp={subObj.timestamp}
                                                    setLocation={setLocationFilter}
                                                    setSchool={setSchoolFilter}
                                                    setFratenity={setFraternityFilter}
                                                    setYear={setYearFilter}
                                                    setTag={setTagFilter}
                                                />
                                            }
                                            return null;
                                        })
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </InfiniteScroll>

                
            </div>
        </div>
    )
}

export default Confessions;