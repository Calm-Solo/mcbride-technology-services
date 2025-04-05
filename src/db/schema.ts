import { pgTable, varchar, timestamp, text, serial, integer, boolean } from 'drizzle-orm/pg-core';
import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    clerk_id: varchar('clerk_id', { length: 128 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    username: varchar('username', { length: 100 }),
    first_name: varchar('first_name', { length: 100 }),
    last_name: varchar('last_name', { length: 100 }),
    image_url: text('image_url'),
    last_sign_in: timestamp('last_sign_in'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Kanban tables
export const kanban_issue = pgTable('kanban_issue', {
    id: serial('id').primaryKey(),
    uuid: varchar('uuid', { length: 128 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    status: varchar('status', { length: 50 }).notNull().default('backlog'),
    priority: varchar('priority', { length: 50 }).notNull().default('medium'),
    type: varchar('type', { length: 50 }).notNull().default('task'),
    points: integer('points'),
    reporter: varchar('reporter', { length: 128 }),
    assignee: varchar('assignee', { length: 128 }),
    developer: varchar('developer', { length: 128 }),
    mail_list: text('mail_list'),
    sprints: text('sprints'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    completed_at: timestamp('completed_at'),
});

export const kanban_message = pgTable('kanban_message', {
    id: serial('id').primaryKey(),
    uuid: varchar('uuid', { length: 128 }).notNull().unique(),
    issue_uuid: varchar('issue_uuid', { length: 128 }).notNull(),
    user_id: varchar('user_id', { length: 128 }).notNull(),
    user_name: varchar('user_name', { length: 255 }),
    comment: text('comment').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});

export const kanban_sprint = pgTable('kanban_sprint', {
    id: serial('id').primaryKey(),
    uuid: varchar('uuid', { length: 128 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    start_date: timestamp('start_date'),
    end_date: timestamp('end_date'),
    is_active: boolean('is_active').default(false),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    completed_at: timestamp('completed_at'),
});

// Model types
export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export type KanbanIssue = InferSelectModel<typeof kanban_issue>;
export type InsertKanbanIssue = InferInsertModel<typeof kanban_issue>;

export type KanbanMessage = InferSelectModel<typeof kanban_message>;
export type InsertKanbanMessage = InferInsertModel<typeof kanban_message>;

export type KanbanSprint = InferSelectModel<typeof kanban_sprint>;
export type InsertKanbanSprint = InferInsertModel<typeof kanban_sprint>;
