import React from 'react';
import { Metadata } from 'next';
import { checkAdminAccess } from '../AdminAuth.action';
import PageLayout from '@/components/layout/PageLayout';
import IssueMain from '@/app/admin/issue/Issue.Main.Client';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const metadata: Metadata = {
    title: 'Issue Management',
    description: 'Administrative interface for viewing and resolving user-reported issues in Specify.',
    openGraph: {
        title: 'Issue Management | Specify Admin',
        description: 'Administrative interface for viewing and resolving user-reported issues in Specify.',
        url: 'https://www.specify.chat/admin/issue',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Specify Issue Management',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Issue Management | Specify Admin',
        description: 'Administrative interface for viewing and resolving user-reported issues in Specify.',
        images: ['/og-image.png'],
    },
    robots: {
        index: false,
        follow: false,
    },
};

// Define the search params cache with type-safe parsing
const searchParamsCache = createSearchParamsCache({
    issue_id: parseAsString.withDefault(''),
});

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ issue_id?: string }> }) {
    // Use our explicit server action to check admin access
    // This will redirect if the user is not an admin
    await checkAdminAccess();

    // Parse the search params
    const params = await searchParamsCache.parse(searchParams);
    const issueId = params.issue_id;

    if (!issueId) {
        throw new Error('Issue ID is required');
    }

    return (
        <div className="h-full w-full bg-st_darkest">
            <PageLayout page={`Issue ${issueId}`}>
                <div className="flex flex-col items-center">
                    <div className="max-w-7xl w-full px-16 pb-8 pt-16 2xl:!pt-8 flex flex-col justify-center">
                        <IssueMain issueId={issueId} />
                    </div>
                </div>
            </PageLayout>
        </div>
    );
}
