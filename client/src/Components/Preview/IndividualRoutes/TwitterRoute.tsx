import React, {
    FC,
} from 'react';
import Twitter from '../Twitter'
import RouteWrapper from './RouteWrapper';

const TwitterRoute : FC = () => {
    return (
        <RouteWrapper Theme={Twitter}/>
    )
}

export default TwitterRoute;