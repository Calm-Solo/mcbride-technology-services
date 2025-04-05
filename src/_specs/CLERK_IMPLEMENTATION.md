# Clerk Authentication Implementation Guide

This document provides a comprehensive guide for implementing Clerk authentication in a Next.js application, based on our current implementation. This guide covers everything from package installation to server actions, role management, and admin page implementation.

## Package Versions

Our implementation uses the following Clerk-related packages:

```json
{
    "@clerk/nextjs": "^6.12.0",
    "@clerk/types": "^4.46.1"
}
```

## Initial Setup

### Installation

```bash
pnpm add @clerk/nextjs
```

### Environment Variables

Create a `.env.local` file with your Clerk credentials:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_****
CLERK_SECRET_KEY=sk_****
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLERK_WEBHOOK_SECRET=whsec_****
```

## Middleware Configuration

We use a minimal middleware approach, only protecting routes that require authentication. The middleware is defined in `src/middleware.ts`:

```typescript
import { clerkMiddleware } from '@clerk/nextjs/server';

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.[\\w]+$).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};

export default clerkMiddleware();
```

This configuration skips Next.js internals and static files but ensures all API routes are protected.

## Next.js Configuration

Update your `next.config.ts` to include Clerk domains for images:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['img.clerk.com', 'images.clerk.dev'],
        // Include other domains as needed
    },
    // Other configurations...
};

export default nextConfig;
```

## Root Layout Configuration

In your application's root layout, wrap your components with ClerkProvider:

```typescript
// src/app/layout.tsx
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ClerkProvider>
                    <ClerkLoading>
                        {/* Loading state */}
                        <div className="loading-screen"></div>
                    </ClerkLoading>
                    <ClerkLoaded>
                        {children}
                    </ClerkLoaded>
                </ClerkProvider>
            </body>
        </html>
    );
}
```

For client components, you can use a providers file:

```typescript
// src/app/providers.tsx
'use client';

import { ClerkProvider } from '@clerk/nextjs';

interface RootProviderProps {
    children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: undefined,
                variables: { colorPrimary: '#0EA5E9' },
                layout: { shimmer: true },
            }}>
            {children}
        </ClerkProvider>
    );
}
```

## Webhook Setup

### 1. Server-side Implementation

Create a webhook handler at `src/app/api/webhook/clerk/route.ts`:

```typescript
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db, users } from '@/db/db';
import { eq } from 'drizzle-orm';

async function updateUserLastSignIn(userId: string) {
    await db.update(users).set({ last_sign_in: new Date() }).where(eq(users.clerk_id, userId));
}

async function createOrUpdateUser(userData: {
    id: string;
    email_addresses: Array<{ email_address: string }>;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
}) {
    const email = userData.email_addresses[0]?.email_address;
    if (!email) return;

    const existingUser = await db.select().from(users).where(eq(users.clerk_id, userData.id));

    if (existingUser.length === 0) {
        // Create new user
        await db.insert(users).values({
            clerk_id: userData.id,
            email,
            username: userData.username || undefined,
            first_name: userData.first_name || undefined,
            last_name: userData.last_name || undefined,
            image_url: userData.image_url || undefined,
        });
    } else {
        // Update existing user
        await db
            .update(users)
            .set({
                email,
                username: userData.username || undefined,
                first_name: userData.first_name || undefined,
                last_name: userData.last_name || undefined,
                image_url: userData.image_url || undefined,
                updated_at: new Date(),
            })
            .where(eq(users.clerk_id, userData.id));
    }
}

export async function POST(req: Request) {
    // Get the headers
    const headersList = await headers();
    const svix_id = headersList.get('svix-id');
    const svix_timestamp = headersList.get('svix-timestamp');
    const svix_signature = headersList.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', {
            status: 400,
        });
    }

    // Handle the webhook
    const eventType = evt.type;
    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;
        await createOrUpdateUser({ id, email_addresses, username, first_name, last_name, image_url });
    } else if (eventType === 'session.created') {
        const { user_id } = evt.data;
        if (user_id) {
            await updateUserLastSignIn(user_id);
        }
    }

    return new Response('Success', { status: 200 });
}
```

### 2. Clerk Dashboard Configuration

1. Log in to your Clerk Dashboard
2. Navigate to the "Webhooks" section
3. Click "Add Endpoint"
4. Enter your webhook URL (e.g., `https://your-domain.com/api/webhook/clerk`)
5. Select the following events to subscribe to:
    - `user.created`
    - `user.updated`
    - `session.created`
6. Save the webhook
7. Copy the signing secret and add it to your environment variables as `CLERK_WEBHOOK_SECRET`

## User Types and Utilities

Create types for Clerk users:

```typescript
// src/types/clerk.ts
export type ClerkUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    fullName: string;
};

// Define a type for the Clerk API user
export type ClerkApiUser = {
    id: string;
    firstName: string | null;
    lastName: string | null;
    emailAddresses: { emailAddress: string }[];
    imageUrl: string;
    publicMetadata: Record<string, unknown>;
};
```

## Role Management

Create a utility for checking user roles:

