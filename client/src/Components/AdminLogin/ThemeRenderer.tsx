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
                />
            )
        case "zoom":
            return (
                <Zoom 
                    {...themeprops}
                />
            )
        case "email":
            return (
                <Email 
                    {...themeprops}
                />
            )
        case "tinder":
            return (
                <Tinder 
                    {...themeprops}
                />
            )
        case "twitter":
            return (
                <Twitter 
                    {...themeprops}
                />
            )
        case "snapchat":
            return (
                <Snapchat 
                    {...themeprops}
                />
            )
        case "notes":
            return (
                <Notes 
                    {...themeprops}
                />
            )
    default:
        return <div className="font-bold text-2xl">Error!</div>;
    }
}

export default ThemeRenderer;