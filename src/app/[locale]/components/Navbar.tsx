import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { useTranslations } from 'next-intl';
import { LocalSwitcher } from './local-switcher';
import { MenuItem } from 'primereact/menuitem';
import { PanelMenu } from 'primereact/panelmenu';

export const Navbar: React.FC = () => {
    const t = useTranslations('Navbar');
    const [isHovered, setIsHovered] = useState<boolean>(true);

    const items: MenuItem[] = [
        {
            id: '01',
            label: t('Spaces'),
            icon: 'pi pi-globe',
            template: (item) => <NavItem isHovered={isHovered} item={item} />,
            command: () => {},
        },
        {
            id: '02',
            label: t('My account'),
            icon: 'pi pi-user',
            className: 'mt-1',
            template: (item) => <NavItem isHovered={isHovered} item={item} />,
            command: () => {},
        },
        {
            id: '06',
            label: t('Log out'),
            icon: 'pi pi-sign-out',
            className: 'text-red-500',
            template: (item) => <NavItem isHovered={isHovered} item={item} />,
            command: () => {},
        },
    ];

    useEffect(() => {
        if (isHovered) {
            const timeoutId = setTimeout(() => {
                setIsHovered(false);
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [isHovered]);

    return (
        <div
            style={{ width: isHovered ? '21.4rem' : '7rem' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative rounded-md"
        >
            <div
                className={`flex flex-col fixed h-full gap-6 p-4 bg-white shadow-sm rounded-md z-50 items-center`}
            >
                <div
                    className={`flex flex-col h-full gap-6 w-fit ${isHovered && 'min-w-60'}`}
                >
                    <Logo isHovered={isHovered} />
                    <PanelMenu
                        model={items}
                        className={`flex flex-col w-full`}
                    />
                </div>
                <LocalSwitcher isHovered={isHovered} />
            </div>
        </div>
    );
};
