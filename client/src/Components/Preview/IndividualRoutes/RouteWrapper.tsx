import React, {
    FC,
    ReactChild,
    ReactComponentElement,
    useEffect,
    useState
} from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import ThemeProps from '../ThemeProps';
import * as htmlToImage from 'html-to-image';

interface RouteWrapperProps {
    Theme: FC<ThemeProps>
}

const RouteWrapper : FC<RouteWrapperProps> = ({
    Theme
} : RouteWrapperProps) => {

    const { search } = useLocation();

    // ?confessionInput=asd&location=tusc&school=viterbi&fraternity=sigmaballs&year=freshman&tags[]=one&tags[]=2
    // http://localhost:3000/preview/imessage?confessionInput=asd&location=tusc&school=viterbi&fraternity=sigmaballs&year=freshman&tags[]=one&tags[]=2
    // @ts-ignore
    const themeProps : ThemeProps = queryString.parse(search);
    const [b64, setb64] = useState<string>('');

    useEffect(() => {
        htmlToImage.toPng(document.getElementById('submission')!)
        .then(function (dataUrl) {
            setb64(dataUrl);
        });
    }, [search])


    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <div id="submission" className="w-96 h-96">
                <Theme 
                    confessionInput={themeProps.confessionInput}
                    location={themeProps.location}
                    school={themeProps.school}
                    fraternity={themeProps.fraternity}
                    year={themeProps.year}
                    tags={themeProps.tags}
                    timestamp={themeProps.timestamp}
                />
            </div>

            {/* Textarea */}
            <div className="mt-10">
                {
                    b64 === '' ? null :
                        <textarea 
                        id="b64"
                        value={b64} />
                }
            </div>
        </div>
    )
}

export default RouteWrapper;