import React, {
    FC,
} from 'react';
import {
    RouteComponentProps
} from 'react-router-dom';
// import IMessage from '../iMessage'
import RouteWrapper from './RouteWrapper';
import ThemeRenderer from '../../AdminLogin/ThemeRenderer';
import ThemeProps from '../ThemeProps';
import queryString from 'query-string';
import { useLocation } from 'react-router';

/**
 *  The idea here is that we use match.params.theme
 *  and pass that to ThemeRenderer and take in the props here
 */



type TParams = { theme: string };

const CatchallRoute = ({
    match
} : RouteComponentProps<TParams>) => {

    const { search } = useLocation();

    // @ts-ignore
    const themeProps : ThemeProps = queryString.parse(search);


    return (
        <RouteWrapper>
            <ThemeRenderer 
                theme={match.params.theme}
                themeprops={{
                    confessionInput: themeProps.confessionInput,
                    location: themeProps.location,
                    school: themeProps.school,
                    fraternity: themeProps.fraternity,
                    year: themeProps.year,
                    tags: themeProps.tags,
                    timestamp: themeProps.timestamp,
                    dark: queryString.parse(search).dark === 'true'
                }}
            />
        </RouteWrapper>
    )
}

export default CatchallRoute;