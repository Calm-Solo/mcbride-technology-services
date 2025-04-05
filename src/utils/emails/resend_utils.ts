'use server';

import { Resend } from 'resend';
import { clerkClient } from '@clerk/nextjs/server';
import { getClerkUser } from '@/app/actions/ClerkUsers.actions';

const resend = new Resend(process.env.RESEND_API_KEY);

export type SendEmailParams = {
    to: string | string[];
    subject: string;
    html: string;
    from?: string;
    text?: string;
};

/**
 * Sends an email using Resend
 */
export async function sendEmail({ to, subject, html, text, from }: SendEmailParams) {
    // Default from address if not provided
    const fromAddress = from || process.env.EMAIL_FROM || 'notifications@example.com';

    try {
        // Convert 'to' to array if it's a string
        const recipients = typeof to === 'string' ? [to] : to;

        // Send the email
        const { data, error } = await resend.emails.send({
            from: fromAddress,
            to: recipients,
            subject,
            html,
            text,
        });

        if (error) {
            console.error('Error sending email:', error);
            throw new Error(`Failed to send email: ${error.message}`);
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error in sendEmail:', error);
        throw error;
    }
}

/**
 * Parse a string with comma-separated email addresses or Clerk user IDs
 * and return an array of email addresses
 */
export async function parseEmailList(mailList?: string): Promise<string[]> {
    if (!mailList) {
        return [];
    }

    // Split the string and trim each entry
    const entries = mailList.split(',').map((entry) => entry.trim());
    const emails: string[] = [];

    // Process each entry - could be an email or a clerk user ID
    for (const entry of entries) {
        if (!entry) continue;

        // Check if it's an email (simple regex check)
        if (entry.match(/^\S+@\S+\.\S+$/)) {
            emails.push(entry);
        } else {
            // Try to get the user's email from Clerk
            try {
                const user = await getClerkUser(entry);
                if (user?.email) {
                    emails.push(user.email);
                } else {
                    console.warn(`Couldn't find an email for user ID: ${entry}`);
                }
            } catch (error) {
                console.error(`Error getting email for user ID ${entry}:`, error);
            }
        }
    }

    return emails;
}

/**
 * Get the email address for a Clerk user ID
 */
export async function getEmailFromClerkId(clerkId: string): Promise<string | null> {
    try {
        if (!clerkId) return null;

        // Get the user's record from Clerk
        const clerk = await clerkClient();
        const user = await clerk.users.getUser(clerkId);

        // Get the primary email
        const primaryEmail = user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId);

        return primaryEmail?.emailAddress || null;
    } catch (error) {
        console.error(`Error getting email for clerk ID ${clerkId}:`, error);
        return null;
    }
}