```typescript
// src/utils/clerk/roles.ts
import { Roles } from '@/types/globals';
import { auth, clerkClient } from '@clerk/nextjs/server';

export const checkRole = async (role: Roles) => {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        console.log('Role check - No user ID found');
        return false;
    }

    // Check metadata role first (legacy approach)
    const metadata = sessionClaims?.metadata as { role?: Roles } | undefined;

    // If checking for admin role, also check organization membership
    if (role === 'admin') {
        try {
            // Also check if user is in ADMIN organization
            const clerk = await clerkClient();
            const orgResponse = await clerk.users.getOrganizationMembershipList({ userId });
            const userOrgs = orgResponse.data;

            const isAdminOrg = userOrgs.some((org) => org.organization.name === 'ADMIN' || org.organization.name === 'admin');

            // Return true if either metadata role is admin OR user is in ADMIN org
            return metadata?.role === role || isAdminOrg;
        } catch (error) {
            console.error('Error checking organization membership:', error);
            // Fall back to metadata check if org check fails
            return metadata?.role === role;
        }
    }

    // For non-admin roles, just check metadata
    return metadata?.role === role;
};
```

Add the Roles type to globals:

```typescript
// src/types/globals.ts
export type Roles = 'admin' | 'user' | 'moderator';
```

## Server Actions for Authentication

### User Management Actions

```typescript
// src/app/actions/ClerkUsers.Actions.ts
'use server';

import { currentUser } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export type ClerkUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    fullName: string;
};

// Define a type for the Clerk API user
type ClerkApiUser = {
    id: string;
    firstName: string | null;
    lastName: string | null;
    emailAddresses: { emailAddress: string }[];
    imageUrl: string;
    publicMetadata: Record<string, unknown>;
};

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
```

### Admin Authentication Actions

```typescript
// src/app/admin/AdminAuth.action.ts
'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function checkAdminAccess() {
    // Check if user is authenticated
    const { userId } = await auth();

    // If user is not authenticated, redirect to sign-in
    if (!userId) {
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
            redirect('/');
        }

        return true;
    } catch (error) {
        console.error('Error checking organization membership:', error);
        redirect('/');
    }
}
```

## Authentication Components

### Auth Overlay Component

```typescript
// src/components/ui/auth/AuthOverlay.tsx
'use client';

import { SignIn } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface AuthOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    afterSignInUrl?: string;
}

export function AuthOverlay({ isOpen, onClose, afterSignInUrl = '/dashboard' }: AuthOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors">
                            <FiX className="h-5 w-5" />
                        </button>
                        <SignIn
                            afterSignInUrl={afterSignInUrl}
                            routing="hash"
                            appearance={{
                                elements: {
                                    rootBox: 'mx-auto',
                                    card: 'bg-transparent shadow-none',
                                    headerTitle: 'text-gray-900 dark:text-white',
                                    headerSubtitle: 'text-gray-500 dark:text-gray-400',
                                    formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
                                    formFieldInput: 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600',
                                    formFieldLabel: 'text-gray-700 dark:text-gray-300',
                                    footerActionLink: 'text-blue-500 hover:text-blue-600',
                                },
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
```

### Using the Auth Overlay

```typescript
// Example usage in a client component
'use client';

import { useState } from 'react';
import { AuthOverlay } from '@/components/ui/auth/AuthOverlay';
import { Button } from '@/components/ui/button';

export function LoginButton() {
    const [showAuth, setShowAuth] = useState(false);

    return (
        <>
            <Button onClick={() => setShowAuth(true)}>
                Sign In
            </Button>

            <AuthOverlay
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
                afterSignInUrl="/dashboard"
            />
        </>
    );
}
```

## Admin Page Implementation

### Admin Page (Server Component)

```typescript
// src/app/admin/page.tsx
import React from 'react';
import { Suspense } from 'react';
import { Metadata } from 'next';
import AdminContainer from '@/app/admin/Admin.Component';
import GlobalLayoutClient from '@/components/layout/Global.Layout.Client';
import { parseAsStringLiteral } from 'nuqs/server';
import { checkAdminAccess } from './AdminAuth.action';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Administrative dashboard for managing users and settings.',
    robots: {
        index: false,
        follow: false,
    },
};

// Define valid tab values
const validTabs = ['usage', 'chats', 'specs', 'stats', 'users'] as const;

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    // Check admin access - will redirect if not an admin
    await checkAdminAccess();

    // Parse the tab param, defaulting to 'usage' if not set or invalid
    const resolvedParams = await searchParams;
    const tabParam = parseAsStringLiteral(validTabs)
        .withDefault('usage')
        .parseServerSide(resolvedParams.tab ?? '');

    return (
        <div className="h-full w-full bg-background">
            <GlobalLayoutClient noSidebar={true}>
                <Suspense>
                    <AdminContainer initialTab={tabParam} />
                </Suspense>
            </GlobalLayoutClient>
        </div>
    );
}
```

### Admin Container (Client Component)

