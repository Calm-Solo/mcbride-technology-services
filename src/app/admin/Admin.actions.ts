'use server';

import { checkRole } from '@/utils/clerk/roles';
import { clerkClient } from '@clerk/nextjs/server';
import { ClerkApiUser, ClerkTransformedUser } from '@/types/clerk';

// Error types for better user feedback
type ErrorResponse = {
    message: string;
    success: false;
    errorType?: 'auth' | 'database' | 'clerk' | 'unknown';
};

// User management actions
export async function setRole(formData: FormData) {
    // Check that the user trying to set the role is an admin
    if (!(await checkRole('admin'))) {
        return {
            message: 'You do not have admin privileges to perform this action',
            success: false,
            errorType: 'auth',
        } as ErrorResponse;
    }

    try {
        const clerk = await clerkClient();
        const res = await clerk.users.updateUserMetadata(formData.get('id') as string, {
            publicMetadata: { role: formData.get('role') },
        });
        return { message: res.publicMetadata, success: true };
    } catch (err) {
        console.error('Error setting role:', err);
        return {
            message: `Failed to update user role: ${err instanceof Error ? err.message : 'Unknown error'}`,
            success: false,
            errorType: 'clerk',
        } as ErrorResponse;
    }
}

export async function removeRole(formData: FormData) {
    // Check that the user trying to remove the role is an admin
    if (!(await checkRole('admin'))) {
        return {
            message: 'You do not have admin privileges to perform this action',
            success: false,
            errorType: 'auth',
        } as ErrorResponse;
    }

    try {
        const clerk = await clerkClient();
        const res = await clerk.users.updateUserMetadata(formData.get('id') as string, {
            publicMetadata: { role: null },
        });
        return { message: res.publicMetadata, success: true };
    } catch (err) {
        console.error('Error removing role:', err);
        return {
            message: `Failed to remove user role: ${err instanceof Error ? err.message : 'Unknown error'}`,
            success: false,
            errorType: 'clerk',
        } as ErrorResponse;
    }
}

// Transform Clerk user to our application's user format
function transformClerkUser(user: ClerkApiUser): ClerkTransformedUser {
    return {
        id: user.id,
        clerk_id: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        username: user.username,
        first_name: user.firstName || '',
        last_name: user.lastName || '',
        image_url: user.imageUrl,
        created_at: new Date(user.createdAt),
        updated_at: new Date(),
        last_sign_in: new Date(user.lastSignInAt || user.createdAt),
    };
}

// Data fetching actions
export async function fetchAllUsers(): Promise<{
    success: boolean;
    data: ClerkTransformedUser[];
    message?: string;
    errorType?: string;
}> {
    console.log('fetchAllUsers: Checking admin role...');
    const isAdmin = await checkRole('admin');

    if (!isAdmin) {
        console.error('fetchAllUsers: User is not an admin. Access denied.');
        return {
            message: 'You do not have admin privileges to view user data',
            success: false,
            data: [],
            errorType: 'auth',
        };
    }
    console.log('fetchAllUsers: Admin check passed. Proceeding to fetch users from Clerk...');

    try {
        // Get Clerk client
        const clerk = await clerkClient();

        // Fetch users from Clerk API
        console.log('fetchAllUsers: Querying Clerk API for all users...');
        const { data: clerkUsers } = await clerk.users.getUserList({
            limit: 100, // Adjust as needed
            orderBy: '-created_at',
        });

        console.log(`fetchAllUsers: Clerk API returned ${clerkUsers.length} users.`);

        // Transform Clerk users to match our app's user format
        const users = clerkUsers.map(transformClerkUser);

        console.log('fetchAllUsers: Transformed user data:', JSON.stringify(users, null, 2));

        return { message: 'Successfully fetched users', success: true, data: users };
    } catch (err) {
        console.error('fetchAllUsers: Clerk API error occurred:', err);
        return {
            message: `Clerk API error: ${err instanceof Error ? err.message : 'Failed to fetch users'}`,
            success: false,
            data: [],
            errorType: 'clerk',
        };
    }
}

export async function searchUsers(searchTerm: string): Promise<{
    success: boolean;
    data: ClerkTransformedUser[];
    message?: string;
    errorType?: string;
}> {
    // Check that the user trying to search users is an admin
    if (!(await checkRole('admin'))) {
        return {
            message: 'You do not have admin privileges to search users',
            success: false,
            data: [],
            errorType: 'auth',
        };
    }

    try {
        // Get Clerk client
        const clerk = await clerkClient();

        // Fetch all users from Clerk API - Clerk doesn't support direct search via API
        const { data: clerkUsers } = await clerk.users.getUserList({
            limit: 100, // Adjust as needed
        });

        // Transform and filter users client-side
        const searchTermLower = searchTerm.toLowerCase();
        const filteredUsers = clerkUsers
            .filter((user) => {
                return (
                    (user.emailAddresses[0]?.emailAddress || '').toLowerCase().includes(searchTermLower) ||
                    (user.username || '').toLowerCase().includes(searchTermLower) ||
                    (user.firstName || '').toLowerCase().includes(searchTermLower) ||
                    (user.lastName || '').toLowerCase().includes(searchTermLower)
                );
            })
            .map(transformClerkUser);

        return {
            message: 'Successfully searched users',
            success: true,
            data: filteredUsers,
        };
    } catch (err) {
        console.error('Error searching users from Clerk API:', err);
        return {
            message: `Clerk API error: ${err instanceof Error ? err.message : 'Failed to search users'}`,
            success: false,
            data: [],
            errorType: 'clerk',
        };
    }
}
