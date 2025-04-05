'use server';

import React from 'react';
import { render } from '@react-email/render';
import { KanbanIssue, KanbanMessage } from '@/db/schema';
import { sendEmail, parseEmailList } from '@/utils/emails/resend_utils';
import KanbanIssueEmail, { KanbanIssueEmailProps } from '@/utils/emails/templates/KanbanIssueEmail';

type SendKanbanNotificationResult = {
    success: boolean;
    message?: string;
    error?: unknown;
};

/**
 * Sends a notification email about a Kanban issue
 */
export async function sendKanbanIssueNotification({
    issue,
    actionType,
    actionBy,
    comment,
    baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
}: Omit<KanbanIssueEmailProps, 'baseUrl'> & { baseUrl?: string }): Promise<SendKanbanNotificationResult> {
    try {
        // Get the list of recipients from the mail_list field
        const recipients = await parseEmailList(issue.mail_list || '');

        // If there are no recipients, return early
        if (recipients.length === 0) {
            return {
                success: false,
                message: 'No valid recipients found in mail_list',
            };
        }

        // Create subject based on action type
        let subject: string;
        switch (actionType) {
            case 'created':
                subject = `New Kanban Issue: ${issue.title}`;
                break;
            case 'updated':
                subject = `Kanban Issue Updated: ${issue.title}`;
                break;
            case 'statusChanged':
                subject = `Kanban Issue Status Changed: ${issue.title} is now ${issue.status.replace('_', ' ')}`;
                break;
            case 'assigned':
                subject = `Kanban Issue Assigned: ${issue.title}`;
                break;
            case 'commented':
                subject = `New Comment on Kanban Issue: ${issue.title}`;
                break;
            default:
                subject = `Kanban Issue Update: ${issue.title}`;
        }

        // Create the email with React
        const emailProps: KanbanIssueEmailProps = {
            issue,
            actionType,
            actionBy,
            comment,
            baseUrl,
        };

        // Create and render the email component
        const emailComponent = React.createElement(KanbanIssueEmail, emailProps);
        const htmlEmail = await render(emailComponent);

        // Send the email
        await sendEmail({
            to: recipients,
            subject,
            html: htmlEmail,
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending Kanban notification:', error);
        return {
            success: false,
            message: 'Failed to send email notification',
            error,
        };
    }
}

/**
 * Sends a notification when a new comment is added to a Kanban issue
 */
export async function sendKanbanCommentNotification(
    issue: KanbanIssue,
    message: KanbanMessage,
    commenterName: string
): Promise<SendKanbanNotificationResult> {
    return sendKanbanIssueNotification({
        issue,
        actionType: 'commented',
        actionBy: commenterName,
        comment: message.comment,
    });
}

/**
 * Sends a notification when a Kanban issue status changes
 */
export async function sendKanbanStatusChangeNotification(
    issue: KanbanIssue,
    previousStatus: string,
    updatedByName: string
): Promise<SendKanbanNotificationResult> {
    return sendKanbanIssueNotification({
        issue,
        actionType: 'statusChanged',
        actionBy: updatedByName,
        comment: `Status changed from "${previousStatus}" to "${issue.status}"`,
    });
}

/**
 * Test function to verify the email system works
 * Only for development/testing purposes
 */
export async function testEmailSystem(recipientEmail: string): Promise<SendKanbanNotificationResult> {
    try {
        if (!recipientEmail) {
            return {
                success: false,
                message: 'Recipient email is required',
            };
        }

        // Create a mock issue
        const mockIssue = {
            id: 999,
            uuid: 'test-uuid-123',
            title: 'Test Email System',
            description: 'This is a test email to verify that the Resend email system works correctly.',
            priority: 'medium',
            points: 3,
            type: 'task',
            status: 'backlog',
            reporter: 'test-user',
            assignee: 'test-assignee',
            developer: 'test-developer',
            mail_list: recipientEmail,
            sprints: '',
            created_at: new Date(),
            updated_at: new Date(),
            completed_at: null,
        } as KanbanIssue;

        // Create email props
        const emailProps: KanbanIssueEmailProps = {
            issue: mockIssue,
            actionType: 'created',
            actionBy: 'Test User',
            comment: 'This is a test notification. If you received this, the email system is working!',
            baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        };

        // Create and render the email component
        const emailComponent = React.createElement(KanbanIssueEmail, emailProps);
        const htmlEmail = await render(emailComponent);

        // Check if the recipient is a user ID or an email address
        const recipients = await parseEmailList(recipientEmail);

        if (recipients.length === 0) {
            // If no valid emails, just use the input directly
            // This allows testing with direct email addresses
            recipients.push(recipientEmail);
        }

        // Send the email
        await sendEmail({
            to: recipients,
            subject: 'Test Email: Kanban Notification System',
            html: htmlEmail,
        });

        return {
            success: true,
            message: `Test email sent to ${recipientEmail}`,
        };
    } catch (error) {
        console.error('Error sending test email:', error);
        return {
            success: false,
            message: 'Failed to send test email',
            error,
        };
    }
}
