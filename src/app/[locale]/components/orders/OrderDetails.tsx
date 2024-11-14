import React from 'react';
import { Card } from 'primereact/card';
import { OrderAddress } from './OrderAddress';
import { OrderProduct } from './OrderProduct';

export const OrderDetails: React.FC = () => {
    return (
        <div className="flex flex-col gap-4  w-full h-[85vh] overflow-auto">
            <Card className="w-full shadow-sm">
                <OrderProduct />
            </Card>
            <Card className="w-full shadow-sm">
                <OrderAddress />
            </Card>
        </div>
    );
};
