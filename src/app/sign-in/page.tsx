import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign In | McBride Technology Services',
    description: 'Sign in to your account',
};

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Welcome back to McBride Technology Services</p>
                </div>
                <div className="mt-8">
                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: 'mx-auto',
                                card: 'bg-white dark:bg-gray-800 shadow-md rounded-lg p-6',
                                headerTitle: 'text-gray-900 dark:text-white',
                                headerSubtitle: 'text-gray-500 dark:text-gray-400',
                                formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
                                formFieldInput: 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600',
                                formFieldLabel: 'text-gray-700 dark:text-gray-300',
                                footerActionLink: 'text-blue-500 hover:text-blue-600',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
