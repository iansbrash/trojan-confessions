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

const onImagesLoaded = (container : any, event : Function) => {
    var images = container.getElementsByTagName("img");
    var loaded = images.length;

    console.log(`images.length: ${images.length}`)

    for (var i = 0; i < images.length; i++) {
        if (images[i].complete && images[i].naturalHeight !== 0) {
            console.log(`image[${i}] is complete already`)
            loaded--;
        }
        else {
            // images[i].addEventListener("load", function() {
            //     console.log(`loaded! ${loaded}`)
            //     loaded--;
            //     if (loaded == 0) {
            //         return event();
            //     }
            // });
            images[i].onload = () => {
                loaded--;
                if (loaded == 0){
                    event();
                }
            }
        }
        if (loaded == 0) {
            return event();
        }
    }
}

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
        
        (async () => {
            await setTimeout(() => {
                onImagesLoaded(document.getElementsByTagName("body")[0], function() {
                    htmlToImage.toPng(document.getElementById('submission')!)
                    .then(function (dataUrl) {
                        setb64(dataUrl);
                    });
                });
            }, 1000)
        })();

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