'use client';

import React, { useState, Suspense, lazy } from 'react';
import { MainLayout } from '../components';
import { useTranslations } from 'next-intl';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import { ProgressSpinner } from 'primereact/progressspinner';

const OrdersTabContent = lazy(
    () => import('../components/orders/OrdersTabContent'),
);
const ProductsTabContent = lazy(
    () => import('../components/products/ProductsTabContent'),
);

const MainPage: React.FC = () => {
    const t = useTranslations('IndexPage');
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const items: MenuItem[] = [
        { label: t('Orders'), icon: 'pi pi-shopping-cart' },
        { label: t('Products'), icon: 'pi pi-list' },
    ];
    return (
        <MainLayout headers="Nom du Site 1">
            <div className="flex flex-col gap-4 items-start w-full">
                <TabMenu
                    model={items}
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                />
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
                    {activeIndex === 0 && <OrdersTabContent />}
                    {activeIndex === 1 && <ProductsTabContent />}
                </Suspense>
            </div>
        </MainLayout>
    );
};

export default MainPage;
