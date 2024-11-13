'use client';

import React from 'react';
import { OrdersList, OrderDetails } from '@/app/components/orders';
import { Divider } from 'primereact/divider';

const OrdersPage: React.FC = () => {
    return (
        <div className="flex flex-row gap-4 w-full h-full overflow-auto">
            <OrdersList />
            <Divider layout="vertical" />
            <OrderDetails />
        </div>
    );
};

export default OrdersPage;
