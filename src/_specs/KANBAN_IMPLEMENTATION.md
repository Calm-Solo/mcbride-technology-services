# Kanban Board Implementation Guide

This document outlines the steps needed to implement a Kanban board feature similar to the one in the current project. This guide is designed for an AI agent to follow and implement in one shot.

## Overview

The Kanban board is a project management tool that helps visualize work, limit work-in-progress, and maximize efficiency. This implementation includes:

- A drag-and-drop interface for task management
- Sprint planning and tracking
- Issue creation and management
- Comment system on issues
- Email notifications for changes
- Burndown charts for sprint visualization

## Prerequisites

- Next.js project with TypeScript
- PostgreSQL database or Neon serverless Postgres
- Clerk authentication
- Drizzle ORM
- Resend for email notifications
- Zustand for state management

## Implementation Steps

### 1. Database Setup

#### 1.1 Database Tables

Create the following tables in your database schema:

```typescript
// Add these to your schema.ts file
import { pgTable, integer, varchar, timestamp, text, serial, real, uuid, boolean } from 'drizzle-orm/pg-core';
import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';

export const kanban_issue = pgTable('kanban_issue', {
    id: serial('id').primaryKey(),
    uuid: uuid('uuid').notNull().unique(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    priority: text('priority').notNull(),
    points: integer('points'),
    type: text('type').notNull(),
    status: text('status').notNull().default('backlog'),
    reporter: text('reporter').notNull(),
    assignee: text('assignee'),
    developer: text('developer'),
    mail_list: text('mail_list'),
    sprints: text('sprints').default(''), // Comma-separated list of sprint UUIDs
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    completed_at: timestamp('completed_at'),
});

export const kanban_message = pgTable('kanban_message', {
    id: serial('id').primaryKey(),
    uuid: uuid('uuid').notNull().unique(),
    issue_uuid: uuid('issue_uuid')
        .notNull()
        .references(() => kanban_issue.uuid),
    comment: text('comment').notNull(),
    user: text('user').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const kanban_sprint = pgTable('kanban_sprint', {
    id: serial('id').primaryKey(),
    uuid: uuid('uuid').notNull().unique(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    start_date: timestamp('start_date').notNull(),
    end_date: timestamp('end_date').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    is_active: boolean('is_active').notNull().default(false),
});

// Add these types to your schema.ts file
export type KanbanIssue = InferSelectModel<typeof kanban_issue>;
export type InsertKanbanIssue = InferInsertModel<typeof kanban_issue>;
export type KanbanMessage = InferSelectModel<typeof kanban_message>;
export type InsertKanbanMessage = InferInsertModel<typeof kanban_message>;
export type KanbanSprint = InferSelectModel<typeof kanban_sprint>;
export type InsertKanbanSprint = InferInsertModel<typeof kanban_sprint>;
```

#### 1.2 Database Connection

Make sure these tables are exported in your db.ts file:

```typescript
// Add to your db.ts file
export {
    // ... existing exports
    kanban_issue,
    kanban_message,
    kanban_sprint,
};
```

### 2. File Structure

Create the following file structure:

```
src/
├── app/
│   ├── admin/
│   │   ├── kanban/
│   │   │   ├── components/
│   │   │   │   ├── KanbanBoard.Client.tsx
│   │   │   │   ├── KanbanToolbar.Client.tsx
│   │   │   │   ├── SprintSection.Client.tsx
│   │   │   ├── Kanban.Actions.ts
│   │   │   ├── Kanban.Store.ts
│   │   │   ├── page.tsx
│   │   ├── issue/
│   │   │   ├── components/
│   │   │   │   ├── LabeledInput.tsx
│   │   │   │   ├── MarkdownEditorOverlay.tsx
│   │   │   │   ├── TitleEdit.Overlay.tsx
│   │   │   ├── Issue.Main.Client.tsx
│   │   │   ├── Issue.Store.ts
│   │   │   ├── page.tsx
├── components/
│   ├── kanban/
│   │   ├── BurndownChart.tsx
│   │   ├── IssueCreate.Modal.tsx
│   │   ├── SprintCreate.Modal.tsx
│   │   ├── SprintEdit.Modal.tsx
├── styles/
│   ├── KanbanMarkdown.module.css
├── utils/
│   ├── emails/
│   │   ├── templates/
│   │   │   ├── KanbanIssueEmail.tsx
│   │   ├── resend_utils.ts
```

