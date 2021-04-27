import React, {
    FC
} from 'react';


interface SignatureFieldProps {
    placeholder: string
    svg: any,
    datalistArray: string[],
     
}

const SignatureField : FC<SignatureFieldProps> = ({
    placeholder,
    svg,
    datalistArray
} : SignatureFieldProps) => {
    return (
        <div className="flex flex-row space-x-2">
            <div className="mt-2">
                {svg}
            </div>
            <input 
            list={placeholder}
            placeholder={placeholder}
            className="bg-gray-200 my-2 text-2xl z-10 leading-6 break-all whitespace-normal break-text text-2xl flex-1 placeholder-gray-400 text-gray-700 relative rounded border-0 outline-none focus:outline-none w-full text-left"    
            >

            </input>
            <datalist id={placeholder}>
                {datalistArray.map(dl => <option value={dl} />)}
            </datalist>

        </div>
        
    )
}

const GradCapSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
    )
}

const HomeSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    )
}

const LibrarySvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
    )
}

const LocationSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    )
}

const MapSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
    )
}

const OfficeBuildingSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    )
}

const PlusSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    )
}

const AddIdentifiers : FC = () => {

    const LocationArray : string[] = [
        'Lorenzo',
        'Gateway',
        'Shrine',
        'Icon',
        'Victory',
        'West',
        
        // On Campus Housing Freshman
        'Birnkrant',
        'New North',
        'McCarthy',
        'Pardee',
        'Fluor',

        // On Campus Sophomores
        'Village Housing'
    ];

    const SchoolArray : string[] = [
        'Marshall',
        'Viterbi',
        'Annenberg',
        'Dornsife',
        'Roski',
        'Architecture',
        'Iovine and Young',
        'SCA', // School of Cinematic Arts
        'Kaufman', // Dance
        'Davis',
        'Keck',
        'Thorton',
        'Pharmacy',
        'Price'
    ];

    const GreekLifeArray : string[] = [
        'Sigma Nuts',
        'Pike Spikes',
        'Teeck'
    ];

    const GraduationYearArray : string[] = [
        'Freshman',
        'Sophomore',
        'Junior',
        'Senior',
        'Alumnus'
    ];



    return (
        <div className="mb-4">
            <div className="relative">
                <div className="absolute top-3 -right-2">
                    <div className="flex flex-col justify-center content-center bg-red-400 rounded-md shadow-md">
                        <button className="focus:outline-none text-center font-bold text-xl text-white">
                            <PlusSvg />
                        </button>
                    </div>
                </div>
            </div>
            <div className="font-bold text-4xl text-gray-700 mb-2">
                Add a Signature
            </div>
            <div className="z-0 flex flex-col -mt-2">
                <SignatureField 
                    placeholder={'Location'} 
                    svg={<LocationSvg/>}
                    datalistArray={LocationArray}
                />
                <SignatureField 
                    placeholder={'School'} 
                    svg={<OfficeBuildingSvg/>}
                    datalistArray={SchoolArray}
                />
                <SignatureField 
                    placeholder={'Fraternity'} 
                    svg={<LibrarySvg/>}
                    datalistArray={GreekLifeArray}
                />
                <SignatureField 
                    placeholder={'Year'} 
                    svg={<GradCapSvg/>}
                    datalistArray={GraduationYearArray}
                />
            </div>
        </div>
    )
}

export default AddIdentifiers;