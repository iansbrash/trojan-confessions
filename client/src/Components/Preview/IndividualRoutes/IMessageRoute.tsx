import React, {
    FC,
} from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import IMessage from '../iMessage'
import ThemeProps from '../ThemeProps';

const IMessageRoute : FC = () => {

    const { search } = useLocation();

    // ?confessionInput=asd&location=tusc&school=viterbi&fraternity=sigmaballs&year=freshman&tags[]=one&tags[]=2

    // @ts-ignore
    const themeProps : ThemeProps = queryString.parse(search);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div id="submission" className="w-96 h-96">
                <IMessage 
                    confessionInput={themeProps.confessionInput}
                    location={themeProps.location}
                    school={themeProps.school}
                    fraternity={themeProps.fraternity}
                    year={themeProps.year}
                    tags={themeProps.tags}
                />
            </div>
        </div>
    )
}

export default IMessageRoute;