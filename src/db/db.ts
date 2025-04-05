import '@/lib/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users, kanban_issue, kanban_message, kanban_sprint } from './schema';

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql);

export { db, users, kanban_issue, kanban_message, kanban_sprint };
