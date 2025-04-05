import React from 'react';
import { Metadata } from 'next';
import AdminContainer from './AdminContainer';
import { checkAdminAccess } from './AdminAuth.action';
import PageLayout from '@/components/layout/PageLayout';

export const metadata: Metadata = {
    title: 'Admin Dashboard | User Management',
    description: 'Administrative dashboard for managing users and system settings.',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminPage() {
    // Check admin access - will redirect if not an admin
    await checkAdminAccess();

    return (
        <div className="h-full w-full bg-st_darkest">
            <PageLayout page="admin">
                <AdminContainer />
            </PageLayout>
        </div>
    );
}
