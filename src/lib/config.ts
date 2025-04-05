import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Email
export const RESEND_API_KEY = process.env.RESEND_API_KEY as string;
export const EMAIL_FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS || 'noreply@yourappname.com';

// Validate environment variables
export function validateEnvVars() {
    const requiredEnvVars = [
        { name: 'RESEND_API_KEY', value: RESEND_API_KEY },
        // ... existing env vars ...
    ];

    const missingEnvVars = requiredEnvVars.filter(({ value }) => !value).map(({ name }) => name);

    if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }
}
