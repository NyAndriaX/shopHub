'use client';

import React, { useState, useEffect } from 'react';
import ordersData from '@/mocks/index.json';
import { Divider } from 'primereact/divider';
import { useWindow } from '../../hooks/useWindow';
import { OrdersType } from '../../types/order';
import { OrdersList, OrderDetails } from '@/app/[locale]/components/orders';

const OrdersTabContent: React.FC = () => {
    const { isDesktop, isMobile } = useWindow();
    const [orders, setOrders] = useState<OrdersType[] | []>([]);
    const [order, setOrder] = useState<OrdersType | null>(null);

    useEffect(() => {
        const getOrders = () => {
            const loadedOrders = Array.isArray(ordersData.orders)
                ? (ordersData.orders as unknown as OrdersType[])
                : [];
            setOrders(loadedOrders);
            if (loadedOrders.length > 0 && isDesktop) {
                setOrder(loadedOrders[0]);
            }
        };
        getOrders();
    }, []);

    return (
        <div className="flex flex-row gap-4 w-full h-full overflow-hidden">
            {(isMobile && !order) || isDesktop ? (
                <OrdersList ordersData={orders} setOrder={setOrder} />
            ) : (
                <></>
            )}
            {isDesktop && <Divider layout="vertical" />}
            {(isMobile && order) || isDesktop ? (
                <OrderDetails order={order} setOrder={setOrder} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default OrdersTabContent;
