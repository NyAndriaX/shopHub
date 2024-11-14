'use client';

import React, { useState, Suspense, lazy } from 'react';
import { MainLayout } from '../components';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import { ProgressSpinner } from 'primereact/progressspinner';

const OrdersPage = lazy(() => import('./orders/page'));
const ProductPage = lazy(() => import('./product/page'));

const MainPage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const items: MenuItem[] = [
        { label: 'Orders', icon: 'pi pi-shopping-cart' },
        { label: 'Products', icon: 'pi pi-list' },
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
                    {activeIndex === 0 && <OrdersPage />}
                    {activeIndex === 1 && <ProductPage />}
                </Suspense>
            </div>
        </MainLayout>
    );
};

export default MainPage;
