import React, {
    FC
} from 'react';
import ThemeProps from '../Preview/ThemeProps';
import IMessage from '../Preview/iMessage';
import Zoom from '../Preview/Zoom';
import Email from '../Preview/Email';
import Tinder from '../Preview/Tinder';
import Twitter from '../Preview/Twitter';


interface ThemeRendererProps {
    theme: string
    themeprops: ThemeProps
}

const ThemeRenderer : FC<ThemeRendererProps> = ({
    theme,
    themeprops
} : ThemeRendererProps) => {

    const {
        confessionInput,
        location,
        school,
        fraternity,
        year,
        tags
    } = themeprops;
    
    switch (theme) {
        case "imessage":
            return (
                <IMessage 
                    confessionInput={confessionInput}
                    location={location}
                    school={school}
                    fraternity={fraternity}
                    year={year}
                    tags={tags}
                />
            )
        case "zoom":
            return (
                <Zoom 
                    confessionInput={confessionInput}
                    location={location}
                    school={school}
                    fraternity={fraternity}
                    year={year}
                    tags={tags}
                />
            )
        case "email":
            return (
                <Email 
                    confessionInput={confessionInput}
                    location={location}
                    school={school}
                    fraternity={fraternity}
                    year={year}
                    tags={tags}
                />
            )
        case "tinder":
            return (
                <Tinder 
                    confessionInput={confessionInput}
                    location={location}
                    school={school}
                    fraternity={fraternity}
                    year={year}
                    tags={tags}
                />
            )
        case "twitter":
            return (
                <Twitter 
                    confessionInput={confessionInput}
                    location={location}
                    school={school}
                    fraternity={fraternity}
                    year={year}
                    tags={tags}
                />
            )
    default:
        return <div className="font-bold text-2xl">Error!</div>;
    }
}

export default ThemeRenderer;