### 3. Required Dependencies

Make sure your package.json includes these dependencies (versions updated as per your current project):

```json
{
    "dependencies": {
        "@clerk/nextjs": "^6.12.0",
        "@neondatabase/serverless": "^0.9.5",
        "@radix-ui/react-avatar": "^1.1.3",
        "@radix-ui/react-checkbox": "^1.1.4",
        "@radix-ui/react-dialog": "^1.1.6",
        "@radix-ui/react-label": "^2.1.2",
        "@radix-ui/react-popover": "^1.1.6",
        "@radix-ui/react-select": "^2.1.6",
        "@radix-ui/react-tooltip": "^1.1.8",
        "@react-email/components": "^0.0.34",
        "@react-email/render": "^1.0.5",
        "date-fns": "^4.1.0",
        "drizzle-orm": "^0.30.10",
        "drizzle-kit": "^0.20.18",
        "lucide-react": "^0.471.2",
        "react-dnd": "^16.0.1",
        "react-dnd-html5-backend": "^16.0.1",
        "react-hot-toast": "^2.5.2",
        "react-markdown": "^10.1.0",
        "react-mde": "^11.5.0",
        "react-tooltip": "^5.28.0",
        "recharts": "^2.15.1",
        "remark-gfm": "^4.0.1",
        "resend": "^4.2.0",
        "uuid": "^11.0.5",
        "zustand": "4.5.5"
    }
}
```

Run `pnpm install` after adding these dependencies (or use your preferred package manager).

### 4. Core Files to Copy

The following files should be copied from the original project and modified as needed:

#### 4.1 Store and State Management

Copy `src/app/admin/kanban/Kanban.Store.ts` - This file manages the state of the Kanban board using Zustand.

```typescript
// Modify the paths to ensure they match your project structure
import { create } from 'zustand';
import { KanbanIssue, KanbanSprint } from '@/db/schema';

export type IssueStatus = 'backlog' | 'groomed' | 'in_progress' | 'in_review' | 'blocked' | 'completed';
export type IssuePriority = 'low' | 'medium' | 'high' | 'critical';
export type IssueType = 'bug' | 'feature' | 'improvement' | 'task';

interface KanbanStore {
    issues: KanbanIssue[];
    setIssues: (issues: KanbanIssue[]) => void;
    addIssue: (issue: KanbanIssue) => void;
    updateIssue: (issue: KanbanIssue) => void;
    removeIssue: (issueUuid: string) => void;
    selectedIssue: KanbanIssue | null;
    setSelectedIssue: (issue: KanbanIssue | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (isOpen: boolean) => void;

    // Sprint related state
    sprints: KanbanSprint[];
    setSprints: (sprints: KanbanSprint[]) => void;
    addSprint: (sprint: KanbanSprint) => void;
    updateSprint: (sprint: KanbanSprint) => void;
    removeSprint: (sprintUuid: string) => void;
    selectedSprint: KanbanSprint | null;
    setSelectedSprint: (sprint: KanbanSprint | null) => void;
    isCreateSprintModalOpen: boolean;
    setIsCreateSprintModalOpen: (isOpen: boolean) => void;
    isSprintLoading: boolean;
    setIsSprintLoading: (isLoading: boolean) => void;

    // Edit sprint related state
    isEditSprintModalOpen: boolean;
    setIsEditSprintModalOpen: (isOpen: boolean) => void;
    sprintToEdit: KanbanSprint | null;
    setSprintToEdit: (sprint: KanbanSprint | null) => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
    // Store implementation - keep as is, just update imports
}));
```

#### 4.2 Server Actions

