import React, {
    FC,
} from 'react';
import Email from '../Email'
import RouteWrapper from './RouteWrapper';

const EmailRoute : FC = () => {
    return (
        <RouteWrapper Theme={Email}/>
    )
}

export default EmailRoute;