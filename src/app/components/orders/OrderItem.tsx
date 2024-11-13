import React from 'react';
import { Badge } from 'primereact/badge';

const OrderStatus: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
        case 'CREATED':
            return <Badge value="Créée" severity="info" />;
        case 'PROCESSING':
            return <Badge value="En cours" severity="info" />;
        case 'COMPLETED':
            return <Badge value="Complétée" severity="success" />;
        default:
            return <Badge value="" severity="warning" />;
    }
};

export const OrderItem: React.FC = () => {
    return (
        <div className="flex flex-row p-2 items-center gap-3 rounded-md cursor-pointer shadow-sm bg-white hover:bg-gray-100 w-full">
            <div className="flex flex-col gap-2 w-full">
                <span className="font-bold text-gray-900">John Doe</span>
                <span className="text-xs text-gray-900">Date : 19/04/2024</span>
                <span className="text-xs text-gray-900">
                    State : <OrderStatus status="COMPLETED" />
                </span>
            </div>
            <span className="font-bold text-gray-900">$19</span>
        </div>
    );
};
