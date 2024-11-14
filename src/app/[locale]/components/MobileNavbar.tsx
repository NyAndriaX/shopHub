import React from 'react';
import { Button } from 'primereact/button';
import { useTranslations } from 'next-intl';
import { MenuItem } from 'primereact/menuitem';

export const MobileNavbar: React.FC = () => {
    const t = useTranslations('Navbar');

    const items: MenuItem[] = [
        {
            label: t('Home'),
            icon: 'pi pi-home',
            command: () => {},
        },
        {
            label: t('Addition'),
            icon: 'pi pi-plus',
            command: () => {},
        },
        {
            label: t('Billing'),
            icon: 'pi pi-credit-card',
            command: () => {},
        },
        {
            label: t('Browse'),
            icon: 'pi pi-list',
            command: () => {},
        },
    ];
    return (
        <div className="fixed bottom-0 left-0 right-0 flex flex-row items-start justify-between gap-4 px-4 py-2 bg-white shadow-md z-50">
            {items.length > 0 &&
                items.map((item, index: number) => (
                    <Button
                        text
                        size="small"
                        key={index}
                        className="flex flex-col text-gray-500 items-center gap-2 w-full transition-colors duration-200"
                        aria-label={item.label}
                    >
                        <span
                            className={`${item.icon} text-xl md:text-2xl`}
                        ></span>
                        <span className="relative text-sm md:text-base">
                            {item.label}
                        </span>
                    </Button>
                ))}
        </div>
    );
};
