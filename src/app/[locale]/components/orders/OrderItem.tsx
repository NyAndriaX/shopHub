import React from 'react';
import dayjs from 'dayjs';
import { Badge } from 'primereact/badge';
import { useRouter } from 'next/navigation';
import { OrdersType } from '../../types/order';

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

interface OrderItemProps {
    order: OrdersType;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    const router = useRouter();

    const handleClick = () => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('orderId', order._id);
        router.push(currentUrl.toString());
    };

    return (
        <div
            onClick={handleClick}
            className="flex flex-row py-2 px-4 items-center gap-3 rounded-md cursor-pointer shadow-sm bg-white hover:bg-gray-100 w-full"
        >
            <div className="flex flex-col gap-2 w-full">
                <span className="font-bold text-gray-900">
                    {order.address.first_name} {order.address.last_name}
                </span>
                <span className="text-xs text-gray-900">ID : {order._id}</span>
                <span className="text-xs text-gray-900">
                    {dayjs(order.createdAt).format('DD/MM/YYYY')}
                </span>
                <span className="text-xs text-gray-900">
                    <OrderStatus status={order.status} />
                </span>
            </div>
            <span className="font-bold text-gray-900">
                {order.currency}
                {order.total}
            </span>
        </div>
    );
};
