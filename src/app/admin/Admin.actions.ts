'use server';

import { checkRole } from '@/utils/clerk/roles';
import { clerkClient } from '@clerk/nextjs/server';
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { like, or } from 'drizzle-orm';

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

// Data fetching actions
export async function fetchAllUsers() {
    // Check that the user trying to fetch users is an admin
    if (!(await checkRole('admin'))) {
        return {
            message: 'You do not have admin privileges to view user data',
            success: false,
            data: [],
            errorType: 'auth',
        };
    }

    try {
        const allUsers = await db.select().from(users).orderBy(users.created_at);
        return { message: 'Successfully fetched users', success: true, data: allUsers };
    } catch (err) {
        console.error('Database error fetching users:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to fetch users'}`,
            success: false,
            data: [],
            errorType: 'database',
        };
    }
}

export async function searchUsers(searchTerm: string) {
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
        const searchResults = await db
            .select()
            .from(users)
            .where(
                or(
                    like(users.email, `%${searchTerm}%`),
                    like(users.username || '', `%${searchTerm}%`),
                    like(users.first_name || '', `%${searchTerm}%`),
                    like(users.last_name || '', `%${searchTerm}%`)
                )
            )
            .orderBy(users.created_at);

        return { message: 'Successfully searched users', success: true, data: searchResults };
    } catch (err) {
        console.error('Database error searching users:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to search users'}`,
            success: false,
            data: [],
            errorType: 'database',
        };
    }
}
