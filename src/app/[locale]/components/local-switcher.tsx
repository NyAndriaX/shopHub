'use client';

import React, { useTransition } from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Flag from 'react-world-flags';

interface Language {
    name: string;
    value: string;
    code: string;
}

interface LocalSwitcherProps {
    isHovered: boolean;
}

export const LocalSwitcher: React.FC<LocalSwitcherProps> = ({ isHovered }) => {
    const router = useRouter();
    const localActive = useLocale();
    const [isPending, startTransition] = useTransition();

    const languages: Language[] = [
        { name: 'French', value: 'fr', code: 'FR' },
        { name: 'English', value: 'en', code: 'US' },
    ];

    const languageTemplate = (option: Language) => {
        return (
            <div className="flex flex-row items-center gap-2">
                <Flag code={option.code} className="w-4 h-2" />
                <span className="text-xs">{option.name}</span>
            </div>
        );
    };

    const onSelectChange = (e: DropdownChangeEvent) => {
        const nextLocale = e.value;
        startTransition(() => {
            router.replace(`/${nextLocale}`);
        });
    };

    if (!isHovered) {
        const currentCode = localActive === 'en' ? 'US' : 'FR';
        return (
            <div className="flex flex-row items-center rounded p-2">
                <Flag code={currentCode} className="w-6 h-4" />
            </div>
        );
    }

    return (
        <Dropdown
            value={localActive}
            onChange={onSelectChange}
            options={languages}
            optionLabel="name"
            disabled={isPending}
            placeholder="Select Language"
            itemTemplate={languageTemplate}
            className="w-full"
        />
    );
};
