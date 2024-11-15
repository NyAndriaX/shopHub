import React from 'react';
import { useTranslations } from 'next-intl';
import { ProductType } from '../../types/order';

interface ProductCardProps {
    product: ProductType;
    currency: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    currency,
}) => {
    const t = useTranslations('OrdersPage');

    return (
        <div className="shadow-md ml-2 p-4 w-full max-w-[300px] rounded-md border border-gray-300">
            <div className="flex flex-col items-center justify-center mb-4 relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md transition-transform transform hover:scale-110"
                />
            </div>
            <div className="flex flex-col gap-2 border-t border-b border-gray-300 py-2">
                <h4 className="font-semibold text-lg">{product.name}</h4>
                <h6 className="text-sm text-gray-600">
                    {t('Price')}: {currency} {product.price}
                </h6>
                <h6 className="text-sm text-gray-600">
                    {t('SKU')}: {product.sku}
                </h6>
                <h6 className="text-sm text-gray-600">
                    {t('Quantities')}:{product.quantity}
                </h6>
            </div>
            <div className="mt-3 text-sm font-semibold">
                {currency} {product.price * product.quantity}
            </div>
        </div>
    );
};
