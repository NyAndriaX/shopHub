import React from 'react';
import { useWindow } from '../hooks/useWindow';
import { Avatar } from 'primereact/avatar';

export const Users: React.FC = () => {
    const { isDesktop } = useWindow();
    return (
        <div className="flex flex-row gap-4 items-center">
            {isDesktop && <p className="text-gray-700 text-base">John Doe</p>}

            <Avatar
                image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                shape="circle"
                className={`${isDesktop ? 'size-10' : 'size-12'} border-2 border-gray-200`}
            />
        </div>
    );
};
