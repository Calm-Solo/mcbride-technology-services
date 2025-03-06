import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import ITSupportComponentServer from './ITSupport.Component.Server';

export const metadata: Metadata = {
    title: 'IT Support Services | McBride Technology Services',
    description:
        'Professional IT support solutions for businesses of all sizes, including help desk, network management, and cybersecurity',
    applicationName: 'McBride Technology Services',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
        shortcut: '/icon.png',
    },
    openGraph: {
        title: 'IT Support Services | McBride Technology Services',
        description:
            'Professional IT support solutions for businesses of all sizes, including help desk, network management, and cybersecurity',
        siteName: 'McBride Technology Services',
        url: 'https://mcbridetechnologyservices.com/it-support',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'McBride Technology Services - IT Support Services',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'IT Support Services | McBride Technology Services',
        description:
            'Professional IT support solutions for businesses of all sizes, including help desk, network management, and cybersecurity',
        images: ['/og-image.png'],
    },
};

export default function ITSupport() {
    return (
        <PageLayout page="it-support">
            <ITSupportComponentServer />
        </PageLayout>
    );
}
