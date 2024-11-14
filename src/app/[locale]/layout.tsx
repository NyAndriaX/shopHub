/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles/globals.css';

import React from 'react';
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
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body suppressHydrationWarning>
                <NextIntlClientProvider messages={messages}>
                    <PrimeReactProvider>{children}</PrimeReactProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
