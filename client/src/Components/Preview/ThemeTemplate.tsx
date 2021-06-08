import React, {
    FC,
} from 'react';
import ThemeProps from './ThemeProps';
import generateSignature from './generateSignature';
import AppleEmojifier from './AppleEmojifier';

const ThemeTemplate : FC<ThemeProps> = ({
    confessionInput,
    location,
    school,
    fraternity,
    year,
    tags
} : ThemeProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-end h-96 w-96 bg-black shadow-md">
                
            </div>
        </div>
    )
}

// export default ThemeTemplate;