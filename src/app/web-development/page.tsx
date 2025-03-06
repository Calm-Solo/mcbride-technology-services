import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import WebDevelopmentComponentServer from './WebDevelopment.Component.Server';

export const metadata: Metadata = {
    title: 'Web Development | McBride Technology Services',
    description: 'Custom website and web application development services for businesses of all sizes',
};

export default function WebDevelopment() {
    return (
        <PageLayout page="web-development">
            <WebDevelopmentComponentServer />
        </PageLayout>
    );
}
