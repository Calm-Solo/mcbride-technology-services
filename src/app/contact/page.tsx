import React from 'react';
import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import ContactComponent from './Contact.Client.Component';

export const metadata: Metadata = {
    title: 'Contact Us | McBride Technology Services',
    description: "Get in touch with our technology experts. We're here to help with all your IT, web development, and engineering needs.",
    applicationName: 'McBride Technology Services',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
        shortcut: '/icon.png',
    },
    openGraph: {
        title: 'Contact Us | McBride Technology Services',
        description:
            "Get in touch with our technology experts. We're here to help with all your IT, web development, and engineering needs.",
        siteName: 'McBride Technology Services',
        url: 'https://mcbridetechnologyservices.com/contact',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'McBride Technology Services - Contact Us',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us | McBride Technology Services',
        description:
            "Get in touch with our technology experts. We're here to help with all your IT, web development, and engineering needs.",
        images: ['/og-image.png'],
    },
};

export default function ContactPage() {
    return (
        <PageLayout page="contact">
            <ContactComponent />
        </PageLayout>
    );
}
