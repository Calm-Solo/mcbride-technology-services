import React from 'react';
import { Metadata } from 'next';
import { KanbanBoard } from '@/app/admin/kanban/components/KanbanBoard.Client';
import PageLayout from '@/components/layout/PageLayout';
import { checkAdminAccess } from '../AdminAuth.action';

export const metadata: Metadata = {
    title: 'Kanban Board',
    description: 'Administrative kanban board for managing and tracking development tasks in Specify.',
    openGraph: {
        title: 'Kanban Board | Specify Admin',
        description: 'Administrative kanban board for managing and tracking development tasks in Specify.',
        url: 'https://www.specify.chat/admin/kanban',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Specify Kanban Board',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kanban Board | Specify Admin',
        description: 'Administrative kanban board for managing and tracking development tasks in Specify.',
        images: ['/og-image.png'],
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default async function KanbanPage() {
    // Use our explicit server action to check admin access
    // This will redirect if the user is not an admin
    await checkAdminAccess();

    return (
        <div className="h-full w-full bg-st_darkest">
            <PageLayout page="Kanban">
                <div className="w-full flex justify-center pt-16 2xl:pt-8 pb-24">
                    <div className="w-full max-w-7xl px-4 md:px-16">
                        <KanbanBoard />
                    </div>
                </div>
            </PageLayout>
        </div>
    );
}
