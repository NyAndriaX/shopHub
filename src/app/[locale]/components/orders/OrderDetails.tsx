import React from 'react';
import { Card } from 'primereact/card';
import { useTranslations } from 'next-intl';
import { OrdersType } from '../../types/order';
import { OrderAddress } from './OrderAddress';
import { OrderProduct } from './OrderProduct';
import { Button } from 'primereact/button';
import { useWindow } from '../../hooks/useWindow';

interface OrderDetailsProps {
    order: OrdersType | null;
    setOrder: React.Dispatch<React.SetStateAction<OrdersType | null>>;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
    order,
    setOrder,
}) => {
    const t = useTranslations('OrdersPage');
    const { isMobile } = useWindow();

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
            className={`flex flex-col w-full relative gap-4 ${!isMobile ? 'h-[85vh]' : 'h-full'} pb-24 overflow-auto`}
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
            {isMobile && (
                <Button
                    size="small"
                    icon="pi pi-angle-left"
                    rounded
                    outlined
                    className="fixed bottom-24 right-8"
                    onClick={() => setOrder(null)}
                />
            )}
        </div>
    );
};
