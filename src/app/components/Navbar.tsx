import React, { useState } from 'react';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { MenuItem } from 'primereact/menuitem';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';
// import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
    // const router = useRouter();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const items: MenuItem[] = [
        {
            id: '01',
            label: 'Site 1',
            icon: 'pi pi-globe',
            template: (item) => <NavItem isHovered={isHovered} item={item} />,
            command: () => {},
        },
        {
            id: '02',
            label: 'Site 2',
            icon: 'pi pi-globe',
            template: (item) => <NavItem isHovered={isHovered} item={item} />,
            command: () => {},
        },
        {
            id: '02',
            label: 'Se déconnecter',
            icon: 'pi pi-sign-out',
            className: 'text-red-500 mt-1',
            template: (item) => <NavItem isHovered={isHovered} item={item} />,
            command: () => {},
        },
    ];

    return (
        <div
            style={{ width: isHovered ? '23rem' : '5rem' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative rounded-md"
        >
            <div
                className={`flex flex-col fixed h-full gap-6 w-fit ${isHovered && 'min-w-72'} p-4 bg-white shadow-sm rounded-md z-50 items-center`}
            >
                <Logo isHovered={isHovered} />

                <div className="flex flex-col gap-2 items-start">
                    <Button
                        size="small"
                        icon="pi pi-plus"
                        label={isHovered ? 'Ajouter une site' : undefined}
                        outlined
                        className="w-full"
                    />
                    {!isHovered ? (
                        <Button
                            size="small"
                            severity="secondary"
                            icon="pi pi-search"
                            text
                        />
                    ) : (
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search " />
                            <InputText
                                placeholder="Rechercher"
                                className="p-inputtext-sm w-full"
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </IconField>
                    )}
                </div>
                <PanelMenu model={items} className={`flex flex-col w-full`} />
            </div>
        </div>
    );
};
