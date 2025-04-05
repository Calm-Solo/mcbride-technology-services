'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type AdminTab = 'users' | 'settings' | 'logs';

interface AdminContainerProps {
    initialTab?: string;
}

export default function AdminContainer({ initialTab = 'users' }: AdminContainerProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<AdminTab>(initialTab as AdminTab);

    // Handle tab change
    const handleTabChange = (tab: AdminTab) => {
        setActiveTab(tab);
        router.push(`/admin?tab=${tab}`);
    };

    return (
        <div className="flex flex-col w-full h-full items-center p-8 gap-8 overflow-y-auto">
            <div className="flex flex-col w-full h-fit max-w-7xl p-6 gap-4 border shadow-lg rounded-lg bg-white dark:bg-gray-800">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <Link href="/" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                        Back to Home
                    </Link>
                </div>

                {/* Tabs */}
                <nav className="flex flex-row gap-2 w-full rounded-lg px-1 pl-0 items-center justify-start">
                    {[
                        { value: 'users', label: 'Users' },
                        { value: 'settings', label: 'Settings' },
                        { value: 'logs', label: 'Activity Logs' },
                    ].map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => handleTabChange(value as AdminTab)}
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                                activeTab === value
                                    ? 'border border-blue-600 text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                            }`}>
                            {label}
                        </button>
                    ))}
                </nav>

                {/* Tab content */}
                <div className="mt-2">
                    {activeTab === 'users' && (
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-4">User Management</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                This section will be implemented to manage users, set roles, and view user details.
                            </p>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
                            <p className="text-gray-600 dark:text-gray-400">Configure system settings and preferences here.</p>
                        </div>
                    )}

                    {activeTab === 'logs' && (
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-4">Activity Logs</h2>
                            <p className="text-gray-600 dark:text-gray-400">View system activity and audit logs.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
