import React from 'react';
import { Avatar } from 'primereact/avatar';

export const Users: React.FC = () => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <p className="text-gray-700 text-sm">John Doe</p>
            <Avatar
                image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                shape="circle"
                className="size-10 border-2 border-gray-200"
            />
        </div>
    );
};
