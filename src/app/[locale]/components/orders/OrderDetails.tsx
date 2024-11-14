import React from 'react';
import { Card } from 'primereact/card';
import { OrdersType } from '../../types/order';
import { OrderAddress } from './OrderAddress';
import { OrderProduct } from './OrderProduct';
import { Button } from 'primereact/button';

interface OrderDetailsProps {
    order: OrdersType | null;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    if (!order) {
        return (
            <div className="flex flex-col gap-2 w-full items-center justify-center text-center text-gray-500 p-4">
                <div className="flex flex-col">
                    <span className="pi pi-exclamation-triangle mr-2"></span>
                    <p>
                        <strong>Aucune commande sélectionnée</strong>
                    </p>
                </div>
                <p className="text-sm">
                    Veuillez sélectionner une commande pour afficher les
                    détails.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full gap-4 h-[85vh] overflow-auto">
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
                    label="valider"
                    outlined
                />
            </div>
        </div>
    );
};
