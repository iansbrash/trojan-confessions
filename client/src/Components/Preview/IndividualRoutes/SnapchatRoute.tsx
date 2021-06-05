import React, {
    FC,
} from 'react';
import Snapchat from '../Snapchat'
import RouteWrapper from './RouteWrapper';

const SnapchatRoute : FC = () => {
    return (
        <RouteWrapper Theme={Snapchat}/>
    )
}

export default SnapchatRoute;