'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    fetchKanbanIssue,
    updateKanbanIssue,
    deleteKanbanIssue,
    fetchAllSprints,
    fetchMessagesForIssue,
    addMessageToIssue,
} from '@/app/admin/kanban/Kanban.Actions';
import { getAdminUsers } from '@/app/actions/ClerkUsers.actions';
import { KanbanSprint } from '@/db/schema';
import { IssuePriority, IssueStatus, IssueType } from '../kanban/Kanban.Store';
import { Combobox, ComboboxItem } from '@/components/ui/combobox';
import { MultiCombobox, SelectedItems } from '@/components/ui/multi-combobox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, ArrowLeft, Trash2, Edit, PlusCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '@/styles/KanbanMarkdown.module.css';
import { formatDistanceToNow } from 'date-fns';
import { useIssueStore } from './Issue.Store';
import { LabeledInput } from './components/LabeledInput';
import { MarkdownEditorOverlay } from './components/MarkdownEditorOverlay';
import { TitleEditOverlay } from './components/TitleEdit.Overlay';

interface IssueMainProps {
    issueId: string;
}

export default function IssueMain({ issueId }: IssueMainProps) {
    const router = useRouter();
    const { issue, setIssue, messages, setMessages, addMessage, setIsLoading, isSubmitting, setIsSubmitting, isDeleting, setIsDeleting } =
        useIssueStore();

    const [adminUsers, setAdminUsers] = useState<ComboboxItem[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [sprints, setSprints] = useState<KanbanSprint[]>([]);
    const [selectedSprintIds, setSelectedSprintIds] = useState<string[]>([]);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<IssuePriority>('medium');
    const [points, setPoints] = useState<string>('');
    const [type, setType] = useState<IssueType>('task');
    const [status, setStatus] = useState<IssueStatus>('backlog');
    const [assignee, setAssignee] = useState('');
    const [developer, setDeveloper] = useState('');
    const [mailListArray, setMailListArray] = useState<string[]>([]);
    const [newComment, setNewComment] = useState('');
    const [reporter, setReporter] = useState('');

    // Overlay state
    const [isDescriptionEditorOpen, setIsDescriptionEditorOpen] = useState(false);
    const [isCommentEditorOpen, setIsCommentEditorOpen] = useState(false);
    const [isTitleEditorOpen, setIsTitleEditorOpen] = useState(false);

    // Initial data loading
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Load issue, messages, and sprints in parallel
                const [issueResult, messagesResult, sprintsResult] = await Promise.all([
                    fetchKanbanIssue(issueId),
                    fetchMessagesForIssue(issueId),
                    fetchAllSprints(),
                ]);

                if (issueResult.success) {
                    setIssue(issueResult.data);
                    // Initialize form state
                    setTitle(issueResult.data.title);
                    setDescription(issueResult.data.description || '');
                    setPriority(issueResult.data.priority as IssuePriority);
                    setPoints(issueResult.data.points?.toString() || '');
                    setType(issueResult.data.type as IssueType);
                    setStatus(issueResult.data.status as IssueStatus);
                    setReporter(issueResult.data.reporter || '');
                    setAssignee(issueResult.data.assignee || '');
                    setDeveloper(issueResult.data.developer || '');
                    if (issueResult.data.mail_list) {
                        setMailListArray(issueResult.data.mail_list.split(',').filter((id) => id.trim() !== ''));
                    }
                    if (issueResult.data.sprints) {
                        const sprintIds = issueResult.data.sprints.split(',').filter((id) => id.trim() !== '');
                        setSelectedSprintIds(sprintIds);
                    }
                } else {
                    toast.error(issueResult.message);
                    router.push('/admin/kanban');
                }

                if (messagesResult.success) {
                    setMessages(messagesResult.data);
                } else {
                    toast.error('Failed to load messages');
                }

                if (sprintsResult.success) {
                    setSprints(sprintsResult.data);
                } else {
                    toast.error('Failed to load sprints');
                }
            } catch (error) {
                console.error('Error loading initial data:', error);
                toast.error('Failed to load issue data');
                router.push('/admin/kanban');
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();
        fetchAdminUsers();
    }, [issueId, router, setIssue, setMessages, setIsLoading]);

    // Fetch admin users from Clerk
    const fetchAdminUsers = async () => {
        setIsLoadingUsers(true);
        try {
            const result = await getAdminUsers();
            if (result.success) {
                const formattedUsers = result.data.map((user) => ({
                    id: user.id,
                    label: user.fullName,
                    value: user.id,
                    imageUrl: user.imageUrl,
                }));
                setAdminUsers(formattedUsers);
            } else {
                toast.error(result.message || 'Failed to load users');
            }
        } catch (error) {
            console.error('Error loading admin users:', error);
            toast.error('Failed to load admin users');
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Title is required');
            return;
        }

        if (!description.trim()) {
            toast.error('Description is required');
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('priority', priority);
            formData.append('points', points);
            formData.append('type', type);
            formData.append('status', status);
            formData.append('reporter', reporter);

            if (assignee) formData.append('assignee', assignee);
            if (developer) formData.append('developer', developer);

            // Join the mailListArray back to a comma-separated string
            const mailListString = mailListArray.join(',');
            if (mailListString) formData.append('mail_list', mailListString);

            // Add sprint IDs as comma-separated string
            formData.append('sprints', selectedSprintIds.join(','));

            const result = await updateKanbanIssue(issueId, formData);

            if (result.success) {
                toast.success('Issue updated successfully');

                // Force reload from server to get fresh data
                const freshResult = await fetchKanbanIssue(issueId);
                if (freshResult.success) {
                    setIssue(freshResult.data);
                } else {
                    setIssue(result.data); // Fallback to what we received
                }
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error updating issue:', error);
            toast.error('Failed to update issue');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this issue? This action cannot be undone.')) {
            setIsDeleting(true);
            try {
                const result = await deleteKanbanIssue(issueId);
                if (result.success) {
                    toast.success('Issue deleted successfully');
                    router.push('/admin/kanban');
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.error('Error deleting issue:', error);
                toast.error('Failed to delete issue');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    // Helper function to find user details by ID
    const findUserById = (userId: string) => {
        return adminUsers.find((user) => user.value === userId);
    };

    // Format sprints for MultiCombobox
    const formattedSprints = sprints.map((sprint) => ({
        label: `${sprint.title}${sprint.is_active ? ' (Active)' : ''}`,
        value: sprint.uuid,
        description: `${sprint.start_date ? new Date(sprint.start_date).toLocaleDateString() : 'N/A'} - ${sprint.end_date ? new Date(sprint.end_date).toLocaleDateString() : 'N/A'}`,
    }));

    const handleAddComment = async (commentText: string) => {
        if (!commentText.trim()) {
            toast.error('Comment cannot be empty');
            return;
        }

        setIsSubmittingComment(true);
        try {
            const result = await addMessageToIssue(issueId, commentText);
            if (result.success) {
                addMessage(result.data);
                setNewComment('');
                setIsCommentEditorOpen(false);
                toast.success('Comment added successfully');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error('Failed to add comment');
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleSaveDescription = (newDescription: string) => {
        setDescription(newDescription);
        setIsDescriptionEditorOpen(false);

        // Auto-save the description change
        const autoSave = async () => {
            if (!title.trim() || !newDescription.trim()) return;

            try {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('description', newDescription);
                formData.append('priority', priority);
                formData.append('points', points);
                formData.append('type', type);
                formData.append('status', status);
                formData.append('reporter', reporter);

                if (assignee) formData.append('assignee', assignee);
                if (developer) formData.append('developer', developer);

                const mailListString = mailListArray.join(',');
                if (mailListString) formData.append('mail_list', mailListString);

                formData.append('sprints', selectedSprintIds.join(','));

                const result = await updateKanbanIssue(issueId, formData);

                if (result.success) {
                    toast.success('Description updated');
                    setIssue(result.data);
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.error('Error updating description:', error);
                toast.error('Failed to update description');
            }
        };

        autoSave();
    };

    const handleSaveTitle = async (newTitle: string) => {
        if (!newTitle.trim()) {
            toast.error('Title is required');
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', newTitle);
            formData.append('description', description);
            formData.append('priority', priority);
            formData.append('points', points);
            formData.append('type', type);
            formData.append('status', status);
            formData.append('reporter', reporter);

            if (assignee) formData.append('assignee', assignee);
            if (developer) formData.append('developer', developer);

            const mailListString = mailListArray.join(',');
            if (mailListString) formData.append('mail_list', mailListString);

            formData.append('sprints', selectedSprintIds.join(','));

            const result = await updateKanbanIssue(issueId, formData);

            if (result.success) {
                toast.success('Title updated successfully');
                setTitle(newTitle);
                setIssue(result.data);
                setIsTitleEditorOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error updating title:', error);
            toast.error('Failed to update title');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Add this useEffect to keep form state in sync with issue changes
    useEffect(() => {
        if (issue) {
            setTitle(issue.title);
            setDescription(issue.description || '');
            setPriority(issue.priority as IssuePriority);
            setPoints(issue.points?.toString() || '');
            setType(issue.type as IssueType);
            setStatus(issue.status as IssueStatus);
            setReporter(issue.reporter || '');
            setAssignee(issue.assignee || '');
            setDeveloper(issue.developer || '');
            if (issue.mail_list) {
                setMailListArray(issue.mail_list.split(',').filter((id) => id.trim() !== ''));
            }
            if (issue.sprints) {
                setSelectedSprintIds(issue.sprints.split(',').filter((id) => id.trim() !== ''));
            }
        }
    }, [issue]); // This effect runs whenever the issue state changes

    return (
        <>
            {/* Header with back button */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/admin/kanban')}
                    className="text-st_light hover:text-primary_light -ml-2">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Kanban
                </Button>
            </div>

            {/* Main content area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column - Main content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title section */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-white">{title}</h1>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsTitleEditorOpen(true)}
                                className="text-st_light hover:text-primary_light">
                                <Edit size={16} className="mr-1" />
                                Edit
                            </Button>
                        </div>

                        {/* Submit/Delete buttons */}
                        <div className="flex items-center justify-between">
                            <Button type="submit" disabled={isSubmitting} className="bg-primary_dark hover:bg-primary text-white">
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                variant="outline"
                                className="border-red-800 text-red-500 hover:bg-red-900/20">
                                {isDeleting ? 'Deleting...' : 'Delete Issue'}
                                <Trash2 size={16} className="ml-2" />
                            </Button>
                        </div>

                        {/* Issue properties - display in horizontal layout with labels on left */}
                        <div className="space-y-4 mt-8">
                            <div className="flex flex-wrap justify-between gap-4">
                                <LabeledInput label="Type" htmlFor="type" className="flex-1">
                                    <Select value={type} onValueChange={(value) => setType(value as IssueType)}>
                                        <SelectTrigger className="bg-st border-st_light text-white">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-st_dark border-st_light text-white">
                                            <SelectItem value="bug">Bug</SelectItem>
                                            <SelectItem value="feature">Feature</SelectItem>
                                            <SelectItem value="improvement">Improvement</SelectItem>
                                            <SelectItem value="task">Task</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </LabeledInput>

                                <LabeledInput label="Priority" htmlFor="priority" className="flex-1">
                                    <Select value={priority} onValueChange={(value) => setPriority(value as IssuePriority)}>
                                        <SelectTrigger className="bg-st border-st_light text-white">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-st_dark border-st_light text-white">
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="critical">Critical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </LabeledInput>
                            </div>

                            <div className="flex flex-wrap gap-4 justify-between">
                                <LabeledInput label="Status" htmlFor="status" className="flex-1">
                                    <Select value={status} onValueChange={(value) => setStatus(value as IssueStatus)}>
                                        <SelectTrigger className="bg-st border-st_light text-white">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-st_dark border-st_light text-white">
                                            <SelectItem value="backlog">Backlog</SelectItem>
                                            <SelectItem value="groomed">Groomed</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="in_review">In Review</SelectItem>
                                            <SelectItem value="blocked">Blocked</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </LabeledInput>

                                <LabeledInput label="Points" htmlFor="points" className="flex-1">
                                    <Input
                                        type="number"
                                        id="points"
                                        value={points}
                                        onChange={(e) => setPoints(e.target.value)}
                                        placeholder="Story points"
                                        className="bg-st border-st_light text-white"
                                    />
                                </LabeledInput>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 mt-8 pt-6 border-t border-st_light">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="description" className="text-primary_light text-lg">
                                    Description
                                </Label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        console.log('Opening description editor with:', description);
                                        setIsDescriptionEditorOpen(true);
                                    }}
                                    className="text-st_light hover:text-primary_light">
                                    <Edit size={16} className="mr-1" />
                                    Edit
                                </Button>
                            </div>
                            <div className={`${styles.markdown} p-4 min-h-[100px]`}>
                                {description ? (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
                                ) : (
                                    <div className="text-st_light italic">No description provided</div>
                                )}
                            </div>
                        </div>
                    </form>

                    {/* Comments section */}
                    <div className="space-y-6 pt-8 border-t border-st_light">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-medium text-primary_light">Comments</h3>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-st_light">{messages.length} comments</span>
                                <Button
                                    onClick={() => {
                                        setNewComment('');
                                        setIsCommentEditorOpen(true);
                                    }}
                                    variant="outline"
                                    className="border-primary/40 text-primary_light hover:bg-primary/10">
                                    <PlusCircle size={16} className="mr-2" />
                                    Add Comment
                                </Button>
                            </div>
                        </div>

                        {/* Comments list */}
                        <div className="space-y-6">
                            {messages.length === 0 ? (
                                <div className="text-center py-8 text-st_light">No comments yet</div>
                            ) : (
                                messages.map((message) => {
                                    const user = findUserById(message.user_id);
                                    return (
                                        <div key={message.uuid} className="bg-st p-4 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0">
                                                    <Avatar>
                                                        {user?.imageUrl ? (
                                                            <AvatarImage src={String(user.imageUrl)} alt={String(user.label)} />
                                                        ) : (
                                                            <AvatarFallback className="bg-primary text-white">
                                                                <User />
                                                            </AvatarFallback>
                                                        )}
                                                    </Avatar>
                                                </div>
                                                <div className="flex-grow space-y-1">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="font-medium text-white">{user?.label || 'Unknown'}</h4>
                                                        <span className="text-xs text-st_light">
                                                            {message.created_at
                                                                ? formatDistanceToNow(new Date(message.created_at), {
                                                                      addSuffix: true,
                                                                  })
                                                                : 'Unknown time'}
                                                        </span>
                                                    </div>
                                                    <div className={styles.markdown}>
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.comment}</ReactMarkdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* Right column - Sidebar */}
                <div className="space-y-5">
                    <LabeledInput label="Reporter">
                        <Combobox
                            items={adminUsers}
                            value={reporter}
                            onChange={setReporter}
                            placeholder="Select reporter"
                            className="bg-st border-st_light text-st_white"
                            emptyText={isLoadingUsers ? 'Loading users...' : 'No users found'}
                            renderOption={(item: ComboboxItem) => (
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={String(item.imageUrl)} alt={String(item.label)} />
                                        <AvatarFallback className="bg-primary text-white">
                                            <User size={14} />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-st_white">{item.label}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </LabeledInput>

                    <LabeledInput label="Assignee">
                        <Combobox
                            items={adminUsers}
                            value={assignee}
                            onChange={setAssignee}
                            placeholder="Select assignee"
                            className="bg-st border-st_light text-st_white"
                            emptyText={isLoadingUsers ? 'Loading users...' : 'No users found'}
                            renderOption={(item: ComboboxItem) => (
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={String(item.imageUrl)} alt={String(item.label)} />
                                        <AvatarFallback className="bg-primary text-white">
                                            <User size={14} />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-st_white">{item.label}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </LabeledInput>

                    <LabeledInput label="Developer">
                        <Combobox
                            items={adminUsers}
                            value={developer}
                            onChange={setDeveloper}
                            placeholder="Select developer"
                            className="bg-st border-st_light text-st_white"
                            emptyText={isLoadingUsers ? 'Loading users...' : 'No users found'}
                            renderOption={(item: ComboboxItem) => (
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={String(item.imageUrl)} alt={String(item.label)} />
                                        <AvatarFallback className="bg-primary text-white">
                                            <User size={14} />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-st_white">{item.label}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </LabeledInput>

                    <LabeledInput label="Mail List">
                        <MultiCombobox
                            items={adminUsers}
                            values={mailListArray}
                            onChange={setMailListArray}
                            placeholder="Add recipients"
                            className="bg-st border-st_light text-st_white"
                            emptyText={isLoadingUsers ? 'Loading users...' : 'No users found'}
                            renderOption={(item: ComboboxItem) => (
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={String(item.imageUrl)} alt={String(item.label)} />
                                        <AvatarFallback className="bg-primary text-white">
                                            <User size={14} />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-st_white">{item.label}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </LabeledInput>

                    {/* Selected Recipients */}
                    {mailListArray.length > 0 && (
                        <div className="space-y-2 ml-28">
                            <SelectedItems
                                items={adminUsers}
                                selectedValues={mailListArray}
                                onRemove={(value) => setMailListArray(mailListArray.filter((v) => v !== value))}
                                renderItem={(item: ComboboxItem) => (
                                    <div className="flex items-center gap-1">
                                        <Avatar className="h-4 w-4">
                                            <AvatarImage src={String(item.imageUrl)} alt={String(item.label)} />
                                            <AvatarFallback className="bg-primary text-white">
                                                <User size={10} />
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-st_white">{item.label}</span>
                                    </div>
                                )}
                            />
                        </div>
                    )}

                    <LabeledInput label="Sprints">
                        <MultiCombobox
                            items={formattedSprints}
                            values={selectedSprintIds}
                            onChange={setSelectedSprintIds}
                            placeholder="Select sprints"
                            className="bg-st border-st_light text-st_white"
                            emptyText={'Loading sprints...'}
                            renderOption={(item: ComboboxItem) => (
                                <div className="flex flex-col">
                                    <span className="text-st_white">{item.label}</span>
                                    <span className="text-xs text-st_light">{item.description}</span>
                                </div>
                            )}
                        />
                    </LabeledInput>

                    {/* Selected Sprints */}
                    {selectedSprintIds.length > 0 && (
                        <div className="space-y-2 ml-28">
                            <SelectedItems
                                items={formattedSprints}
                                selectedValues={selectedSprintIds}
                                onRemove={(value) => setSelectedSprintIds(selectedSprintIds.filter((v) => v !== value))}
                                renderItem={(item: ComboboxItem) => (
                                    <div className="flex items-center">
                                        <span className="text-st_white">{item.label}</span>
                                    </div>
                                )}
                            />
                        </div>
                    )}

                    {/* Metadata */}
                    <div className="space-y-2 pt-4 border-t border-st_light mt-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-st_light">Created</span>
                            <span className="text-st_white">
                                {issue?.created_at ? formatDistanceToNow(new Date(issue.created_at), { addSuffix: true }) : 'Unknown'}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-st_light">Updated</span>
                            <span className="text-st_white">
                                {issue?.updated_at ? formatDistanceToNow(new Date(issue.updated_at), { addSuffix: true }) : 'Unknown'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Title Editor Modal */}
            <TitleEditOverlay
                isOpen={isTitleEditorOpen}
                onClose={() => setIsTitleEditorOpen(false)}
                title={title}
                onSave={handleSaveTitle}
                isSaving={isSubmitting}
            />

            {/* Description Editor Modal */}
            {isDescriptionEditorOpen && (
                <MarkdownEditorOverlay
                    isOpen={isDescriptionEditorOpen}
                    onClose={() => setIsDescriptionEditorOpen(false)}
                    title="Edit Description"
                    initialValue={description}
                    onSave={handleSaveDescription}
                    isSaving={isSubmitting}
                />
            )}

            {/* Comment Editor Modal */}
            {isCommentEditorOpen && (
                <MarkdownEditorOverlay
                    isOpen={isCommentEditorOpen}
                    onClose={() => setIsCommentEditorOpen(false)}
                    title="Add Comment"
                    initialValue={newComment}
                    onSave={handleAddComment}
                    isSaving={isSubmittingComment}
                    minHeight={150}
                />
            )}
        </>
    );
}