Copy `src/app/admin/kanban/Kanban.Actions.ts` - This file contains server actions for CRUD operations. Update the imports to match your project structure.

```typescript
// Modify the import paths to match your project structure
'use server';

import { checkRole } from '@/utils/clerk/roles'; // You'll need to implement this in your project
import { db, kanban_issue, kanban_message, kanban_sprint } from '@/db/db';
import { InsertKanbanIssue, InsertKanbanMessage, KanbanIssue, KanbanMessage, InsertKanbanSprint, KanbanSprint } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq, asc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import {
    sendKanbanIssueNotification,
    sendKanbanStatusChangeNotification,
    sendKanbanCommentNotification,
} from '@/app/actions/email.actions'; // You'll need to implement these
```

#### 4.3 Email Actions and Templates

Copy and adjust these files:

- `src/utils/emails/resend_utils.ts` - Utility functions for sending emails
- `src/utils/emails/templates/KanbanIssueEmail.tsx` - Email template for Kanban notifications
- `src/app/actions/email.actions.ts` - Server actions for sending emails

Make sure to adjust the imports and exports to match your project structure.

For `resend_utils.ts`, you'll need to:

1. Set up the Resend API key
2. Create functions for sending emails
3. Implement a helper for parsing email lists

```typescript
// src/utils/emails/resend_utils.ts
import { Resend } from 'resend';
import { RESEND_API_KEY, EMAIL_FROM_ADDRESS } from '@/lib/config'; // Adjust for your config system
import { getUserEmailsByIds } from '@/app/actions/ClerkUsers.Actions';

// Initialize Resend with the API key
const resend = new Resend(RESEND_API_KEY);

export type SendEmailParams = {
    from?: string;
    to: string[];
    subject: string;
    html: string;
    replyTo?: string;
};

// Send an email using Resend API
export async function sendEmail({ from, to, subject, html, replyTo }: SendEmailParams) {
    if (!RESEND_API_KEY) {
        console.error('RESEND_API_KEY is missing');
        throw new Error('Missing Resend API key');
    }

    try {
        const { data, error } = await resend.emails.send({
            from: from || EMAIL_FROM_ADDRESS,
            to,
            subject,
            html,
            replyTo: replyTo,
        });

        if (error) {
            console.error('Error sending email:', error);
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Parse email list function
export async function parseEmailList(mailList: string | null | undefined): Promise<string[]> {
    // Implementation details - see original file
}
```

For email actions:

```typescript
// src/app/actions/email.actions.ts
'use server';

import React from 'react';
import { render } from '@react-email/render';
import { KanbanIssue, KanbanMessage } from '@/db/schema';
import { sendEmail, parseEmailList } from '@/utils/emails/resend_utils';
import KanbanIssueEmail, { KanbanIssueEmailProps } from '@/utils/emails/templates/KanbanIssueEmail';

// Implementation of server actions for sending emails
export async function sendKanbanIssueNotification({
    issue,
    actionType,
    actionBy,
    comment,
    baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
}: Omit<KanbanIssueEmailProps, 'baseUrl'> & { baseUrl?: string }) {
    // Implementation details - see original file
}

export async function sendKanbanCommentNotification(issue: KanbanIssue, message: KanbanMessage, commenterName: string) {
    // Implementation details - see original file
}

export async function sendKanbanStatusChangeNotification(issue: KanbanIssue, previousStatus: string, updatedByName: string) {
    // Implementation details - see original file
}
```

For email templates, copy `src/utils/emails/templates/KanbanIssueEmail.tsx` and adjust styling/branding as needed.

#### 4.4 Clerk User Actions

Copy `src/app/actions/ClerkUsers.Actions.ts` - This file contains functions for fetching user information from Clerk.

```typescript
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

// Fetch all admin users from Clerk
export async function getAdminUsers() {
    // Implementation details - see original file
}

// Get user emails by user IDs
export async function getUserEmailsByIds(userIds: string[]) {
    // Implementation details - see original file
}
```

#### 4.5 Implement Clerk Role Check

Create a utility function to check user roles:

