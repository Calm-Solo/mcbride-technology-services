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
