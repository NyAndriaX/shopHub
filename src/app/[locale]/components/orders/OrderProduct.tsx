import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Carousel } from 'primereact/carousel';
import { ProductCard } from './ProductCard';
import { OrdersType } from '../../types/order';

interface OrderProductProps {
    order: OrdersType | null;
}

export const OrderProduct: React.FC<OrderProductProps> = ({ order }) => {
    const t = useTranslations('OrdersPage');
    const currency = order?.currency;
    const products = order?.products;

    const responsiveOptions = [
        { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
        { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
        { breakpoint: '767px', numVisible: 2, numScroll: 1 },
        { breakpoint: '575px', numVisible: 1, numScroll: 1 },
    ];

    const numVisible =
        responsiveOptions.find(
            (option) => window.innerWidth >= parseInt(option.breakpoint),
        )?.numVisible || 1;

    const showNavigators = products && products.length > numVisible;

    return (
        <div className="card">
            <div className="mb-4">
                <h2 className="text-lg text-gray-900 font-semibold">
                    {t('Product Lists')}
                </h2>
                <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-normal text-sm hover:underline"
                >
                    ID {t('Order').toLowerCase()}: 11966
                </Link>
            </div>
            <Carousel
                value={products}
                numScroll={1}
                numVisible={3}
                responsiveOptions={responsiveOptions}
                itemTemplate={(item) => (
                    <ProductCard product={item} currency={currency as string} />
                )}
                showNavigators={showNavigators}
            />
        </div>
    );
};
