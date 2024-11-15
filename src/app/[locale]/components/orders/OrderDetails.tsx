import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { useTranslations } from 'next-intl';
import ordersData from '@/mocks/index.json';
import { OrdersType } from '../../types/order';
import { OrderAddress } from './OrderAddress';
import { OrderProduct } from './OrderProduct';
import { Button } from 'primereact/button';
import { useSearchParams } from 'next/navigation';
import { useWindow } from '../../hooks/useWindow';
import { ProgressSpinner } from 'primereact/progressspinner';

export const OrderDetails: React.FC = () => {
    const search = useSearchParams();
    const { isMobile } = useWindow();
    const t = useTranslations('OrdersPage');
    const [order, setOrder] = useState<OrdersType | null>(null);
    const [isFetchingOrder, setIsFetchingOrder] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [order]);

    useEffect(() => {
        const orderId = search.get('orderId');

        if (orderId) {
            const fetchOrderById = () => {
                try {
                    setIsFetchingOrder(true);
                    const loadedOrder = Array.isArray(ordersData.orders)
                        ? (ordersData.orders as unknown as OrdersType[])
                        : [];
                    const foundOrder = loadedOrder.find(
                        (order) => order._id === orderId,
                    );
                    setOrder(foundOrder || null);
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsFetchingOrder(false);
                }
            };
            fetchOrderById();
        }
    }, [search]);

    if (isFetchingOrder) {
        <ProgressSpinner
            style={{ width: '30px', height: '30px' }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
        />;
    }

    if (!order) {
        return (
            <div className="flex flex-col gap-2 w-full items-center justify-center text-center text-gray-500 p-4">
                <div className="flex flex-col">
                    <span className="pi pi-exclamation-triangle mr-2"></span>
                    <p>
                        <strong>{t('No command selected')}</strong>
                    </p>
                </div>
                <p className="text-sm">
                    {t('Please select an order to view details')}
                </p>
            </div>
        );
    }

    return (
        <div
            className={`flex flex-col w-full relative gap-4 ${!isMobile ? 'h-[85vh]' : 'h-full pb-24'} overflow-auto`}
        >
            <Card className="w-full shadow-sm">
                <OrderProduct order={order} />
            </Card>
            <Card className="w-full shadow-sm">
                <OrderAddress order={order} />
            </Card>
            <div className="flex items-center justify-center w-full">
                <Button
                    size="small"
                    severity="success"
                    label={t('To validate')}
                    outlined
                />
            </div>
        </div>
    );
};
