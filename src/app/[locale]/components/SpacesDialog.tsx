import React from 'react';
import Link from 'next/link';

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
    return (
        <div className={`relative ${visible ? 'flex' : 'hidden'}`}>
            <div
                className="fixed inset-0 bg-black bg-opacity-30 z-40"
                onClick={onHide}
            />
            <div
                className="fixed bg-white z-50 h-full rounded-md max-w-80"
                style={{ left: `${positionLeft}px` }}
            >
                <div className="flex flex-col gap-8 items-start py-8 px-6 text-gray-900">
                    <div className="flex flex-col gap-8 items-start w-full">
                        <h2 className="text-lg font-semibold">Espaces</h2>
                        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-md w-full shadow-sm">
                            <p className="text-sm font-semibold text-gray-500">
                                Participez à la communauté
                            </p>
                            <Link
                                className="flex items-center text-sm font-bold gap-2 w-fit border-b border-gray-900 pb-1"
                                href="/pages/member/topic"
                                onClick={onHide}
                            >
                                <span>Nouveau sujet</span>
                                <span
                                    className="pi pi-arrow-right text-gray-500"
                                    style={{ fontSize: '0.8rem' }}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
