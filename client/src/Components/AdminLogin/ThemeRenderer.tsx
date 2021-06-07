import React, {
    FC
} from 'react';
import ThemeProps from '../Preview/ThemeProps';
import IMessage from '../Preview/iMessage';
import Zoom from '../Preview/Zoom';
import Email from '../Preview/Email';
import Tinder from '../Preview/Tinder';
import Twitter from '../Preview/Twitter';
import Snapchat from '../Preview/Snapchat';
import Notes from '../Preview/Notes';



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
        tags,
        timestamp
    } = themeprops;

    console.log('Rerendering ThemeRenderer: theme value: ' + theme)
    
    switch (theme) {
        case "imessage":
            return (
                <IMessage 
                    {...themeprops}
                    // confessionInput={decodeURIComponent(confessionInput)}
                />
            )
        case "zoom":
            return (
                <Zoom 
                    {...themeprops}
                    // confessionInput={decodeURIComponent(confessionInput)}
                />
            )
        case "email":
            return (
                <Email 
                    {...themeprops}
                    // confessionInput={decodeURIComponent(confessionInput)}
                />
            )
        case "tinder":
            return (
                <Tinder 
                    {...themeprops}
                    // confessionInput={decodeURIComponent(confessionInput)}
                />
            )
        case "twitter":
            return (
                <Twitter 
                    {...themeprops}
                    // confessionInput={decodeURIComponent(confessionInput)}
                />
            )
        case "snapchat":
            return (
                <Snapchat 
                    {...themeprops}
                    // confessionInput={decodeURIComponent(confessionInput)}
                />
            )
        case "notes":
            return (
                <Notes 
                    {...themeprops}
                    // confessionInput={decodeURIComponent(confessionInput)}
                />
            )
    default:
        return <div className="font-bold text-2xl">Error!</div>;
    }
}

export default ThemeRenderer;