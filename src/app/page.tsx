'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const IndexPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/pages');
    }, [router]);

    return null;
};

export default IndexPage;
