'use server';

import { checkRole } from '@/utils/clerk/roles';
import { db, kanban_issue, kanban_message, kanban_sprint } from '@/db/db';
import { InsertKanbanIssue, KanbanIssue, KanbanMessage, InsertKanbanSprint, KanbanSprint } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq, asc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import {
    sendKanbanIssueNotification,
    sendKanbanStatusChangeNotification,
    sendKanbanCommentNotification,
} from '@/app/actions/email.actions';

type ErrorResponse = {
    message: string;
    success: false;
    errorType?: 'auth' | 'database' | 'unknown';
};

type SuccessResponse<T> = {
    success: true;
    data: T;
};

// Helper function to check admin access
async function checkAdminPermission(): Promise<boolean | ErrorResponse> {
    // Verify user is an admin
    if (!(await checkRole('admin'))) {
        return {
            message: 'You do not have admin privileges to perform this action',
            success: false,
            errorType: 'auth',
        };
    }
    return true;
}

// Fetch all kanban issues
export async function fetchAllKanbanIssues(): Promise<SuccessResponse<KanbanIssue[]> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        const issues = await db.select().from(kanban_issue).orderBy(asc(kanban_issue.created_at));
        return {
            success: true,
            data: issues,
        };
    } catch (err) {
        console.error('Error fetching kanban issues:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to fetch kanban issues'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Create a new kanban issue
export async function createKanbanIssue(formData: FormData): Promise<SuccessResponse<KanbanIssue> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        // Get the current user for the reporter field
        const { userId } = await auth();
        if (!userId) {
            return {
                message: 'Authentication required',
                success: false,
                errorType: 'auth',
            };
        }

        // Get sprint UUIDs from formData
        const sprintUuids = (formData.get('sprints') as string) || '';

        const newIssue: InsertKanbanIssue = {
            uuid: uuidv4(),
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            priority: formData.get('priority') as string,
            points: parseInt(formData.get('points') as string) || null,
            type: formData.get('type') as string,
            status: (formData.get('status') as string) || 'backlog',
            reporter: userId,
            assignee: (formData.get('assignee') as string) || null,
            developer: (formData.get('developer') as string) || null,
            mail_list: (formData.get('mail_list') as string) || null,
            sprints: sprintUuids,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const [issue] = await db.insert(kanban_issue).values(newIssue).returning();

        // Send email notification for new issue
        if (issue.mail_list) {
            await sendKanbanIssueNotification({
                issue,
                actionType: 'created',
                actionBy: userId,
            }).catch((error) => {
                console.error('Failed to send notification email:', error);
                // Don't fail the issue creation if email sending fails
            });
        }

        return {
            success: true,
            data: issue,
        };
    } catch (err) {
        console.error('Error creating kanban issue:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to create kanban issue'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Update an existing kanban issue
export async function updateKanbanIssue(issueUuid: string, formData: FormData): Promise<SuccessResponse<KanbanIssue> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        // Get current issue to check status changes
        const [currentIssue] = await db.select().from(kanban_issue).where(eq(kanban_issue.uuid, issueUuid));
        if (!currentIssue) {
            return {
                message: `Issue with uuid ${issueUuid} not found`,
                success: false,
                errorType: 'database',
            };
        }

        const status = formData.get('status') as string;
        const previousStatus = currentIssue.status;
        const statusChanged = status !== previousStatus;

        const updateData: Partial<InsertKanbanIssue> = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            priority: formData.get('priority') as string,
            points: parseInt(formData.get('points') as string) || null,
            type: formData.get('type') as string,
            status,
            reporter: formData.get('reporter') as string,
            assignee: (formData.get('assignee') as string) || null,
            developer: (formData.get('developer') as string) || null,
            mail_list: (formData.get('mail_list') as string) || null,
            sprints: (formData.get('sprints') as string) || '',
            updated_at: new Date(),
        };

        // Set completed_at timestamp if status is 'completed'
        if (status === 'completed') {
            updateData.completed_at = new Date();
        } else {
            // Clear completed_at if status is not 'completed'
            updateData.completed_at = null;
        }

        const [updatedIssue] = await db.update(kanban_issue).set(updateData).where(eq(kanban_issue.uuid, issueUuid)).returning();

        if (!updatedIssue) {
            return {
                message: `Issue with uuid ${issueUuid} not found`,
                success: false,
                errorType: 'database',
            };
        }

        // Get current user for notifications
        const { userId } = await auth();

        // Send email notification based on the type of update
        if (updatedIssue.mail_list) {
            if (statusChanged) {
                // Status changed notification
                await sendKanbanStatusChangeNotification(updatedIssue, previousStatus, userId ? userId : 'Unknown').catch((error) => {
                    console.error('Failed to send status change notification email:', error);
                });
            } else {
                // General update notification
                await sendKanbanIssueNotification({
                    issue: updatedIssue,
                    actionType: 'updated',
                    actionBy: userId ? userId : 'Unknown',
                }).catch((error) => {
                    console.error('Failed to send update notification email:', error);
                });
            }
        }

        return {
            success: true,
            data: updatedIssue,
        };
    } catch (err) {
        console.error('Error updating kanban issue:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to update kanban issue'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Update the status of a kanban issue (for drag and drop)
export async function updateKanbanIssueStatus(issueUuid: string, status: string): Promise<SuccessResponse<KanbanIssue> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        // Get current issue to check status changes
        const [currentIssue] = await db.select().from(kanban_issue).where(eq(kanban_issue.uuid, issueUuid));
        if (!currentIssue) {
            return {
                message: `Issue with uuid ${issueUuid} not found`,
                success: false,
                errorType: 'database',
            };
        }

        const previousStatus = currentIssue.status;
        const statusChanged = status !== previousStatus;

        const updateData: Partial<InsertKanbanIssue> = {
            status,
            updated_at: new Date(),
        };

        // Set completed_at timestamp if status is 'completed'
        if (status === 'completed') {
            updateData.completed_at = new Date();
        } else {
            // Clear completed_at if status is not 'completed'
            updateData.completed_at = null;
        }

        const [updatedIssue] = await db.update(kanban_issue).set(updateData).where(eq(kanban_issue.uuid, issueUuid)).returning();

        if (!updatedIssue) {
            return {
                message: `Issue with uuid ${issueUuid} not found`,
                success: false,
                errorType: 'database',
            };
        }

        // Send email notification if status changed
        if (statusChanged && updatedIssue.mail_list) {
            // Get current user for notification
            const { userId } = await auth();

            await sendKanbanStatusChangeNotification(updatedIssue, previousStatus, userId ? userId : 'Unknown').catch((error) => {
                console.error('Failed to send status change notification email:', error);
            });
        }

        return {
            success: true,
            data: updatedIssue,
        };
    } catch (err) {
        console.error('Error updating kanban issue status:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to update kanban issue status'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Delete a kanban issue
export async function deleteKanbanIssue(issueUuid: string): Promise<SuccessResponse<{ deleted: boolean }> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        // First delete any associated messages
        await db.delete(kanban_message).where(eq(kanban_message.issue_uuid, issueUuid));

        // Then delete the issue
        await db.delete(kanban_issue).where(eq(kanban_issue.uuid, issueUuid));

        return {
            success: true,
            data: { deleted: true },
        };
    } catch (err) {
        console.error('Error deleting kanban issue:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to delete kanban issue'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Fetch messages for a specific issue
export async function fetchMessagesForIssue(issueUuid: string): Promise<SuccessResponse<KanbanMessage[]> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        const messages = await db
            .select()
            .from(kanban_message)
            .where(eq(kanban_message.issue_uuid, issueUuid))
            .orderBy(asc(kanban_message.created_at));

        return {
            success: true,
            data: messages,
        };
    } catch (err) {
        console.error('Error fetching messages for issue:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to fetch messages for issue'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Add a message to an issue
export async function addMessageToIssue(issueUuid: string, comment: string): Promise<SuccessResponse<KanbanMessage> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        // Get the current user
        const { userId } = await auth();
        if (!userId) {
            return {
                message: 'Authentication required',
                success: false,
                errorType: 'auth',
            };
        }

        // Get the issue to check for mail list
        const [issue] = await db.select().from(kanban_issue).where(eq(kanban_issue.uuid, issueUuid));
        if (!issue) {
            return {
                message: `Issue with uuid ${issueUuid} not found`,
                success: false,
                errorType: 'database',
            };
        }

        // Create the new message
        const newMessage = {
            uuid: uuidv4(),
            issue_uuid: issueUuid,
            user_id: userId,
            comment,
            created_at: new Date(),
        };

        const [message] = await db.insert(kanban_message).values(newMessage).returning();

        // Send email notification for new comment
        if (issue.mail_list) {
            await sendKanbanCommentNotification(issue, message, userId).catch((error) => {
                console.error('Failed to send comment notification email:', error);
            });
        }

        return {
            success: true,
            data: message,
        };
    } catch (err) {
        console.error('Error adding message to issue:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to add message to issue'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Fetch a single kanban issue by UUID
export async function fetchKanbanIssue(issueUuid: string): Promise<SuccessResponse<KanbanIssue> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        const [issue] = await db.select().from(kanban_issue).where(eq(kanban_issue.uuid, issueUuid));

        if (!issue) {
            return {
                message: `Issue with uuid ${issueUuid} not found`,
                success: false,
                errorType: 'database',
            };
        }

        return {
            success: true,
            data: issue,
        };
    } catch (err) {
        console.error('Error fetching kanban issue:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to fetch kanban issue'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Update a sprint
export async function updateSprint(sprintUuid: string, formData: FormData): Promise<SuccessResponse<KanbanSprint> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        const updateData: Partial<InsertKanbanSprint> = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            start_date: new Date(formData.get('start_date') as string),
            end_date: new Date(formData.get('end_date') as string),
            is_active: formData.get('is_active') === 'true',
            updated_at: new Date(),
        };

        const [updatedSprint] = await db.update(kanban_sprint).set(updateData).where(eq(kanban_sprint.uuid, sprintUuid)).returning();

        if (!updatedSprint) {
            return {
                message: `Sprint with uuid ${sprintUuid} not found`,
                success: false,
                errorType: 'database',
            };
        }

        return {
            success: true,
            data: updatedSprint,
        };
    } catch (err) {
        console.error('Error updating sprint:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to update sprint'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Create a new sprint
export async function createSprint(formData: FormData): Promise<SuccessResponse<KanbanSprint> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        const newSprint: InsertKanbanSprint = {
            uuid: uuidv4(),
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            start_date: new Date(formData.get('start_date') as string),
            end_date: new Date(formData.get('end_date') as string),
            is_active: formData.get('is_active') === 'true',
            created_at: new Date(),
            updated_at: new Date(),
        };

        const [sprint] = await db.insert(kanban_sprint).values(newSprint).returning();

        return {
            success: true,
            data: sprint,
        };
    } catch (err) {
        console.error('Error creating sprint:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to create sprint'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Delete a sprint
export async function deleteSprint(sprintUuid: string): Promise<SuccessResponse<{ deleted: boolean }> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        // Delete the sprint
        await db.delete(kanban_sprint).where(eq(kanban_sprint.uuid, sprintUuid));

        // Remove this sprint from all issues that reference it
        const issues = await db.select().from(kanban_issue);
        for (const issue of issues) {
            if (issue.sprints) {
                const sprintIds = issue.sprints.split(',').filter((id) => id !== sprintUuid);
                await db
                    .update(kanban_issue)
                    .set({ sprints: sprintIds.join(',') })
                    .where(eq(kanban_issue.uuid, issue.uuid));
            }
        }

        return {
            success: true,
            data: { deleted: true },
        };
    } catch (err) {
        console.error('Error deleting sprint:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to delete sprint'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Fetch all sprints
export async function fetchAllSprints(): Promise<SuccessResponse<KanbanSprint[]> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        const sprints = await db.select().from(kanban_sprint).orderBy(asc(kanban_sprint.start_date));
        return {
            success: true,
            data: sprints,
        };
    } catch (err) {
        console.error('Error fetching sprints:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to fetch sprints'}`,
            success: false,
            errorType: 'database',
        };
    }
}

// Update an issue with sprint assignments
export async function updateIssueSprintAssignments(
    issueUuid: string,
    sprintUuids: string[]
): Promise<SuccessResponse<KanbanIssue> | ErrorResponse> {
    const authCheck = await checkAdminPermission();
    if (authCheck !== true) {
        return authCheck as ErrorResponse;
    }

    try {
        const [updatedIssue] = await db
            .update(kanban_issue)
            .set({
                sprints: sprintUuids.join(','),
                updated_at: new Date(),
            })
            .where(eq(kanban_issue.uuid, issueUuid))
            .returning();

        if (!updatedIssue) {
            return {
                message: `Issue with uuid ${issueUuid} not found`,
                success: false,
                errorType: 'database',
            };
        }

        return {
            success: true,
            data: updatedIssue,
        };
    } catch (err) {
        console.error('Error updating issue sprint assignments:', err);
        return {
            message: `Database error: ${err instanceof Error ? err.message : 'Failed to update issue sprint assignments'}`,
            success: false,
            errorType: 'database',
        };
    }
}