```typescript
// src/app/admin/Admin.Component.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PageContainer } from '@/components/layout/page/Page.Container';
import { UsageTab } from './_tabs/Usage.Component';
import { ChatsTab } from './_tabs/Chats.Component';
import { SpecsTab } from './_tabs/Specs.Component';
import { Stats } from './_tabs/Stats.Component';
import UsersTab from './_tabs/Users.Component';

interface AdminContainerProps {
    initialTab: string;
}

export default function AdminContainer({ initialTab }: AdminContainerProps) {
    return (
        <PageContainer>
            <div className="flex flex-col w-full h-full items-center p-8 gap-8 overflow-y-auto">
                <div className="flex flex-col w-full h-fit max-w-7xl p-6 gap-4 border shadow-lg rounded-lg">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <Link href="/admin/testing" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                            Testing Area
                        </Link>
                    </div>
                    <nav className="flex flex-row gap-2 w-full rounded-lg px-1 pl-0 items-center justify-start" aria-label="Tabs">
                        {[
                            { value: 'usage', label: 'Usage' },
                            { value: 'chats', label: 'Chats' },
                            { value: 'specs', label: 'Specs' },
                            { value: 'stats', label: 'Stats' },
                            { value: 'users', label: 'Users' },
                        ].map(({ value, label }) => (
                            <Link
                                key={value}
                                href={`/admin?tab=${value}`}
                                className={cn(
                                    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all ' +
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                    initialTab === value
                                        ? 'border border-blue-600 text-blue-600 shadow-sm'
                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                )}>
                                {label}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-2">
                        {initialTab === 'usage' && <UsageTab />}
                        {initialTab === 'chats' && <ChatsTab />}
                        {initialTab === 'specs' && <SpecsTab />}
                        {initialTab === 'stats' && <Stats />}
                        {initialTab === 'users' && <UsersTab />}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
```

### Admin Actions (Server Actions)

Here's a simplified version of the Admin Actions:

```typescript
// src/app/admin/Admin.Actions.ts
'use server';

import { checkRole } from '@/utils/clerk/roles';
import { clerkClient } from '@clerk/nextjs/server';
import { db } from '@/db/db';
import { users } from '@/db/db';
import { eq } from 'drizzle-orm';

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
        const allUsers = await db.select().from(users).orderBy({ created_at: 'desc' });
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
                    like(users.username, `%${searchTerm}%`),
                    like(users.first_name, `%${searchTerm}%`),
                    like(users.last_name, `%${searchTerm}%`)
                )
            )
            .orderBy({ created_at: 'desc' });

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
```

### Users Component (Client Component)

Here's a simplified version of the Users Component:

```typescript
// src/app/admin/_tabs/Users.Component.tsx
'use client';

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { fetchAllUsers, searchUsers, fetchUserUsage } from '@/app/admin/Admin.Actions';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserDetailsOverlay } from '@/components/ui/user-details-overlay';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { EyeIcon, SearchIcon } from 'lucide-react';

export default function UsersTab() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userUsage, setUserUsage] = useState(null);
    const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false);

    const filteredUsers = useMemo(() => {
        // Filter users based on search term
        return users.filter((user) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                user.email.toLowerCase().includes(searchLower) ||
                (user.first_name && user.first_name.toLowerCase().includes(searchLower)) ||
                (user.last_name && user.last_name.toLowerCase().includes(searchLower)) ||
                (user.username && user.username.toLowerCase().includes(searchLower))
            );
        });
    }, [users, searchTerm]);

    const handleViewUser = async (user) => {
        setSelectedUser(user);
        setIsLoadingUserDetails(true);
        setIsOverlayOpen(true);

        try {
            const response = await fetchUserUsage(user.clerk_id);
            if (response.success) {
                setUserUsage(response.data);
            } else {
                toast.error(`Error loading user details: ${response.message}`);
            }
        } catch (error) {
            toast.error('Failed to load user details');
        } finally {
            setIsLoadingUserDetails(false);
        }
    };

    const loadUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetchAllUsers();
            if (res.success) {
                setUsers(res.data);
            } else {
                toast.error(res.message || 'Failed to load users');
            }
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    return (
        <div className="grid gap-4">
            <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Users</h3>
                    <div className="w-1/3 relative">
                        <Input
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={() => handleSearch()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md">
                            <SearchIcon size={16} />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{`${user.first_name || ''} ${user.last_name || ''}`}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.username || '-'}</TableCell>
                                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleViewUser(user)}
                                                className="flex items-center gap-2">
                                                <EyeIcon className="h-4 w-4" /> View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </Card>

            <UserDetailsOverlay
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                user={selectedUser}
                userUsage={userUsage}
                loading={isLoadingUserDetails}
            />
        </div>
    );
}
```

## Setting Up Clerk Organizations for Admin Access

1. Create an organization named "ADMIN" in the Clerk dashboard
2. Invite users who should have admin privileges to this organization
3. Use the `checkAdminAccess` function to verify admin access in protected routes

## Conclusion

This implementation provides a comprehensive authentication system with:

1. User authentication via Clerk
2. Role-based access control
3. Admin dashboard with user management
4. Webhook integration for syncing user data with your database
5. Protected routes and components

Remember to configure your Clerk dashboard settings to match this implementation, especially for webhooks and organizations.
