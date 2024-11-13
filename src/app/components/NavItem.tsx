import React from 'react';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';

interface NavItemProps {
    item: MenuItem;
    isHovered: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ item, isHovered }) => {
    if (!isHovered) {
        return (
            <Button
                size="small"
                severity="secondary"
                text
                icon={item.icon}
                className={`text-gray-900 bg-white ${item.className}`}
            />
        );
    }
    return (
        <Button
            size="small"
            severity="secondary"
            text
            className={`flex flex-row gap-4 w-full items-center text-gray-900 bg-white hover:bg-gray-100 rounded-md ${item.className}`}
        >
            <span
                className={`navitem-${item.id} ${item.icon}`}
                style={{ fontSize: '1rem' }}
            ></span>
            <span className="text-sm font-semibold">{item.label}</span>
        </Button>
    );
};
