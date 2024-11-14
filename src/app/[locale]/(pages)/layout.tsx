'use client';

import React from 'react';
import { useWindow } from '../hooks/useWindow';
import { Navbar, MobileNavbar } from '../components';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { isMobile } = useWindow();
    return (
        <div
            style={{ zoom: '0.9' }}
            className={`flex flex-row gap-4 w-full h-full overflow-auto`}
        >
            {isMobile ? <MobileNavbar /> : <Navbar />}
            <div className={`w-full h-full`}>{children}</div>
        </div>
    );
};

export default Layout;
