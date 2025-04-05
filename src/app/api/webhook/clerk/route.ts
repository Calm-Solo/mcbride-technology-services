import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db, users } from '@/db/db';
import { eq } from 'drizzle-orm';

async function updateUserLastSignIn(userId: string) {
    await db.update(users).set({ last_sign_in: new Date() }).where(eq(users.clerk_id, userId));
}

async function createOrUpdateUser(userData: {
    id: string;
    email_addresses: Array<{ email_address: string }>;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
}) {
    const email = userData.email_addresses[0]?.email_address;
    if (!email) return;

    const existingUser = await db.select().from(users).where(eq(users.clerk_id, userData.id));

    if (existingUser.length === 0) {
        // Create new user
        await db.insert(users).values({
            clerk_id: userData.id,
            email,
            username: userData.username || undefined,
            first_name: userData.first_name || undefined,
            last_name: userData.last_name || undefined,
            image_url: userData.image_url || undefined,
        });
    } else {
        // Update existing user
        await db
            .update(users)
            .set({
                email,
                username: userData.username || undefined,
                first_name: userData.first_name || undefined,
                last_name: userData.last_name || undefined,
                image_url: userData.image_url || undefined,
                updated_at: new Date(),
            })
            .where(eq(users.clerk_id, userData.id));
    }
}

export async function POST(req: Request) {
    // Get the headers
    const headersList = await headers();
    // These are type-safe in Next.js, as headers() isn't a Promise in practice
    const svix_id = headersList.get('svix-id') as string | null;
    const svix_timestamp = headersList.get('svix-timestamp') as string | null;
    const svix_signature = headersList.get('svix-signature') as string | null;

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', {
            status: 400,
        });
    }

    // Handle the webhook
    const eventType = evt.type;
    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;
        await createOrUpdateUser({ id, email_addresses, username, first_name, last_name, image_url });
    } else if (eventType === 'session.created') {
        const { user_id } = evt.data;
        if (user_id) {
            await updateUserLastSignIn(user_id);
        }
    }

    return new Response('Success', { status: 200 });
}
