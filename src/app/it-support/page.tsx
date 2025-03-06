import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import ITSupportComponentServer from './ITSupport.Component.Server';

export const metadata: Metadata = {
    title: 'IT Support Services | McBride Technology Services',
    description:
        'Professional IT support solutions for businesses of all sizes, including help desk, network management, and cybersecurity',
};

export default function ITSupport() {
    return (
        <PageLayout page="it-support">
            <ITSupportComponentServer />
        </PageLayout>
    );
}
