import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import FreelanceEngineeringComponentServer from './FreelanceEngineering.Component.Server';

export const metadata: Metadata = {
    title: 'Freelance Engineering | McBride Technology Services',
    description: 'Expert freelance engineering and development services for specialized technical projects',
};

export default function FreelanceEngineering() {
    return (
        <PageLayout page="freelance-engineering">
            <FreelanceEngineeringComponentServer />
        </PageLayout>
    );
}
