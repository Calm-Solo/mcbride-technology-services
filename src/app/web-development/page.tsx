import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import WebDevelopmentComponentServer from './WebDevelopment.Component.Server';

export const metadata: Metadata = {
    title: 'Web Development | McBride Technology Services',
    description: 'Custom website and web application development services for businesses of all sizes',
    applicationName: 'McBride Technology Services',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
        shortcut: '/icon.png',
    },
    openGraph: {
        title: 'Web Development | McBride Technology Services',
        description: 'Custom website and web application development services for businesses of all sizes',
        siteName: 'McBride Technology Services',
        url: 'https://mcbridetechnologyservices.com/web-development',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'McBride Technology Services - Web Development',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Web Development | McBride Technology Services',
        description: 'Custom website and web application development services for businesses of all sizes',
        images: ['/og-image.png'],
    },
};

export default function WebDevelopment() {
    return (
        <PageLayout page="web-development">
            <WebDevelopmentComponentServer />
        </PageLayout>
    );
}
