import React, {
    FC,
} from 'react';
import Tinder from '../Tinder'
import RouteWrapper from './RouteWrapper';

const TinderRoute : FC = () => {

    return (
        <RouteWrapper Theme={Tinder}/>
    )
}

export default TinderRoute;