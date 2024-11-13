import React from 'react';
import { Button } from 'primereact/button';

export const Logo: React.FC = () => {
    return (
        <Button text className="flex flex-row gap-4 items-end w-full">
            <span className="pi pi-shop text-2xl" />
            <p className="text-gray-900 font-semibold">Shophub</p>
        </Button>
    );
};
