import React from 'react';
import Link from 'next/link';
import { Carousel } from 'primereact/carousel';

type ProductType = {
    name: string;
    price: number;
    quantity: number;
    sku: string;
    image: string;
};

const products: ProductType[] = [
    {
        name: 'Produit A',
        price: 29.99,
        quantity: 2,
        sku: 'SKU12345',
        image: 'https://www.bibbilyboo.co.uk/cdn/shop/files/triangle_dots_2_1200x1200.png?v=1718295688',
    },
    {
        name: 'Produit B',
        price: 19.99,
        quantity: 1,
        sku: 'SKU67890',
        image: 'https://www.bibbilyboo.co.uk/cdn/shop/files/triangle_dots_2_1200x1200.png?v=1718295688',
    },
    {
        name: 'Produit C',
        price: 39.99,
        quantity: 3,
        sku: 'SKU11223',
        image: 'https://www.bibbilyboo.co.uk/cdn/shop/files/triangle_dots_2_1200x1200.png?v=1718295688',
    },
];

export const OrderProduct: React.FC = () => {
    const currency = '€';
    const responsiveOptions = [
        { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
        { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
        { breakpoint: '767px', numVisible: 2, numScroll: 1 },
        { breakpoint: '575px', numVisible: 1, numScroll: 1 },
    ];

    const productTemplate = (product: ProductType) => (
        <div className="border surface-border border-round m-2 text-center py-5 px-3 max-w-[300px] rounded-md">
            <div className="flex flex-row items-center justify-center mb-3">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 shadow-2"
                />
            </div>
            <div>
                <h4 className="mb-1 font-semibold">{product.name}</h4>
                <h6 className="mt-1 text-sm">
                    Prix : {currency} {product.price}
                </h6>
                <h6 className="mt-1 text-sm">
                    Quantité(s) : {product.quantity}
                </h6>
                <h6 className="mt-1 mb-3 text-sm">SKU : {product.sku}</h6>
            </div>
        </div>
    );

    return (
        <div className="card">
            <div className="mb-4">
                <h2 className="text-lg text-gray-900 font-semibold">
                    Liste des produits
                </h2>
                <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-normal text-sm hover:underline"
                >
                    ID commande: 11966
                </Link>
            </div>
            <Carousel
                value={products}
                numScroll={1}
                numVisible={3}
                responsiveOptions={responsiveOptions}
                itemTemplate={productTemplate}
            />
        </div>
    );
};
