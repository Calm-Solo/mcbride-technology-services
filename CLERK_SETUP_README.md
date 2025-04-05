# Clerk Authentication Setup

This document outlines the steps to properly set up Clerk authentication in your Next.js application, including fixing common redirection issues.

## Environment Variables

Create a `.env.local` file with the following Clerk-related environment variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_***  # Your Clerk publishable key
CLERK_SECRET_KEY=sk_test_***                   # Your Clerk secret key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in         # URL for sign-in page
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up         # URL for sign-up page
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/          # URL to redirect to after sign-in (homepage)
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/          # URL to redirect to after sign-up (homepage)
CLERK_WEBHOOK_SECRET=whsec_***                 # Secret for Clerk webhook verification
```

## Fixing Common Redirection Issues

### Problem: Redirecting to `/sign-in/sso-callback` after authentication

This happens because Clerk is using an internal URL for SSO processing, but not properly redirecting afterward.

### Fix 1: Environment Variables

Ensure that your environment variables are correctly set:

```bash
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Fix 2: Component Props

Make sure all your Clerk components have the proper redirection URLs:

1. **Sign-in page** (`src/app/sign-in/page.tsx`):

    ```tsx
    <SignIn afterSignInUrl="/" />
    ```

2. **Sign-up page** (`src/app/sign-up/page.tsx`):

    ```tsx
    <SignUp afterSignUpUrl="/" />
    ```

3. **Auth overlay** (`src/components/ui/auth/AuthOverlay.tsx`):

    ```tsx
    export function AuthOverlay({ isOpen, onClose, afterSignInUrl = '/' }) {
        // Component code
    }
    ```

4. **Login button** (`src/components/ui/auth/LoginButton.tsx`):
    ```tsx
    export function LoginButton({ className, afterSignInUrl = '/' }) {
        // Component code
    }
    ```

### Fix 3: Clerk Dashboard Settings

1. Log in to your [Clerk Dashboard](https://dashboard.clerk.dev/)
2. Navigate to your application settings
3. Go to the "Paths" or "Redirect URLs" section
4. Set "After sign-in URL" to `/`
5. Set "After sign-up URL" to `/`
6. Save your changes

## Setting Up Admin Organization

To enable admin functionality:

1. Go to your [Clerk Dashboard](https://dashboard.clerk.dev/)
2. Navigate to "Organizations"
3. Create a new organization named "ADMIN"
4. Invite the users who should have admin access to this organization

## Webhook Setup

1. Go to your [Clerk Dashboard](https://dashboard.clerk.dev/)
2. Navigate to "Webhooks"
3. Add a new webhook endpoint pointing to `https://your-domain.com/api/webhook/clerk`
4. Select the following events to subscribe to:
    - `user.created`
    - `user.updated`
    - `session.created`
5. Copy the webhook secret and add it to your environment variables as `CLERK_WEBHOOK_SECRET`

## Testing Authentication

After implementing these changes, you should be properly redirected to the homepage after signing in or signing up, instead of seeing the `/sign-in/sso-callback` URL.

## Troubleshooting

If you're still experiencing redirection issues:

1. Clear your browser cookies and cache
2. Restart your development server
3. Check the Network tab in your browser's developer tools to see the redirect chain
4. Ensure your Clerk version is up-to-date in `package.json`
5. Try using a private/incognito browser window for testing
