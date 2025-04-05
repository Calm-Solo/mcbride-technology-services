'use server';

import { currentUser } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { ClerkUser, ClerkApiUser } from '@/types/clerk';

/**
 * Fetch all admin users from Clerk
 * This function will fetch users with admin role
 */
export async function getAdminUsers(): Promise<{
    success: boolean;
    data: ClerkUser[];
    message?: string;
}> {
    try {
        // Check if user is authenticated
        const user = await currentUser();
        if (!user) {
            return {
                success: false,
                data: [],
                message: 'Unauthorized',
            };
        }

        // Fetch all users
        const clerk = await clerkClient();
        const { data: users } = await clerk.users.getUserList({
            limit: 100,
        });

        // Filter users with admin role
        const adminUsers = users
            .filter((user: ClerkApiUser) => {
                const metadata = user.publicMetadata;
                return (
                    metadata &&
                    (metadata.role === 'admin' ||
                        metadata.role === 'Admin' ||
                        (typeof metadata.role === 'string' && metadata.role.toLowerCase() === 'admin') ||
                        metadata.isAdmin === true)
                );
            })
            .map((user: ClerkApiUser) => ({
                id: user.id,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.emailAddresses[0]?.emailAddress || '',
                imageUrl: user.imageUrl,
                fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.emailAddresses[0]?.emailAddress || user.id,
            }));

        return {
            success: true,
            data: adminUsers,
        };
    } catch (error) {
        console.error('Error fetching admin users:', error);
        return {
            success: false,
            data: [],
            message: 'Failed to fetch admin users',
        };
    }
}

/**
 * Get user emails by user IDs
 * This function will fetch email addresses for the provided user IDs
 */
export async function getUserEmailsByIds(userIds: string[]): Promise<{
    success: boolean;
    data: { userId: string; email: string }[];
    message?: string;
}> {
    try {
        if (!userIds.length) {
            return {
                success: true,
                data: [],
            };
        }

        // Fetch users by IDs
        const clerk = await clerkClient();

        // Get unique user IDs
        const uniqueUserIds = [...new Set(userIds)];

        // Fetch users in batches to avoid hitting API limits
        const batchSize = 20; // Clerk recommends smaller batch sizes
        const batches = [];

        for (let i = 0; i < uniqueUserIds.length; i += batchSize) {
            batches.push(uniqueUserIds.slice(i, i + batchSize));
        }

        const allUsers = [];

        for (const batch of batches) {
            const users = await clerk.users.getUserList({
                userId: batch,
            });
            allUsers.push(...users.data);
        }

        // Map users to their emails
        const userEmails = allUsers.map((user: ClerkApiUser) => ({
            userId: user.id,
            email: user.emailAddresses[0]?.emailAddress || '',
        }));

        return {
            success: true,
            data: userEmails.filter((item) => !!item.email), // Only return users with valid emails
        };
    } catch (error) {
        console.error('Error fetching user emails:', error);
        return {
            success: false,
            data: [],
            message: 'Failed to fetch user emails',
        };
    }
}
