'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { ClerkUser } from '@/types/clerk';

/**
 * Get a Clerk user by ID
 */
export async function getClerkUser(userId: string): Promise<ClerkUser | null> {
    try {
        const clerk = await clerkClient();
        const user = await clerk.users.getUser(userId);

        return {
            id: user.id,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.emailAddresses[0]?.emailAddress || '',
            imageUrl: user.imageUrl,
            fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User',
        };
    } catch (error) {
        console.error(`Error getting Clerk user ${userId}:`, error);
        return null;
    }
}

/**
 * Get emails for multiple Clerk users by their IDs
 */
export async function getUserEmailsByIds(userIds: string[]): Promise<{
    success: boolean;
    data: Array<{ id: string; email: string }>;
    message?: string;
}> {
    try {
        if (!userIds.length) {
            return {
                success: true,
                data: [],
            };
        }

        const clerk = await clerkClient();
        const users = await Promise.all(
            userIds.map(async (id) => {
                try {
                    const user = await clerk.users.getUser(id);
                    return {
                        id: user.id,
                        email: user.emailAddresses[0]?.emailAddress || '',
                    };
                } catch (error) {
                    console.error(`Error getting user ${id}:`, error);
                    return null;
                }
            })
        );

        // Filter out null values and users with no email
        const validUsers = users.filter((user): user is { id: string; email: string } => !!user && !!user.email);

        return {
            success: true,
            data: validUsers,
        };
    } catch (error) {
        console.error('Error getting user emails:', error);
        return {
            success: false,
            data: [],
            message: 'Failed to fetch user emails',
        };
    }
}

/**
 * Get all admin users from Clerk
 */
export async function getAdminUsers(): Promise<{
    success: boolean;
    data: Array<{
        id: string;
        fullName: string;
        imageUrl: string;
        initials: string;
    }>;
    message?: string;
}> {
    try {
        const clerk = await clerkClient();
        const { data: users } = await clerk.users.getUserList({
            limit: 100,
        });

        // Filter for admin users and format return data
        const adminUsers = users
            .filter((user) => {
                const role = user.publicMetadata?.role;
                return role === 'admin' || role === 'superadmin';
            })
            .map((user) => {
                const firstName = user.firstName || '';
                const lastName = user.lastName || '';
                const fullName = `${firstName} ${lastName}`.trim() || 'Unknown User';

                // Generate initials from full name
                const initials =
                    firstName && lastName
                        ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
                        : fullName.substring(0, 2).toUpperCase();

                return {
                    id: user.id,
                    fullName,
                    imageUrl: user.imageUrl,
                    initials,
                };
            });

        return {
            success: true,
            data: adminUsers,
        };
    } catch (error) {
        console.error('Error getting admin users:', error);
        return {
            success: false,
            data: [],
            message: 'Failed to fetch admin users',
        };
    }
}
