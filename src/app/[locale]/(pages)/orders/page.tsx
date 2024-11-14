'use client';

import React, { useState, useEffect } from 'react';
import ordersData from '@/mocks/index.json';
import { Divider } from 'primereact/divider';
import { OrdersType } from '../../types/order';
import { OrdersList, OrderDetails } from '@/app/[locale]/components/orders';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<OrdersType[] | []>([]);
    const [order, setOrder] = useState<OrdersType | null>(null);

    useEffect(() => {
        const getOrders = () => {
            const loadedOrders = Array.isArray(ordersData.orders)
                ? (ordersData.orders as unknown as OrdersType[])
                : [];
            setOrders(loadedOrders);
            if (loadedOrders.length > 0) {
                setOrder(loadedOrders[0]);
            }
        };
        getOrders();
    }, []);

    return (
        <div className="flex flex-row gap-4 w-full h-full overflow-hidden">
            <OrdersList ordersData={orders} setOrder={setOrder} />
            <Divider layout="vertical" />
            <OrderDetails order={order} />
        </div>
    );
};

export default OrdersPage;
