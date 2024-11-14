import React from 'react';
import { OrderItem } from './OrderItem';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

export const OrdersList: React.FC = () => {
    return (
        <div
            style={{ width: '30rem' }}
            className="flex flex-col gap-6 items-center p-4 relative bg-white w-fit h-full"
        >
            <div className="w-full h-full">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search " />
                    <InputText
                        placeholder="Rechercher"
                        className="p-inputtext-sm w-full"
                        style={{ paddingLeft: '2.5rem' }}
                    />
                </IconField>
            </div>
            <div className="flex flex-col gap-4 items-start w-full">
                <OrderItem />
            </div>
        </div>
    );
};
