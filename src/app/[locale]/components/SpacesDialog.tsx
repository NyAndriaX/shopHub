import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface SpacesDialogProps {
    visible: boolean;
    onHide: () => void;
    positionLeft: number;
    // setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SpacesDialog: React.FC<SpacesDialogProps> = ({
    visible,
    onHide,
    positionLeft,
}) => {
    const t = useTranslations('Navbar');
    return (
        <div className={`relative ${visible ? 'flex' : 'hidden'}`}>
            <div
                className="fixed inset-0 bg-black bg-opacity-30 z-40"
                onClick={onHide}
            />
            <div
                className="fixed bg-white w-72 z-50 h-full rounded-md"
                style={{ left: `${positionLeft}px` }}
            >
                <div className="flex flex-col gap-8 items-start py-8 px-6 text-gray-900">
                    <div className="flex flex-col gap-8 items-start w-full">
                        <h2 className="text-lg font-semibold">{t('Spaces')}</h2>
                        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-md w-full shadow-sm">
                            <p className="text-sm font-semibold text-gray-500">
                                {t('Integrate your site')}
                            </p>
                            <Link
                                className="flex items-center text-sm font-bold gap-2 w-fit border-b border-gray-900 pb-1"
                                href="/pages/member/topic"
                                onClick={onHide}
                            >
                                <span>{t('Add a site')}</span>
                                <span
                                    className="pi pi-arrow-right text-gray-500"
                                    style={{ fontSize: '0.8rem' }}
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 items-start w-full">
                        <div className="flex items-center gap-4 text-sm text-gray-900 font-semibold cursor-pointer bg-white hover:bg-gray-100 w-full p-4 rounded-md">
                            <span
                                className="pi pi-globe"
                                style={{ fontSize: '1rem' }}
                            />
                            <span>Nom du site 1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
