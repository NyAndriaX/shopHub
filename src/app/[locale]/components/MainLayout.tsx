import React from 'react';
import { Users } from './Users';

interface MainLayoutProps {
    headers?: React.ReactNode | null;
    children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    headers,
}) => {
    return (
        <div className="flex flex-col w-full h-full items-start rounded-md gap-6 py-2 md:py-4 px-4 md:px-8">
            <div className="flex flex-row items-center w-full justify-center">
                {headers && (
                    <header className="flex-1 text-xl md:text-2xl font-bold w-full text-gray-900">
                        {headers}
                    </header>
                )}
                <Users />
            </div>

            <main
                className={`flex flex-col items-center w-full space-x-4 overflow-auto ${!headers && 'md:p-8'}`}
            >
                {children}
            </main>
        </div>
    );
};
