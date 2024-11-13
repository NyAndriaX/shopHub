import React from 'react';
import { Button } from 'primereact/button';

interface LogoProps {
    isHovered: boolean;
}

export const Logo: React.FC<LogoProps> = ({ isHovered }) => {
    return (
        <Button
            size="small"
            text
            className="flex flex-row gap-4 items-end w-full"
        >
            <span className="pi pi-shop text-2xl" />
            {isHovered && (
                <p className="text-gray-900 font-semibold">Shophub</p>
            )}
        </Button>
    );
};