```typescript
// src/utils/clerk/roles.ts
import { currentUser } from '@clerk/nextjs/server';

export async function checkRole(requiredRole: 'admin' | 'user'): Promise<boolean> {
    const user = await currentUser();

    if (!user) return false;

    const userRole = user.publicMetadata.role as string | undefined;

    if (requiredRole === 'admin') {
        return userRole === 'admin';
    }

    return true; // All authenticated users have 'user' role
}
```

#### 4.6 Implement Admin Check Function

Create a function to check and redirect non-admin users:

```typescript
// src/app/admin/AdminAuth.action.ts
'use server';

import { checkRole } from '@/utils/clerk/roles';
import { redirect } from 'next/navigation';

export async function checkAdminAccess() {
    const isAdmin = await checkRole('admin');

    if (!isAdmin) {
        redirect('/unauthorized'); // Redirect to an appropriate page
    }
}
```

#### 4.7 Styles

Copy `src/styles/KanbanMarkdown.module.css` - This file contains styles for the markdown editor and preview.

### 5. Components to Implement

Copy and adjust the following components:

#### 5.1 Kanban Board Components

- `src/app/admin/kanban/components/KanbanBoard.Client.tsx` - Main Kanban board component
- `src/app/admin/kanban/components/KanbanToolbar.Client.tsx` - Toolbar for the Kanban board
- `src/app/admin/kanban/components/SprintSection.Client.tsx` - Sprint information section

#### 5.2 Modals and Overlays

- `src/components/kanban/IssueCreate.Modal.tsx` - Modal for creating new issues
- `src/components/kanban/SprintCreate.Modal.tsx` - Modal for creating new sprints
- `src/components/kanban/SprintEdit.Modal.tsx` - Modal for editing sprints
- `src/components/kanban/BurndownChart.tsx` - Burndown chart component
- `src/app/admin/issue/components/MarkdownEditorOverlay.tsx` - Markdown editor overlay
- `src/app/admin/issue/components/TitleEdit.Overlay.tsx` - Title edit overlay
- `src/app/admin/issue/components/LabeledInput.tsx` - Labeled input component

#### 5.3 Issue Page Components

- `src/app/admin/issue/Issue.Main.Client.tsx` - Main component for the issue page
- `src/app/admin/issue/Issue.Store.ts` - Store for the issue page

### 6. Pages to Implement

#### 6.1 Kanban Board Page

Create `src/app/admin/kanban/page.tsx`:

```typescript
import React from 'react';
import { Metadata } from 'next';
import { KanbanBoard } from '@/app/admin/kanban/components/KanbanBoard.Client';
import GlobalLayoutClient from '@/components/layout/Global.Layout.Client'; // Adjust to your layout component
import { checkAdminAccess } from '../AdminAuth.action'; // Implement this function to check admin access

export const metadata: Metadata = {
    title: 'Kanban Board',
    description: 'Administrative kanban board for managing and tracking development tasks.',
    // ... adjust the rest of the metadata
};

export default async function KanbanPage() {
    // Use your admin access check function
    await checkAdminAccess();

    return (
        <div className="h-full w-full bg-background"> {/* Adjust className to match your theme */}
            <YourLayoutComponent noSidebar={true}> {/* Adjust to your layout component */}
                <div className="w-full h-full flex justify-center pt-16 2xl:pt-8">
                    <div className="w-full max-w-7xl px-4 md:px-16">
                        <KanbanBoard />
                    </div>
                </div>
            </YourLayoutComponent>
        </div>
    );
}
```

#### 6.2 Issue Detail Page

Create `src/app/admin/issue/page.tsx`:

