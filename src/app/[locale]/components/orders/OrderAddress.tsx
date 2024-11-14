import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { City, State, ICity, IState, ICountry } from 'country-state-city';
import { Button } from 'primereact/button';

const countries: Partial<ICountry>[] = [
    {
        name: 'France',
        isoCode: 'FR',
        currency: 'EUR',
    },
];

const order = {
    address: {
        last_name: 'Dupont',
        first_name: 'Jean',
        phone: '+33 6 12 34 56 78',
        postcode: '75001',
        address_1: '123 Rue de la République',
        address_2: 'Appartement 4B',
        country: 'France',
        city: 'Paris',
        state: 'Île-de-France',
        company: 'Dupont SARL',
        email: 'jean.dupont@example.com',
    },
};

export const OrderAddress: React.FC = () => {
    const toast = useRef<Toast>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [states] = useState<IState[]>(State.getStatesOfCountry('FR') || []);
    const [cities] = useState<ICity[]>(City.getCitiesOfCountry('FR') || []);

    const toggleEdit = () => {
        setIsEditing((prevEditing) => !prevEditing);
    };

    const handleSubmit = async (value: unknown) => {
        try {
            console.log('Order address update simulated:', value);

            setIsEditing(false);
            toast.current?.show({
                severity: 'success',
                summary: 'Succès',
                detail: "Mise à jour de l'adresse réussie",
            });
        } catch (error) {
            console.log(error);
            toast.current?.show({
                severity: 'error',
                summary: 'Erreur',
                detail: "La mise à jour de l'adresse a échoué",
            });
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row mb-4 items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Détails de l&apos;Adresse de la Commande
                    </h2>
                    {!isEditing && (
                        <i
                            className="pi pi-pencil"
                            style={{ fontSize: '0.8rem', cursor: 'pointer' }}
                            onClick={toggleEdit}
                        ></i>
                    )}
                </div>
                <div>
                    <div className="flex flex-row gap-4 items-center text-sm">
                        {isEditing ? (
                            <>Editing</>
                        ) : (
                            <div className="flex flex-col items-center gap-4 w-full">
                                {/* --------------- Informations de Contact ----------------------- */}
                                <div className="flex flex-col gap-2 w-full">
                                    <h3 className="font-semibold">
                                        Informations de Contact :
                                    </h3>
                                    <div className="flex flex-wrap gap-4 w-full">
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded border max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Nom:
                                            </div>
                                            <div>{order.address.last_name}</div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded border max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Prénom:
                                            </div>
                                            <div>
                                                {order.address.first_name}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Téléphone:
                                            </div>
                                            <div>{order.address.phone}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* --------------- Adresse de Résidence ----------------------- */}
                                <div className="flex flex-col gap-4 w-full">
                                    <h3 className="font-semibold">
                                        Adresse de Résidence :
                                    </h3>
                                    <div className="flex flex-wrap gap-4 w-full">
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Code postal:
                                            </div>
                                            <div>{order.address.postcode}</div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Adresse 1:
                                            </div>
                                            <div>{order.address.address_1}</div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Adresse 2:
                                            </div>
                                            <div>
                                                {order.address.address_2 ||
                                                    'null'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* --------------- Localisation Géographique ----------------------- */}
                                <div className="flex flex-col gap-4 w-full">
                                    <h3 className="font-semibold">
                                        Localisation Géographique :
                                    </h3>
                                    <div className="flex flex-wrap gap-4 w-full">
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Pays:
                                            </div>
                                            <div>{order.address.country}</div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Ville:
                                            </div>
                                            <div>{order.address.city}</div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                État:
                                            </div>
                                            <div>
                                                {order.address.state || 'null'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* --------------- Coordonnées Professionnelles ----------------------- */}
                                <div className="flex flex-col gap-4 w-full">
                                    <h3 className="font-semibold">
                                        Coordonnées Professionnelles :
                                    </h3>
                                    <div className="flex flex-wrap gap-4 w-full">
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[50%] h-auto p-2">
                                            <div className="font-medium">
                                                Raison sociale:
                                            </div>
                                            <div>
                                                {order.address.company ||
                                                    'null'}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[50%] h-auto p-2">
                                            <div className="font-medium">
                                                E-mail:
                                            </div>
                                            <div>{order.address.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Toast ref={toast} />
        </>
    );
};
