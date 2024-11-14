'use client';

import React from 'react';
import { Button } from 'primereact/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col justify-between h-[80vh] ">
            <div className="flex-grow flex px-4 flex-col gap-2 items-center justify-center ">
                <h4 className="scroll-m-20 text-base font-bold tracking-normal">
                    Sorry, this page is not available
                </h4>
                <span className="text-sm text-[#777777] max-w-[350px] w-full text-center">
                    The link you followed may be broken or the page has may have
                    been deleted.
                </span>
                <Button size="small">
                    <Link href={'/'}>Back</Link>
                </Button>
            </div>
        </div>
    );
}
