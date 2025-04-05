export type ClerkUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    fullName: string;
};

// Define a type for the Clerk API user
export type ClerkApiUser = {
    id: string;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    emailAddresses: { emailAddress: string }[];
    imageUrl: string;
    publicMetadata: Record<string, unknown>;
    createdAt: number | string;
    updatedAt: number | string;
    lastSignInAt: number | string | null;
};

// Type for the transformed Clerk user used in our application
export type ClerkTransformedUser = {
    id: string;
    clerk_id: string;
    email: string;
    username: string | null;
    first_name: string;
    last_name: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
    last_sign_in: Date;
};
