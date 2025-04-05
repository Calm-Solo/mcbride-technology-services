import React from 'react';
import { Suspense } from 'react';
import { Metadata } from 'next';
import AdminContainer from './AdminContainer';
import { checkAdminAccess } from './AdminAuth.action';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Administrative dashboard for managing users and settings.',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminPage({ searchParams }: { searchParams: { tab?: string } }) {
    // Check admin access - will redirect if not an admin
    await checkAdminAccess();

    // Parse the tab param, defaulting to 'users' if not set or invalid
    const validTabs = ['users', 'settings', 'logs'] as const;
    type ValidTab = (typeof validTabs)[number];

    const tabParam = searchParams?.tab && validTabs.includes(searchParams.tab as ValidTab) ? searchParams.tab : 'users';

    return (
        <div className="h-full w-full bg-background">
            <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
                <AdminContainer initialTab={tabParam} />
            </Suspense>
        </div>
    );
}
