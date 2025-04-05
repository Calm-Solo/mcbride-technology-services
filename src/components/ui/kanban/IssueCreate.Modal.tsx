'use client';

import React, { useState, useEffect } from 'react';
import { useKanbanStore } from '@/app/admin/kanban/Kanban.Store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { createKanbanIssue } from '@/app/admin/kanban/Kanban.Actions';
import { IssuePriority, IssueStatus, IssueType } from '@/app/admin/kanban/Kanban.Store';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import ReactMarkdown from 'react-markdown';
import styles from '@/styles/KanbanMarkdown.module.css';
import { getAdminUsers } from '@/app/actions/ClerkUsers.actions';
import { Combobox, ComboboxItem } from '@/components/ui/combobox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { MultiCombobox, SelectedItems } from '@/components/ui/multi-combobox';
import { CheckboxWithLabel } from '@/components/ui/checkbox-with-label';
import { LabeledInput } from '@/app/admin/issue/components/LabeledInput';

export function IssueCreateModal() {
    const { isCreateModalOpen, setIsCreateModalOpen, addIssue, sprints } = useKanbanStore();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<IssuePriority>('medium');
    const [points, setPoints] = useState<string>('');
    const [type, setType] = useState<IssueType>('task');
    const [status, setStatus] = useState<IssueStatus>('backlog');
    const [assignee, setAssignee] = useState('');
    const [developer, setDeveloper] = useState('');
    const [mailListArray, setMailListArray] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
    const [adminUsers, setAdminUsers] = useState<ComboboxItem[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    // Sprint selection state
    const [selectedSprintIds, setSelectedSprintIds] = useState<Set<string>>(new Set());

    // Fetch admin users when modal is opened
    useEffect(() => {
        if (isCreateModalOpen) {
            fetchAdminUsers();
        }
    }, [isCreateModalOpen]);

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
                console.log('Formatted users:', formattedUsers);
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

    const handleSprintToggle = (sprintId: string) => {
        setSelectedSprintIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(sprintId)) {
                newSet.delete(sprintId);
            } else {
                newSet.add(sprintId);
            }
            return newSet;
        });
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

            if (assignee) formData.append('assignee', assignee);
            if (developer) formData.append('developer', developer);

            // Join the mailListArray back to a comma-separated string
            const mailListString = mailListArray.join(',');
            if (mailListString) formData.append('mail_list', mailListString);

            // Add sprint IDs as comma-separated string
            formData.append('sprints', Array.from(selectedSprintIds).join(','));

            const result = await createKanbanIssue(formData);

            if (result.success) {
                toast.success('Issue created successfully');
                addIssue(result.data);
                resetForm();
                setIsCreateModalOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error creating issue:', error);
            toast.error('Failed to create issue');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setPoints('');
        setType('task');
        setStatus('backlog');
        setAssignee('');
        setDeveloper('');
        setMailListArray([]);
        setSelectedSprintIds(new Set());
    };

    const handleClose = () => {
        resetForm();
        setIsCreateModalOpen(false);
    };

    // Simple function to generate markdown preview
    const generateMarkdownPreview = (markdown: string) => {
        return Promise.resolve(
            <div className={styles.markdown}>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        );
    };

    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogContent className="sm:max-w-[800px] bg-st_dark text-st_white border-st max-h-[80dvh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl text-primary_light">Create Issue</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <LabeledInput label="Title" htmlFor="title">
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Issue title"
                            className="bg-st border-st_light text-st_white"
                        />
                    </LabeledInput>

                    <LabeledInput label="Description" htmlFor="description">
                        <div className={styles.editor}>
                            <ReactMde
                                value={description}
                                onChange={setDescription}
                                selectedTab={selectedTab}
                                onTabChange={setSelectedTab}
                                generateMarkdownPreview={generateMarkdownPreview}
                                minEditorHeight={150}
                                heightUnits="px"
                            />
                        </div>
                    </LabeledInput>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabeledInput label="Priority" htmlFor="priority">
                            <Select value={priority} onValueChange={(value) => setPriority(value as IssuePriority)}>
                                <SelectTrigger id="priority" className="bg-st border-st_light text-st_white">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent className="bg-st border-st_light text-st_white">
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>
                        </LabeledInput>

                        <LabeledInput label="Points" htmlFor="points">
                            <Input
                                id="points"
                                type="number"
                                value={points}
                                onChange={(e) => setPoints(e.target.value)}
                                placeholder="Story points"
                                className="bg-st border-st_light text-st_white"
                            />
                        </LabeledInput>

                        <LabeledInput label="Type" htmlFor="type">
                            <Select value={type} onValueChange={(value) => setType(value as IssueType)}>
                                <SelectTrigger id="type" className="bg-st border-st_light text-st_white">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="bg-st border-st_light text-st_white">
                                    <SelectItem value="bug">Bug</SelectItem>
                                    <SelectItem value="feature">Feature</SelectItem>
                                    <SelectItem value="improvement">Improvement</SelectItem>
                                    <SelectItem value="task">Task</SelectItem>
                                </SelectContent>
                            </Select>
                        </LabeledInput>

                        <LabeledInput label="Status" htmlFor="status">
                            <Select value={status} onValueChange={(value) => setStatus(value as IssueStatus)}>
                                <SelectTrigger id="status" className="bg-st border-st_light text-st_white">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="bg-st border-st_light text-st_white">
                                    <SelectItem value="backlog">Backlog</SelectItem>
                                    <SelectItem value="groomed">Groomed</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="in_review">In Review</SelectItem>
                                    <SelectItem value="blocked">Blocked</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </LabeledInput>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabeledInput label="Assignee" htmlFor="assignee">
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
                                            <span>{item.label}</span>
                                        </div>
                                    </div>
                                )}
                            />
                        </LabeledInput>

                        <LabeledInput label="Developer" htmlFor="developer">
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
                                            <span>{item.label}</span>
                                        </div>
                                    </div>
                                )}
                            />
                        </LabeledInput>

                        <LabeledInput label="Mail List" htmlFor="mailList">
                            <MultiCombobox
                                items={adminUsers}
                                values={mailListArray}
                                onChange={setMailListArray}
                                placeholder="Select recipients"
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
                                            <span>{item.label}</span>
                                        </div>
                                    </div>
                                )}
                            />
                        </LabeledInput>
                    </div>

                    {mailListArray.length > 0 && (
                        <div className="mt-2">
                            <Label className="text-primary_light mb-2 inline-block">Selected Recipients</Label>
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
                                        <span>{item.label}</span>
                                    </div>
                                )}
                            />
                        </div>
                    )}

                    {/* Sprint Selection */}
                    {sprints.length > 0 && (
                        <div>
                            <Label className="text-primary_light mb-2 block">Assign to Sprints</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {sprints.map((sprint) => (
                                    <CheckboxWithLabel
                                        key={sprint.uuid}
                                        id={`sprint-${sprint.uuid}`}
                                        checked={selectedSprintIds.has(sprint.uuid)}
                                        onCheckedChange={() => handleSprintToggle(sprint.uuid)}
                                        label={`${sprint.title} ${sprint.is_active ? '(Active)' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" variant="outline" onClick={handleClose} className="border-st_light text-st_white hover:bg-st">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-primary_dark hover:bg-primary text-white">
                            {isSubmitting ? 'Creating...' : 'Create Issue'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
