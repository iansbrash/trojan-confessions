import React, {
    FC,
} from 'react';
import Notes from '../Notes'
import RouteWrapper from './RouteWrapper';

const NotesRoute : FC = () => {
    return (
        <RouteWrapper Theme={Notes}/>
    )
}

export default NotesRoute;