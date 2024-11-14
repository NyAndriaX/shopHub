/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { validate } from '../../utils';
import { addressSchema } from '../../validators';
import { InputText } from 'primereact/inputtext';
import { OrdersType } from '../../types/order';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Formik, Form, Field } from 'formik';
import { City, State, ICity, IState, ICountry } from 'country-state-city';

const countries: Partial<ICountry>[] = [
    {
        name: 'France',
        isoCode: 'FR',
        currency: 'EUR',
    },
];

interface OrderAddressProps {
    order: OrdersType | null;
}

export const OrderAddress: React.FC<OrderAddressProps> = ({ order }) => {
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
                            <Formik
                                initialValues={{
                                    last_name: order?.address.last_name,
                                    first_name: order?.address.first_name,
                                    company: order?.address.company,
                                    address_1: order?.address.address_1,
                                    address_2: order?.address.address_2,
                                    city: order?.address.city,
                                    state: order?.address.state,
                                    postcode: order?.address.postcode,
                                    country: order?.address.country,
                                    email: order?.address.email,
                                    phone: order?.address.phone,
                                }}
                                validate={validate(addressSchema)}
                                onSubmit={(value) => handleSubmit(value)}
                            >
                                {({ errors, touched, setFieldValue }) => (
                                    <Form className="flex flex-col w-full gap-4">
                                        {/* --------------- Informations de Contact ----------------------- */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <h3 className="font-semibold">
                                                Informations de Contact :
                                            </h3>
                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                                                    <label htmlFor="last_name">
                                                        Nom{' '}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field
                                                        name="last_name"
                                                        as={InputText}
                                                        placeholder="Nom"
                                                        className={`p-inputtext rounded-md ${
                                                            errors.last_name &&
                                                            touched.last_name
                                                                ? 'border-red-500'
                                                                : ''
                                                        }`}
                                                    />
                                                    {errors.last_name &&
                                                    touched.last_name ? (
                                                        <div className="text-sm text-red-500">
                                                            {errors.last_name}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                                                    <label htmlFor="first_name">
                                                        Prénom{' '}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field
                                                        name="first_name"
                                                        as={InputText}
                                                        placeholder="Prénom"
                                                        className={`p-inputtext rounded-md ${
                                                            errors.first_name &&
                                                            touched.first_name
                                                                ? 'border-red-500'
                                                                : ''
                                                        }`}
                                                    />
                                                    {errors.first_name &&
                                                    touched.first_name ? (
                                                        <div className="text-sm text-red-500">
                                                            {errors.first_name}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                                                    <label htmlFor="phone">
                                                        Téléphone{' '}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field
                                                        name="phone"
                                                        as={InputText}
                                                        placeholder="Téléphone"
                                                        prefix="+33 "
                                                        className={`p-inputtext rounded-md ${
                                                            errors.phone &&
                                                            touched.phone
                                                                ? 'border-red-500'
                                                                : ''
                                                        }`}
                                                    />
                                                    {errors.phone &&
                                                    touched.phone ? (
                                                        <div className="text-sm text-red-500">
                                                            {errors.phone}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>

                                        {/* --------------- Adresse de Résidence ----------------------- */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <h3 className="font-semibold">
                                                Adresse de Résidence :
                                            </h3>
                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                                                    <label htmlFor="postcode">
                                                        Code postal{' '}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field
                                                        name="postcode"
                                                        as={InputText}
                                                        placeholder="Code postal"
                                                        className={`p-inputtext rounded-md ${
                                                            errors.postcode &&
                                                            touched.postcode
                                                                ? 'border-red-500'
                                                                : ''
                                                        }`}
                                                    />
                                                    {errors.postcode &&
                                                    touched.postcode ? (
                                                        <div className="text-sm text-red-500">
                                                            {errors.postcode}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                                                    <label htmlFor="address_1">
                                                        Adresse 1{' '}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field
                                                        name="address_1"
                                                        as={InputText}
                                                        placeholder="Rue, maison, appartement, unité*"
                                                        className={`p-inputtext rounded-md ${
                                                            errors.address_1 &&
                                                            touched.address_1
                                                                ? 'border-red-500'
                                                                : ''
                                                        }`}
                                                    />
                                                    {errors.address_1 &&
                                                    touched.address_1 ? (
                                                        <div className="text-sm text-red-500">
                                                            {errors.address_1}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                                                    <label htmlFor="address_2">
                                                        Adresse 2 (facultative)
                                                    </label>
                                                    <Field
                                                        name="address_2"
                                                        as={InputText}
                                                        placeholder="Appartement, suite, unité, etc. (facultatif)"
                                                        className={`p-inputtext rounded-md ${
                                                            errors.address_2 &&
                                                            touched.address_2
                                                                ? 'border-red-500'
                                                                : ''
                                                        }`}
                                                    />
                                                    {errors.address_2 &&
                                                    touched.address_2 ? (
                                                        <div className="text-sm text-red-500">
                                                            {errors.address_2}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>

                                        {/* --------------- Localisation Géographique ----------------------- */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <h3 className="font-semibold">
                                                Localisation Géographique :
                                            </h3>
                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                                                    <label htmlFor="country">
                                                        Pays{' '}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field name="country">
                                                        {({ field }: any) => (
                                                            <Dropdown
                                                                value={countries.find(
                                                                    (
                                                                        country: any,
                                                                    ) =>
                                                                        country.isoCode ===
                                                                        field.value,
                                                                )}
                                                                options={
                                                                    countries
                                                                }
                                                                filter
                                                                optionLabel="name"
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        'country',
                                                                        e.value
                                                                            .isoCode,
                                                                    )
                                                                }
                                                                placeholder="Sélectionner un pays"
                                                                className={`w-full ${
                                                                    errors.country &&
                                                                    touched.country
                                                                        ? 'border-red-500'
                                                                        : ''
                                                                }`}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                                                    <label htmlFor="state">
                                                        État{' '}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field name="state">
                                                        {({ field }: any) => (
                                                            <>
                                                                <Dropdown
                                                                    value={states.find(
                                                                        (
                                                                            state,
                                                                        ) =>
                                                                            state.name ===
                                                                            field.value,
                                                                    )}
                                                                    options={
                                                                        states
                                                                    }
                                                                    filter
                                                                    optionLabel="name"
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setFieldValue(
                                                                            'state',
                                                                            e
                                                                                .value
                                                                                .name,
                                                                        )
                                                                    }
                                                                    placeholder="Sélectionner un état"
                                                                    className={`w-full ${
                                                                        errors.state &&
                                                                        touched.state
                                                                            ? 'border-red-500'
                                                                            : ''
                                                                    }`}
                                                                />
                                                                {errors.state &&
                                                                touched.state ? (
                                                                    <div className="text-sm text-red-500">
                                                                        {
                                                                            errors.state
                                                                        }
                                                                    </div>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
                                                    <label htmlFor="city">
                                                        Ville{' '}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field name="city">
                                                        {({ field }: any) => (
                                                            <>
                                                                <Dropdown
                                                                    value={
                                                                        cities
                                                                            ? cities.find(
                                                                                  (
                                                                                      city,
                                                                                  ) =>
                                                                                      city.name ===
                                                                                      field.value,
                                                                              )
                                                                            : null
                                                                    }
                                                                    filter
                                                                    options={
                                                                        cities ||
                                                                        []
                                                                    }
                                                                    optionLabel="name"
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setFieldValue(
                                                                            'city',
                                                                            e
                                                                                .value
                                                                                .name,
                                                                        )
                                                                    }
                                                                    placeholder="Sélectionner une ville"
                                                                    className={`w-full ${
                                                                        errors.city &&
                                                                        touched.city
                                                                            ? 'border-red-500'
                                                                            : ''
                                                                    }`}
                                                                />
                                                                {errors.city &&
                                                                touched.city ? (
                                                                    <div className="text-sm text-red-500">
                                                                        {
                                                                            errors.city
                                                                        }
                                                                    </div>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>

                                        {/* --------------- Coordonnées Professionnelles ----------------------- */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <h3 className="font-semibold">
                                                Coordonnées Professionnelles :
                                            </h3>
                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(50%-1rem)]">
                                                    <label htmlFor="company">
                                                        Raison sociale
                                                        (facultative)
                                                    </label>
                                                    <Field
                                                        name="company"
                                                        as={InputText}
                                                        placeholder="Raison sociale"
                                                        className={`p-inputtext w-full ${
                                                            errors.company &&
                                                            touched.company
                                                                ? 'border-red-500'
                                                                : ''
                                                        }`}
                                                    />
                                                    {errors.company &&
                                                    touched.company ? (
                                                        <div className="text-sm text-red-500">
                                                            {errors.company}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="flex flex-col gap-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(50%-1rem)]">
                                                    <label htmlFor="email">
                                                        E-mail{' '}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field
                                                        name="email"
                                                        as={InputText}
                                                        placeholder="E-mail"
                                                        className={`p-inputtext w-full ${
                                                            errors.email &&
                                                            touched.email
                                                                ? 'border-red-500'
                                                                : ''
                                                        }`}
                                                    />
                                                    {errors.email &&
                                                    touched.email ? (
                                                        <div className="text-sm text-red-500">
                                                            {errors.email}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row mt-6 gap-2 items-center justify-start">
                                            <Button
                                                type="submit"
                                                label="Enregistrer"
                                                // loading={isLoading}
                                                // disabled={isLoading}
                                                rounded-md
                                                raised
                                            />
                                            <Button
                                                onClick={toggleEdit}
                                                // disabled={isLoading}
                                                label="Annuler"
                                                outlined
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
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
                                            <div>
                                                {order?.address.last_name}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded border max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Prénom:
                                            </div>
                                            <div>
                                                {order?.address.first_name}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Téléphone:
                                            </div>
                                            <div>{order?.address.phone}</div>
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
                                            <div>{order?.address.postcode}</div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Adresse 1:
                                            </div>
                                            <div>
                                                {order?.address.address_1}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Adresse 2:
                                            </div>
                                            <div>
                                                {order?.address.address_2 ||
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
                                            <div>{order?.address.country}</div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                Ville:
                                            </div>
                                            <div>{order?.address.city}</div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[33%] h-auto p-2">
                                            <div className="font-medium">
                                                État:
                                            </div>
                                            <div>
                                                {order?.address.state || 'null'}
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
                                                {order?.address.company ||
                                                    'null'}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-[12rem] bg-gray-100 rounded max-w-full md:max-w-[50%] h-auto p-2">
                                            <div className="font-medium">
                                                E-mail:
                                            </div>
                                            <div>{order?.address.email}</div>
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
