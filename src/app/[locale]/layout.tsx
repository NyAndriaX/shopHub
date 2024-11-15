/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles/globals.css';

import React from 'react';
import SessionProviderWrapper from './utils/sessionProviderWrapper';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { PrimeReactProvider } from 'primereact/api';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import 'primeicons/primeicons.css';

export const metadata = {
    title: 'ShopHub - Votre Plateforme de Shopping en Ligne',
    description:
        "Découvrez ShopHub, la solution ultime pour tous vos besoins de shopping en ligne. Profitez d'une expérience de navigation fluide, des produits variés, et des offres exceptionnelles pour simplifier vos achats.",
};

export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <SessionProviderWrapper>
            <html lang={locale}>
                <body suppressHydrationWarning>
                    <NextIntlClientProvider messages={messages}>
                        <PrimeReactProvider>{children}</PrimeReactProvider>
                    </NextIntlClientProvider>
                </body>
            </html>
        </SessionProviderWrapper>
    );
}