```typescript
import React from 'react';
import { Metadata } from 'next';
import IssueMain from './Issue.Main.Client';
import YourLayoutComponent from '@/components/layout/YourLayout.Component'; // Adjust to your layout component
import { checkAdminAccess } from '../AdminAuth.action';

export const metadata: Metadata = {
    title: 'Issue Details',
    description: 'View and edit issue details',
};

export default async function IssuePage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Check admin access
    await checkAdminAccess();

    // Get issue_id from search params
    const issueId = searchParams.issue_id as string;

    if (!issueId) {
        // Handle missing issue ID (redirect to kanban board)
        return (
            <div className="h-full w-full">
                <YourLayoutComponent>
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-2xl font-semibold">No issue ID provided</h1>
                        <a href="/admin/kanban" className="mt-4 text-primary hover:underline">
                            Return to Kanban Board
                        </a>
                    </div>
                </YourLayoutComponent>
            </div>
        );
    }

    return (
        <div className="h-full w-full">
            <YourLayoutComponent>
                <div className="w-full max-w-7xl mx-auto px-4 py-8">
                    <IssueMain issueId={issueId} />
                </div>
            </YourLayoutComponent>
        </div>
    );
}
```

### 7. Environment Variables

Add the following environment variables to your `.env` file:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Resend Email
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM_ADDRESS=your_verified_email@example.com

# Database
NEON_DATABASE_URL=your_neon_database_url
# or
DATABASE_URL=your_postgres_database_url

# App URL for email links
NEXT_PUBLIC_APP_URL=https://your-app-url.com
```

### 8. CSS and UI Component Requirements

If you're not using Tailwind CSS or your class naming differs from the original project, you'll need to update styles in all components. Here are some common class prefixes used that you might need to adjust:

- `bg-st_dark`, `bg-st_darker`, `bg-st_light` - Background colors
- `text-st_white`, `text-st_light`, `text-st_lighter` - Text colors
- `border-st`, `border-st_light` - Border colors
- `hover:bg-st`, `hover:bg-st_light` - Hover effects
- `bg-primary_dark`, `bg-primary`, `text-primary_light` - Primary theme colors

You'll need to map these to your project's color scheme.

### 9. Required UI Components

Make sure you have these UI components available in your project:

- Button
- Input
- Select/Dropdown
- Modal/Dialog
- Avatar
- Label
- Checkbox
- Textarea
- Toast notifications
- Tooltip

You can implement these using libraries like shadcn/ui, Radix UI, or your preferred UI component library.

### 10. Required UI Libraries to Install

Based on the package.json, make sure to install:

```bash
pnpm add react-mde react-markdown remark-gfm react-tooltip react-dnd react-dnd-html5-backend react-hot-toast date-fns recharts
```

### 11. Database Schema Updates

After adding the schema to your project, run the Drizzle migration tools to update your database:

```bash
npx drizzle-kit push:pg
```

### 12. Testing

After implementation, test the Kanban board functionality:

1. Create a new issue
2. Create a sprint and assign issues to it
3. Drag and drop issues between status columns
4. Add comments to issues
5. Verify email notifications are sent
6. Check burndown chart functionality

### 13. Common Issues and Troubleshooting

1. **Authentication issues**: Make sure Clerk is properly set up and the `checkRole` function works correctly.

2. **Missing dependencies**: Check console errors for missing dependencies and install them.

3. **Styling mismatches**: If your project uses a different styling approach, adjust all style classes in the components.

4. **Database errors**: Verify that your database connection is working and the schema matches.

5. **Email configuration**: Test email sending with a simple test email first.

6. **Component incompatibilities**: If your project uses different UI components, you may need to adapt the Kanban components.

### 14. Customization Options

1. **Status columns**: You can modify the `IssueStatus` type in `Kanban.Store.ts` to change available columns.

2. **Priority levels**: Adjust the `IssuePriority` type to customize priority options.

3. **Issue types**: Update the `IssueType` type to match your project's needs.

4. **Email templates**: Customize the email notifications in `KanbanIssueEmail.tsx`.

5. **Burndown chart**: Adjust the visualization in `BurndownChart.tsx`.

## Conclusion

This implementation guide provides a comprehensive approach to integrating a Kanban board into your Next.js project. By following these steps, you should have a fully functional Kanban board with issue tracking, sprint planning, and email notifications.

Make sure to adapt the components and styles to match your project's design system and requirements. If you encounter any issues, check the console for errors and verify that all dependencies are correctly installed.
