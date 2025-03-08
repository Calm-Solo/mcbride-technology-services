import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import PortfolioComponentServer from './Portfolio.Component.Server';

export const metadata: Metadata = {
    title: 'McBride Technology Services - Portfolio',
    description: 'View our portfolio of web development, IT support, and engineering projects',
    applicationName: 'McBride Technology Services',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
        shortcut: '/icon.png',
    },
    openGraph: {
        title: 'McBride Technology Services - Portfolio',
        description: 'View our portfolio of web development, IT support, and engineering projects',
        siteName: 'McBride Technology Services',
        url: 'https://mcbridetechnologyservices.com/portfolio',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'McBride Technology Services - Portfolio',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'McBride Technology Services - Portfolio',
        description: 'View our portfolio of web development, IT support, and engineering projects',
        images: ['/og-image.png'],
    },
};

export default function Portfolio() {
    return (
        <PageLayout page="portfolio">
            <PortfolioComponentServer />
        </PageLayout>
    );
}
