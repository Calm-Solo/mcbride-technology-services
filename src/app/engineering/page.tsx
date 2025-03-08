import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import FreelanceEngineeringComponentServer from './FreelanceEngineering.Component.Server';

export const metadata: Metadata = {
    title: 'Freelance Engineering | McBride Technology Services',
    description: 'Expert freelance engineering and development services for specialized technical projects',
    applicationName: 'McBride Technology Services',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
        shortcut: '/icon.png',
    },
    openGraph: {
        title: 'Freelance Engineering | McBride Technology Services',
        description: 'Expert freelance engineering and development services for specialized technical projects',
        siteName: 'McBride Technology Services',
        url: 'https://mcbridetechnologyservices.com/freelance-engineering',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'McBride Technology Services - Freelance Engineering',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Freelance Engineering | McBride Technology Services',
        description: 'Expert freelance engineering and development services for specialized technical projects',
        images: ['/og-image.png'],
    },
};

export default function FreelanceEngineering() {
    return (
        <PageLayout page="engineering">
            <FreelanceEngineeringComponentServer />
        </PageLayout>
    );
}
