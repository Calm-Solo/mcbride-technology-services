'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function checkAdminAccess() {
    // Check if user is authenticated
    const { userId } = await auth();

    // If user is not authenticated, redirect to sign-in
    if (!userId) {
        console.log('User is not authenticated');
        redirect('/sign-in');
    }

    try {
        // Get user's organizations
        const clerk = await clerkClient();
        const orgResponse = await clerk.users.getOrganizationMembershipList({ userId });
        const userOrgs = orgResponse.data;

        // Check if user is a member of the ADMIN organization
        const isAdmin = userOrgs.some((org) => org.organization.name === 'ADMIN' || org.organization.name === 'admin');

        if (!isAdmin) {
            console.log('User is not a member of the ADMIN organization');
            redirect('/');
        }

        return true;
    } catch (error) {
        console.error('Error checking organization membership:', error);
        redirect('/');
    }
}
