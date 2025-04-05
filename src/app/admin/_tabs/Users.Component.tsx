'use client';

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { fetchAllUsers, searchUsers } from '@/app/admin/Admin.Actions';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserDetailsOverlay } from '@/components/ui/user-details-overlay';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { EyeIcon, SearchIcon } from 'lucide-react';
import { ClerkTransformedUser } from '@/types/clerk';
import { format } from 'date-fns';

export default function UsersTab() {
    const [users, setUsers] = useState<ClerkTransformedUser[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadingText, setLoadingText] = useState<string>('Loading users...');

    // State for the overlay
    const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<ClerkTransformedUser | null>(null);
    const [isLoadingUserDetails, setIsLoadingUserDetails] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                user.email.toLowerCase().includes(searchLower) ||
                (user.first_name && user.first_name.toLowerCase().includes(searchLower)) ||
                (user.last_name && user.last_name.toLowerCase().includes(searchLower)) ||
                (user.username && user.username.toLowerCase().includes(searchLower)) ||
                user.clerk_id.toLowerCase().includes(searchLower)
            );
        });
    }, [users, searchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Modified to handle the overlay instead of redirection
    const handleViewUser = async (user: ClerkTransformedUser) => {
        try {
            setSelectedUser(user);
            setIsLoadingUserDetails(true);
            setIsOverlayOpen(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
            toast.error('Failed to load user details. Please try again.');
        } finally {
            setIsLoadingUserDetails(false);
        }
    };

    // Function to close the overlay
    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
    };

    const loadUsers = useCallback(async () => {
        setIsLoading(true);
        setLoadingText('Loading users...');

        try {
            const res = await fetchAllUsers();

            if (res.success) {
                console.log('Users loaded successfully', res.data);
                setUsers(res.data as ClerkTransformedUser[]);
                setErrorMessage(null);
            } else {
                console.error('Failed to load users', res.message);
                toast.error(res.message ?? 'Failed to load users.');
                setUsers([]);
                setErrorMessage(res.message || 'Failed to fetch users');
            }
        } catch (error: unknown) {
            console.error('Error loading users:', error);
            toast.error('Failed to load users. Please try again.');
            setUsers([]);
            setErrorMessage('An unexpected error occurred while fetching users');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSearch = async () => {
        if (!searchTerm) {
            await loadUsers();
            return;
        }

        setIsLoading(true);
        setLoadingText(`Searching for "${searchTerm}"...`);

        try {
            const res = await searchUsers(searchTerm);

            if (res.success) {
                setUsers(res.data as ClerkTransformedUser[]);
                setErrorMessage(null);
            } else {
                toast.error(res.message ?? 'Failed to search users.');
                setUsers([]);
                setErrorMessage(res.message || 'Search failed');
            }
        } catch (error: unknown) {
            console.error('Error searching users:', error);
            toast.error('Failed to search users. Please try again.');
            setUsers([]);
            setErrorMessage('An unexpected error occurred while searching');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    // Format date for display
    const formatDate = (date: Date) => {
        try {
            return format(date, 'MMM d, yyyy');
        } catch {
            return 'N/A';
        }
    };

    return (
        <div className="grid gap-4">
            <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-st_white">Users</h3>
                    <div className="w-1/3 relative">
                        <Input
                            className="pr-10"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground">
                            <SearchIcon size={16} />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary_dark"></div>
                            <p className="text-st_light">{loadingText}</p>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-st_light">ID</TableHead>
                                    <TableHead className="text-st_light">Name</TableHead>
                                    <TableHead className="text-st_light">Email</TableHead>
                                    <TableHead className="text-st_light">Username</TableHead>
                                    <TableHead className="text-st_light">Joined</TableHead>
                                    <TableHead className="text-st_light">Last Sign In</TableHead>
                                    <TableHead className="text-st_light">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <TableRow key={user.id} className="text-st_light hover:text-st_white hover:bg-st">
                                            <TableCell>{user.clerk_id.substring(0, 12)}...</TableCell>
                                            <TableCell>{`${user.first_name ?? ''} ${user.last_name ?? ''}`}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.username ?? '-'}</TableCell>
                                            <TableCell>{formatDate(user.created_at)}</TableCell>
                                            <TableCell>{formatDate(user.last_sign_in)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleViewUser(user)}
                                                    className="flex flex-row items-center gap-2 bg-st_light text-st_dark hover:bg-primary hover:text-st_dark">
                                                    <EyeIcon className="h-4 w-4" /> View Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            {errorMessage || 'No users found'}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </Card>

            {/* Add the UserDetailsOverlay component */}
            <UserDetailsOverlay isOpen={isOverlayOpen} onClose={handleCloseOverlay} user={selectedUser} loading={isLoadingUserDetails} />
        </div>
    );
}
