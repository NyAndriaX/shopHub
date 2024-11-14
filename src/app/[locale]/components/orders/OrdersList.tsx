import React, { useState, useMemo } from 'react';
import { OrderItem } from './OrderItem';
import { useTranslations } from 'next-intl';
import { OrdersType } from '../../types/order';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface OrdersListProps {
    ordersData: OrdersType[];
    setOrder: React.Dispatch<React.SetStateAction<OrdersType | null>>;
}

interface FilterOptions {
    name: string;
    value: string;
}

export const OrdersList: React.FC<OrdersListProps> = ({
    ordersData,
    setOrder,
}) => {
    const t = useTranslations('OrdersPage');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<string>('name');

    const filterOptions: FilterOptions[] = [
        {
            name: t('Name'),
            value: 'name',
        },
        {
            name: 'ID',
            value: 'id',
        },
        {
            name: 'Date',
            value: 'date',
        },
    ];

    const filteredOrders = useMemo(() => {
        const filteredBySearch = ordersData.filter(
            (order) =>
                order.address.last_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                order._id.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        return filteredBySearch.sort((a, b) => {
            if (selectedFilter === 'name') {
                return a.address.last_name.localeCompare(b.address.last_name);
            } else if (selectedFilter === 'id') {
                return b._id.localeCompare(a._id);
            } else if (selectedFilter === 'date') {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            }
            return 0;
        });
    }, [ordersData, searchTerm, selectedFilter]);

    return (
        <div
            style={{ width: '40rem', height: '84vh' }}
            className="flex flex-col w-full shadow-sm py-6 relative bg-white h-full"
        >
            <div className="flex flex-row gap-1 w-full h-fit p-4 sticky top-0">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search " />
                    <InputText
                        placeholder={t('Search')}
                        className="p-inputtext-sm w-full"
                        style={{ paddingLeft: '2.5rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </IconField>
                <Dropdown
                    value={selectedFilter}
                    onChange={(e: DropdownChangeEvent) =>
                        setSelectedFilter(e.value)
                    }
                    options={filterOptions}
                    optionLabel="name"
                    panelClassName="text-sm"
                />
            </div>
            <div className="flex flex-col gap-4 items-start overflow-auto h-full p-4 w-full">
                {filteredOrders.map((order, index: number) => (
                    <OrderItem key={index} order={order} setOrder={setOrder} />
                ))}
            </div>
        </div>
    );
};
