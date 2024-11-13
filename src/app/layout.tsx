import './styles/globals.css';

import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';

export const metadata = {
    title: 'ShopHub - Votre Plateforme de Shopping en Ligne',
    description:
        "Découvrez ShopHub, la solution ultime pour tous vos besoins de shopping en ligne. Profitez d'une expérience de navigation fluide, des produits variés, et des offres exceptionnelles pour simplifier vos achats.",
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body suppressHydrationWarning>
                <PrimeReactProvider>{children}</PrimeReactProvider>
            </body>
        </html>
    );
}
