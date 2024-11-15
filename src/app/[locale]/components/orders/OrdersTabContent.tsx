'use client';

import React, { useState, useEffect } from 'react';
import ordersData from '@/mocks/index.json';
import { Divider } from 'primereact/divider';
import { useWindow } from '../../hooks/useWindow';
import { OrdersType } from '../../types/order';
import { useSearchParams } from 'next/navigation';
import { OrdersList, OrderDetails } from '@/app/[locale]/components/orders';

const OrdersTabContent: React.FC = () => {
    const search = useSearchParams();
    const orderId = search.get('orderId');
    const { isDesktop, isMobile } = useWindow();
    const [orders, setOrders] = useState<OrdersType[] | []>([]);

    useEffect(() => {
        const getOrders = () => {
            const loadedOrders = Array.isArray(ordersData.orders)
                ? (ordersData.orders as unknown as OrdersType[])
                : [];
            setOrders(loadedOrders);
        };
        getOrders();
    }, []);

    return (
        <div className="flex flex-row gap-4 w-full h-full overflow-hidden">
            {(isMobile && !orderId) || isDesktop ? (
                <OrdersList ordersData={orders} />
            ) : (
                <></>
            )}
            {isDesktop && <Divider layout="vertical" />}
            {(isMobile && orderId) || isDesktop ? <OrderDetails /> : <></>}
        </div>
    );
};

export default OrdersTabContent;
