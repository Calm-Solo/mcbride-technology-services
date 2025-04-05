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
    emailAddresses: { emailAddress: string }[];
    imageUrl: string;
    publicMetadata: Record<string, unknown>;
};
