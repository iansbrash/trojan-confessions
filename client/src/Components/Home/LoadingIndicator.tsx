import React, {
    FC
} from 'react';

interface LoadingIndicatorProps {
    size: string | number,
};

const LoadingIndicator : FC<LoadingIndicatorProps> = ({
    size,
} : LoadingIndicatorProps) => {
    return (
        <div 
            className={`animate-spin h-${size} w-${size} loader ease-linear rounded-full border-8 border-t-8 border-gray-300`}
        style={{
            borderTopColor: '#9CA3AF'
        }}>
        </div>
    )
};

export default LoadingIndicator;