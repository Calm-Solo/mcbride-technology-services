import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import HomeComponentServer from './Home.Component.Server';

export const metadata: Metadata = {
    title: 'McBride Technology Services - Professional IT Solutions',
    description: 'Professional IT support, web development, and freelance engineering services',
    openGraph: {
        title: 'McBride Technology Services - Professional IT Solutions',
        description: 'Professional IT support, web development, and freelance engineering services',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'McBride Technology Services - Professional IT Solutions',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'McBride Technology Services - Professional IT Solutions',
        description: 'Professional IT support, web development, and freelance engineering services',
        images: ['/og-image.png'],
    },
};

export default function Home() {
    return (
        <PageLayout page="home">
            <HomeComponentServer />
        </PageLayout>
    );
}
