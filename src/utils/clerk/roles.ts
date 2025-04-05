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
