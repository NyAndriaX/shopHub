import React, { useState, useEffect, Suspense } from 'react';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { useTranslations } from 'next-intl';
import { SpacesDialog } from './SpacesDialog';
import { MenuItem } from 'primereact/menuitem';
import { PanelMenu } from 'primereact/panelmenu';
import { ProgressSpinner } from 'primereact/progressspinner';

const LocalSwitcher = React.lazy(() => import('./local-switcher'));

export const Navbar: React.FC = () => {
    const t = useTranslations('Navbar');
    const [visible, setVisible] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(true);

    const items: MenuItem[] = [
        {
            id: '01',
            label: t('Spaces'),
            icon: 'pi pi-globe',
            template: (item) => <NavItem isHovered={isHovered} item={item} />,
            command: () => {
                setVisible((prevValue) => !prevValue);
            },
        },
        {
            id: '03',
            label: t('Billing'),
            icon: 'pi pi-credit-card',
            template: (item) => <NavItem isHovered={isHovered} item={item} />,
            command: () => {},
        },
        {
            id: '02',
            label: t('My account'),
            icon: 'pi pi-user',
            template: (item) => <NavItem isHovered={isHovered} item={item} />,
            command: () => {},
        },
        {
            id: '06',
            label: t('Log out'),
            icon: 'pi pi-sign-out',
            className: 'text-red-500 mt-1',
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
            style={{
                width: isHovered ? '21.4rem' : '7rem',
                transition: 'width 0.3s ease',
            }}
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
                <Suspense
                    fallback={
                        <ProgressSpinner
                            style={{ width: '30px', height: '30px' }}
                            strokeWidth="8"
                            fill="var(--surface-ground)"
                            animationDuration=".5s"
                        />
                    }
                >
                    <LocalSwitcher isHovered={isHovered} />
                </Suspense>
            </div>
            <SpacesDialog
                visible={visible}
                positionLeft={isHovered ? 273 : 80}
                // setVisible={setVisible}
                onHide={() => setVisible(false)}
            />
        </div>
    );
};
