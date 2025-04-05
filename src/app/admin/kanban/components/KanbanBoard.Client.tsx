'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useKanbanStore, IssueStatus } from '../Kanban.Store';
import { useRouter } from 'next/navigation';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { KanbanIssue } from '@/db/schema';
import {
    Bug,
    Sparkles,
    ArrowUpCircle,
    ListTodo,
    User,
    AlertCircle,
    ChevronDown,
    RefreshCcw,
    BarChart,
    CalendarDays,
    PlusCircle,
    Clock,
    CheckCircle2,
    TrendingUp,
    TrendingDown,
    Edit,
} from 'lucide-react';
import {
    updateKanbanIssueStatus,
    updateIssueSprintAssignments,
    fetchAllKanbanIssues,
    fetchAllSprints,
} from '@/app/admin/kanban/Kanban.Actions';
import { getAdminUsers } from '@/app/actions/ClerkUsers.actions';
import { toast } from 'react-hot-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IssueCreateModal } from '@/components/ui/kanban/IssueCreate.Modal';
import { SprintCreateModal } from '@/components/ui/kanban/SprintCreate.Modal';
import { SprintEditModal } from '@/components/ui/kanban/SprintEdit.Modal';
import { BurndownChart } from '@/components/ui/kanban/BurndownChart';
import { Tooltip } from 'react-tooltip';

// Define AdminUser interface
interface AdminUser {
    id: string;
    fullName: string;
    imageUrl: string;
    initials: string;
}

// Constants for column display
const statusColumns: { id: IssueStatus; label: string }[] = [
    { id: 'groomed', label: 'Groomed' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'in_review', label: 'In Review' },
    { id: 'completed', label: 'Completed' },
];

// Icon configurations
const priorityIcons = {
    low: <ArrowUpCircle size={14} className="text-green-600" />,
    medium: <ArrowUpCircle size={14} className="text-blue-600" />,
    high: <ArrowUpCircle size={14} className="text-orange-600" />,
    critical: <ArrowUpCircle size={14} className="text-red-600" />,
};

const typeIcons = {
    bug: <Bug size={14} className="text-red-400" />,
    feature: <Sparkles size={14} className="text-purple-400" />,
    improvement: <ArrowUpCircle size={14} className="text-blue-400" />,
    task: <ListTodo size={14} className="text-gray-400" />,
};

// Custom Avatar Component with error handling
const UserAvatar = ({ user }: { user: AdminUser }) => {
    const [imageError, setImageError] = useState(false);

    if (!user) return <User size={16} className="text-st_lighter/70" />;

    return (
        <Avatar className="h-5 w-5">
            {user.imageUrl && !imageError ? (
                <AvatarImage src={user.imageUrl} alt={user.fullName} onError={() => setImageError(true)} />
            ) : (
                <AvatarFallback className="text-[8px] bg-primary/20 text-primary">
                    {user.initials || user.fullName.charAt(0)}
                </AvatarFallback>
            )}
        </Avatar>
    );
};

// Format date with time for PST display
const formatDateTime = (dateString: string | Date | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
};

// DraggableIssue component
interface DraggableIssueProps {
    issue: KanbanIssue;
    onView: (issue: KanbanIssue) => void;
    isBlocked?: boolean;
    adminUsers?: AdminUser[];
    isInSelectedSprint?: boolean;
}

const DraggableIssue: React.FC<DraggableIssueProps> = ({
    issue,
    onView,
    isBlocked = false,
    adminUsers = [],
    isInSelectedSprint = false,
}) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'ISSUE',
        item: { issueId: issue.uuid },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const assignee = issue.assignee ? adminUsers.find((user) => user.id === issue.assignee) : null;

    return (
        <div
            // @ts-expect-error - React-dnd typing issue
            ref={drag}
            className={`bg-st p-3 rounded shadow-sm cursor-pointer border hover:shadow-md transition-all ${
                isBlocked
                    ? 'border-red-800/50 hover:border-red-500'
                    : isInSelectedSprint
                      ? 'border-primary/50 hover:border-primary'
                      : 'border-st_light hover:border-primary'
            } ${isDragging ? 'opacity-50' : ''}`}
            onClick={() => onView(issue)}>
            <div className="flex flex-col gap-2 w-full">
                {/* ID in small font at top left and profile at top right */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-st_lighter">ID-{issue.id}</span>
                        {isInSelectedSprint && issue.status === 'backlog' && (
                            <span className="text-[10px] px-1 py-0.5 bg-primary/20 text-primary rounded">In Sprint</span>
                        )}
                    </div>
                    <div className="flex items-center">
                        {assignee ? <UserAvatar user={assignee} /> : <User size={16} className="text-st_lighter/70" />}
                    </div>
                </div>

                <h4 className="font-medium text-st_white text-sm line-clamp-2">{issue.title}</h4>

                <div className="flex flex-col md:flex-row md:flex-wrap gap-2">
                    <div className="flex flex-row gap-2">
                        <div className="flex items-center gap-1 bg-st_darker px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                            {priorityIcons[issue.priority as keyof typeof priorityIcons]}
                            <span className="text-st_lighter">{issue.priority}</span>
                        </div>

                        <div className="flex items-center gap-1 bg-st_darker px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                            {typeIcons[issue.type as keyof typeof typeIcons]}
                            <span className="text-st_lighter">{issue.type}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// DropTarget component
interface DropTargetProps {
    status: IssueStatus;
    onDrop: (issueId: string, status: IssueStatus) => void;
    children: React.ReactNode;
    className?: string;
}

const DropTarget: React.FC<DropTargetProps> = ({ status, onDrop, children, className }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'ISSUE',
        drop: (item: { issueId: string }) => {
            onDrop(item.issueId, status);
            return { status };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div
            // @ts-expect-error - React-dnd typing issue
            ref={drop}
            className={`${className} ${isOver ? 'ring-2 ring-primary' : ''}`}>
            {children}
        </div>
    );
};

// Main KanbanBoard component
export function KanbanBoard() {
    const router = useRouter();
    const {
        issues,
        updateIssue,
        selectedSprint,
        setSelectedIssue,
        setIssues,
        sprints,
        setSprints,
        setSelectedSprint,
        setIsCreateModalOpen,
        setIsCreateSprintModalOpen,
        setSprintToEdit,
        setIsEditSprintModalOpen,
    } = useKanbanStore();

    const [autoRefresh, setAutoRefresh] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(5);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showBurndownChart, setShowBurndownChart] = useState(false);
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
    const [lastRefreshTime, setLastRefreshTime] = useState<number>(Date.now());

    // Initial data loading
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Load issues and sprints in parallel
                const [issuesResult, sprintsResult] = await Promise.all([fetchAllKanbanIssues(), fetchAllSprints()]);

                if (issuesResult.success) {
                    setIssues(issuesResult.data);
                } else {
                    toast.error('Failed to load issues');
                }

                if (sprintsResult.success) {
                    setSprints(sprintsResult.data);
                    // Set active sprint as selected if one exists
                    const activeSprint = sprintsResult.data.find((sprint) => sprint.is_active);
                    if (activeSprint) {
                        setSelectedSprint(activeSprint);
                    }
                } else {
                    toast.error('Failed to load sprints');
                }
            } catch (error) {
                console.error('Error loading initial data:', error);
                toast.error('Failed to load kanban board data');
            }
        };

        loadInitialData();
        loadAdminUsers();
    }, [setIssues, setSprints, setSelectedSprint]);

    // Add function to load admin users
    const loadAdminUsers = async () => {
        try {
            // Fetch admin users
            const adminUsersResult = await getAdminUsers();

            if (adminUsersResult.success && adminUsersResult.data) {
                setAdminUsers(adminUsersResult.data);
            } else {
                console.error('Failed to load admin users:', adminUsersResult.message);
            }
        } catch (error) {
            console.error('Error loading admin users:', error);
        }
    };

    // Calculate sprint metrics
    const calculateSprintMetrics = () => {
        if (!selectedSprint) return null;

        // Get current time (UTC)
        const now = new Date();

        if (selectedSprint && selectedSprint.start_date && selectedSprint.end_date) {
            // Create dates from DB (which are in UTC)
            const startDate = new Date(selectedSprint.start_date);
            const endDate = new Date(selectedSprint.end_date);

            // Calculate hours left (keep calculation in UTC)
            const hoursLeft = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60)));

            // Calculate total sprint hours (in UTC, which is valid for hour differences)
            const totalHours = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));

            // Calculate hours elapsed (keep calculation in UTC)
            const hoursElapsed = Math.max(0, Math.min(totalHours, totalHours - hoursLeft));

            // Calculate ideal progress (linear) based on hours
            const idealProgress = totalHours > 0 ? Math.round((hoursElapsed / totalHours) * 100) : 0;

            const sprintIssues = issues.filter((issue) => issue.sprints && issue.sprints.includes(selectedSprint.uuid));

            const totalPoints = sprintIssues.reduce((sum, issue) => sum + (issue.points || 0), 0);
            const completedPoints = sprintIssues
                .filter((issue) => issue.status === 'completed')
                .reduce((sum, issue) => sum + (issue.points || 0), 0);
            const inProgressPoints = sprintIssues
                .filter((issue) => issue.status === 'in_progress')
                .reduce((sum, issue) => sum + (issue.points || 0), 0);
            const notStartedPoints = totalPoints - completedPoints - inProgressPoints;

            return {
                hoursLeft,
                totalHours,
                hoursElapsed,
                idealProgress,
                totalPoints,
                completedPoints,
                inProgressPoints,
                notStartedPoints,
                completion: totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0,
            };
        }
    };

    // Get sprint metrics
    const sprintMetrics = calculateSprintMetrics();

    // Create a function for refreshing data
    const refreshData = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const result = await fetchAllKanbanIssues();
            if (result.success) {
                setIssues(result.data);
                setLastRefreshTime(Date.now());
                // Also refresh admin users when data is refreshed
                await loadAdminUsers();
            }
        } catch (error) {
            console.error('Error refreshing issues:', error);
        } finally {
            setIsRefreshing(false);
        }
    }, [setIssues, setLastRefreshTime]);

    // Auto-refresh effect
    useEffect(() => {
        if (!autoRefresh) return;

        // Calculate time until next refresh based on last refresh
        const timeUntilNextRefresh = Math.max(0, refreshInterval * 1000 - (Date.now() - lastRefreshTime));

        const timer = setTimeout(async () => {
            await refreshData();
        }, timeUntilNextRefresh);

        return () => clearTimeout(timer);
    }, [autoRefresh, refreshInterval, lastRefreshTime, refreshData]);

    // Filter issues by selected sprint for main columns
    const filteredIssues = selectedSprint ? issues.filter((issue) => issue.sprints && issue.sprints.includes(selectedSprint.uuid)) : issues;

    // Get backlog issues (from all issues, not filtered by sprint)
    const backlogIssues = issues.filter((issue) => issue.status === 'backlog');

    // Get blocked issues (use filtered issues to only show blocked items for selected sprint)
    const blockedIssues = filteredIssues.filter((issue) => issue.status === 'blocked');

    // Handle issue view (navigate to issue details)
    const handleViewIssue = (issue: KanbanIssue) => {
        setSelectedIssue(issue);
        router.push(`/admin/issue?issue_id=${issue.uuid}`);
    };

    // Get issues by status
    const getIssuesByStatus = (status: IssueStatus) => {
        return filteredIssues.filter((issue) => issue.status === status);
    };

    // Handle dropping an issue
    const handleDrop = async (issueId: string, newStatus: IssueStatus) => {
        // Find the issue being moved
        const issue = issues.find((i) => i.uuid === issueId);
        if (!issue) return;

        const oldStatus = issue.status;

        let isAddSprint = false;
        let isRemoveSprint = false;

        // If moving from backlog to a different status and a sprint is selected,
        // ensure the issue is added to the sprint if not already present
        if (oldStatus === 'backlog' && newStatus !== 'backlog' && selectedSprint) {
            const isInSprint = issue.sprints && issue.sprints.includes(selectedSprint.uuid);
            if (!isInSprint) {
                isAddSprint = true;
            }
        }

        // If moving to backlog from a different status and a sprint is selected,
        // consider removing from sprint
        if (oldStatus !== 'backlog' && newStatus === 'backlog' && selectedSprint) {
            isRemoveSprint = true;
        }

        try {
            // Update status via server action
            const result = await updateKanbanIssueStatus(issueId, newStatus);
            if (result.success) {
                // Update local state
                updateIssue(result.data);

                // When moving an issue from backlog to any other status and a sprint is selected,
                // we should ensure the issue gets added to the selected sprint
                if (selectedSprint && (isAddSprint || isRemoveSprint)) {
                    let sprintUuids: string[] = [];

                    if (issue.sprints) {
                        sprintUuids = issue.sprints.split(',').filter(Boolean);
                    }

                    if (isRemoveSprint) {
                        // Remove from current sprint
                        sprintUuids = sprintUuids.filter((uuid) => uuid !== selectedSprint.uuid);
                    } else if (isAddSprint) {
                        // Add to current sprint if not already included
                        if (!sprintUuids.includes(selectedSprint.uuid)) {
                            sprintUuids.push(selectedSprint.uuid);
                        }
                    }

                    // Update sprint assignments
                    await updateIssueSprintAssignments(issueId, sprintUuids).catch((err) => {
                        console.error('Error updating sprint assignments:', err);
                        toast.error('Failed to update sprint assignments');
                    });
                }

                // Force a recalculation of sprint metrics by updating the store
                if (selectedSprint) {
                    const updatedIssues = issues.map((i) => (i.uuid === issueId ? result.data : i));
                    setIssues(updatedIssues);
                }

                // Trigger immediate refresh after successful update
                await refreshData();
            } else {
                toast.error(result.message || 'Failed to update issue status');
            }
        } catch (error) {
            console.error('Error updating issue status:', error);
            toast.error('Failed to update issue status');
        }
    };

    const handleSprintChange = (value: string) => {
        if (value === 'all') {
            setSelectedSprint(null);
        } else {
            const sprint = sprints.find((s) => s.uuid === value);
            if (sprint) {
                setSelectedSprint(sprint);
            }
        }
    };

    // Add this useEffect to refresh admin users when issues change
    useEffect(() => {
        // Re-load admin users whenever the issues change
        // This ensures we have the most up-to-date user information
        if (issues.length > 0) {
            loadAdminUsers();
        }
    }, [issues]); // Only refresh when issues array changes

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col space-y-6 mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="min-w-[200px]">
                            <Select value={selectedSprint?.uuid || 'all'} onValueChange={handleSprintChange}>
                                <SelectTrigger className="bg-st border-st_light text-white">
                                    <SelectValue placeholder="Select a sprint" />
                                </SelectTrigger>
                                <SelectContent className="bg-st_dark border-st_light text-white">
                                    <SelectItem value="all">All Issues</SelectItem>
                                    {sprints.map((sprint) => (
                                        <SelectItem key={sprint.uuid} value={sprint.uuid}>
                                            {sprint.title} {sprint.is_active ? '(Active)' : ''}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                                <Switch
                                    checked={autoRefresh}
                                    onCheckedChange={setAutoRefresh}
                                    className={`
                                    relative h-[24px] w-[44px] cursor-pointer rounded-full
                                    bg-st border-2 border-st_light transition-colors
                                    data-[state=checked]:bg-primary data-[state=checked]:border-primary
                                    [&>span]:data-[state=checked]:translate-x-[20px]
                                    [&>span]:data-[state=checked]:bg-white
                                    [&>span]:bg-st_lighter`}>
                                    <span
                                        className="block h-[16px] w-[16px] rounded-full transition-transform 
                                    duration-200 translate-x-[2px] absolute top-[2px]"
                                    />
                                </Switch>
                                <RefreshCcw size={16} className={`${isRefreshing ? 'text-primary animate-spin' : 'text-st_lightest'}`} />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-st">
                                            <ChevronDown size={14} className="text-st_light" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48 bg-st_dark border-st_light p-3">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-st_lighter">Interval</span>
                                                <span className="text-sm text-st_white">{refreshInterval}s</span>
                                            </div>
                                            <div className="px-1">
                                                <input
                                                    type="range"
                                                    value={refreshInterval}
                                                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                                                    min={1}
                                                    max={60}
                                                    step={1}
                                                    className="
                                                    w-full h-1.5 bg-st rounded-lg appearance-none cursor-pointer
                                                    [&::-webkit-slider-thumb]:appearance-none
                                                    [&::-webkit-slider-thumb]:w-3
                                                    [&::-webkit-slider-thumb]:h-3
                                                    [&::-webkit-slider-thumb]:rounded-full
                                                    [&::-webkit-slider-thumb]:bg-primary
                                                    [&::-webkit-slider-thumb]:cursor-pointer
                                                    [&::-moz-range-thumb]:border-none
                                                    [&::-moz-range-thumb]:w-3
                                                    [&::-moz-range-thumb]:h-3
                                                    [&::-moz-range-thumb]:rounded-full
                                                    [&::-moz-range-thumb]:bg-primary
                                                    [&::-moz-range-thumb]:cursor-pointer
                                                "
                                                />
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <Button
                            onClick={() => setShowBurndownChart(true)}
                            disabled={!selectedSprint}
                            className={`bg-st hover:bg-st_light text-white p-2 h-9 w-9 ${!selectedSprint ? 'opacity-50 cursor-not-allowed' : ''}`}
                            data-tooltip-id="burndown-chart-tooltip">
                            <BarChart size={18} />
                        </Button>
                        <Tooltip id="burndown-chart-tooltip" content="Burndown Chart" className="z-[100]" />

                        <Button
                            onClick={() => {
                                setSprintToEdit(selectedSprint);
                                setIsEditSprintModalOpen(true);
                            }}
                            disabled={!selectedSprint}
                            className={`bg-st hover:bg-st_light text-white p-2 h-9 w-9 ${!selectedSprint ? 'opacity-50 cursor-not-allowed' : ''}`}
                            data-tooltip-id="edit-sprint-tooltip">
                            <Edit size={18} />
                        </Button>
                        <Tooltip id="edit-sprint-tooltip" content="Edit Sprint" className="z-[100]" />

                        <Button
                            onClick={() => setIsCreateSprintModalOpen(true)}
                            className="bg-st hover:bg-st_light text-white p-2 h-9 w-9"
                            data-tooltip-id="new-sprint-tooltip">
                            <CalendarDays size={18} />
                        </Button>
                        <Tooltip id="new-sprint-tooltip" content="New Sprint" className="z-[100]" />

                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-primary_dark hover:bg-primary text-white p-2 h-9 w-9"
                            data-tooltip-id="new-issue-tooltip">
                            <PlusCircle size={18} />
                        </Button>
                        <Tooltip id="new-issue-tooltip" content="New Issue" className="z-[100]" />
                    </div>
                </div>

                {/* Sprint Metrics Dashboard */}
                <div className="bg-st_dark rounded-lg p-4 border border-st_light">
                    {selectedSprint ? (
                        <div className="flex flex-col space-y-3">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div className="bg-st p-2 rounded border border-st_light">
                                    <div className="text-xs text-st_lighter">Start</div>
                                    <div className="text-sm text-white">{formatDateTime(selectedSprint?.start_date)}</div>
                                </div>

                                <div className="bg-st p-2 rounded border border-st_light">
                                    <div className="text-xs text-st_lighter">End</div>
                                    <div className="text-sm text-white">{formatDateTime(selectedSprint?.end_date)}</div>
                                </div>

                                <div className="bg-st p-2 rounded border border-st_light">
                                    <div className="text-xs text-st_lighter">Hours Left</div>
                                    <div className="text-sm text-white">
                                        {sprintMetrics?.hoursLeft || 0} {(sprintMetrics?.hoursLeft || 0) === 1 ? 'hour' : 'hours'}
                                        <span className="text-xs text-st_lighter ml-1">
                                            ({Math.round(((sprintMetrics?.hoursLeft || 0) / 24) * 10) / 10} days)
                                        </span>
                                    </div>
                                </div>

                                <div className="col-span-2 grid grid-cols-4 gap-2">
                                    <div className="bg-st p-2 rounded border border-st_light">
                                        <div className="text-xs text-st_lighter">Total Points</div>
                                        <div className="text-sm text-white">{sprintMetrics?.totalPoints || 0}</div>
                                    </div>

                                    <div className="bg-st p-2 rounded border border-green-800/40">
                                        <div className="text-xs text-st_lighter">Completed</div>
                                        <div className="text-sm text-green-400">{sprintMetrics?.completedPoints || 0}</div>
                                    </div>

                                    <div className="bg-st p-2 rounded border border-orange-800/40">
                                        <div className="text-xs text-st_lighter">In Progress</div>
                                        <div className="text-sm text-orange-400">{sprintMetrics?.inProgressPoints || 0}</div>
                                    </div>

                                    <div className="bg-st p-2 rounded border border-red-800/40">
                                        <div className="text-xs text-st_lighter">Not Started</div>
                                        <div className="text-sm text-red-400">{sprintMetrics?.notStartedPoints || 0}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Always show progress bar */}
                            <div className="w-full mt-3 mb-2">
                                <div className="flex items-center w-full gap-2">
                                    <div className="relative w-full h-2 bg-st_light rounded-full">
                                        {/* Actual progress */}
                                        <div
                                            className="h-full bg-primary transition-all duration-500 ease-in-out rounded-full"
                                            style={{ width: `${sprintMetrics?.completion || 0}%` }}
                                        />

                                        {/* Ideal progress marker */}
                                        {sprintMetrics && sprintMetrics.idealProgress > 0 && (
                                            <div
                                                className="absolute top-[-8px] bottom-[-8px] w-[5px] bg-yellow-400 z-20 rounded-full"
                                                style={{ left: `${sprintMetrics.idealProgress}%`, transform: 'translateX(-50%)' }}
                                                data-tooltip-id="ideal-progress-tooltip"
                                            />
                                        )}

                                        {/* Actual progress marker */}
                                        {sprintMetrics && sprintMetrics.completion > 0 && (
                                            <div
                                                className={`absolute top-[-8px] bottom-[-8px] w-[5px] z-20 rounded-full ${
                                                    sprintMetrics.completion >= sprintMetrics.idealProgress ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                                style={{ left: `${sprintMetrics.completion}%`, transform: 'translateX(-50%)' }}
                                                data-tooltip-id="actual-progress-tooltip"
                                            />
                                        )}
                                    </div>
                                    <div className="text-xs text-st_lighter whitespace-nowrap">{sprintMetrics?.completion || 0}%</div>
                                </div>
                                <div className="flex justify-end text-xs text-st_lighter mt-1">
                                    <span data-tooltip-id="sprint-hours-tooltip" className="flex items-center gap-1 cursor-help">
                                        <Clock size={12} />
                                        {sprintMetrics?.hoursElapsed || 0} hrs / {sprintMetrics?.totalHours || 0} hrs
                                    </span>
                                </div>
                            </div>

                            {/* Tooltip for detailed hours information */}
                            <Tooltip
                                id="sprint-hours-tooltip"
                                className="z-[100] !opacity-100"
                                place="top"
                                style={{
                                    color: 'white',
                                    borderRadius: '0.375rem',
                                    padding: '8px 12px',
                                    fontSize: '0.75rem',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                }}
                                render={() => (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} className="text-primary" />
                                            <span>
                                                Elapsed: <span className="text-primary">{sprintMetrics?.hoursElapsed || 0} hours</span> (
                                                {Math.round(((sprintMetrics?.hoursElapsed || 0) / 24) * 10) / 10} days)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CalendarDays size={14} className="text-st_lighter" />
                                            <span>
                                                Total: <span className="text-primary">{sprintMetrics?.totalHours || 0} hours</span> (
                                                {Math.round(((sprintMetrics?.totalHours || 0) / 24) * 10) / 10} days)
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-3">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div className="bg-st p-2 rounded border border-st_light">
                                    <div className="text-xs text-st_lighter">Start</div>
                                    <div className="text-sm text-st_lighter">Select a sprint</div>
                                </div>

                                <div className="bg-st p-2 rounded border border-st_light">
                                    <div className="text-xs text-st_lighter">End</div>
                                    <div className="text-sm text-st_lighter">Select a sprint</div>
                                </div>

                                <div className="bg-st p-2 rounded border border-st_light">
                                    <div className="text-xs text-st_lighter">Hours Left</div>
                                    <div className="text-sm text-st_lighter">--</div>
                                </div>

                                <div className="col-span-2 grid grid-cols-4 gap-2">
                                    <div className="bg-st p-2 rounded border border-st_light">
                                        <div className="text-xs text-st_lighter">Total Points</div>
                                        <div className="text-sm text-st_lighter">0</div>
                                    </div>

                                    <div className="bg-st p-2 rounded border border-st_light">
                                        <div className="text-xs text-st_lighter">Completed</div>
                                        <div className="text-sm text-st_lighter">0</div>
                                    </div>

                                    <div className="bg-st p-2 rounded border border-st_light">
                                        <div className="text-xs text-st_lighter">In Progress</div>
                                        <div className="text-sm text-st_lighter">0</div>
                                    </div>

                                    <div className="bg-st p-2 rounded border border-st_light">
                                        <div className="text-xs text-st_lighter">Not Started</div>
                                        <div className="text-sm text-st_lighter">0</div>
                                    </div>
                                </div>
                            </div>

                            {/* Always show progress bar */}
                            <div className="w-full mt-3 mb-2">
                                <div className="flex items-center w-full gap-2">
                                    <div className="w-full h-2 bg-st_light rounded-full">
                                        <div
                                            className="h-full bg-primary transition-all duration-500 ease-in-out rounded-full"
                                            style={{ width: '0%' }}
                                        />
                                    </div>
                                    <div className="text-xs text-st_lighter whitespace-nowrap">0%</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tooltips added outside the progress bar container for better visibility */}
                <Tooltip
                    id="ideal-progress-tooltip"
                    className="z-[100] !opacity-100"
                    place="top"
                    style={{
                        color: 'white',
                        borderRadius: '0.375rem',
                        padding: '8px 12px',
                        fontSize: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                    render={() => (
                        <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-yellow-400" />
                            <span>
                                Ideal Progress: <strong>{sprintMetrics?.idealProgress || 0}%</strong> (based on hours elapsed in PST)
                            </span>
                        </div>
                    )}
                />
                <Tooltip
                    id="actual-progress-tooltip"
                    className="z-[100] !opacity-100"
                    place="top"
                    style={{
                        color: 'white',
                        borderRadius: '0.375rem',
                        padding: '8px 12px',
                        fontSize: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                    render={() => {
                        if (!sprintMetrics) return null;

                        const isAheadOfSchedule = sprintMetrics.completion >= sprintMetrics.idealProgress;

                        return (
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 size={14} className={isAheadOfSchedule ? 'text-green-500' : 'text-red-500'} />
                                <span>
                                    Actual Progress: <strong>{sprintMetrics.completion}%</strong>
                                </span>
                                {isAheadOfSchedule ? (
                                    <div className="flex items-center gap-1 text-green-500">
                                        <TrendingUp size={14} />
                                        <span>Ahead of schedule</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-red-500">
                                        <TrendingDown size={14} />
                                        <span>Behind schedule</span>
                                    </div>
                                )}
                            </div>
                        );
                    }}
                />

                {/* Main Kanban columns */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
                    {statusColumns.map((column) => (
                        <DropTarget
                            key={column.id}
                            status={column.id}
                            onDrop={handleDrop}
                            className="bg-st_dark rounded-lg p-4 shadow-sm border border-st flex-1">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-medium text-primary_light text-sm flex items-center">
                                    {column.label}
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-st rounded-full">
                                        {getIssuesByStatus(column.id).length}
                                    </span>
                                </h3>
                                <div className="text-xs text-st_lighter">
                                    {getIssuesByStatus(column.id).reduce((sum, issue) => sum + (issue.points || 0), 0)} pts
                                </div>
                            </div>
                            <div className="space-y-2  min-h-[500px] max-h-[500px] overflow-y-auto pr-1">
                                {getIssuesByStatus(column.id).map((issue) => (
                                    <DraggableIssue
                                        key={issue.uuid}
                                        issue={issue}
                                        onView={handleViewIssue}
                                        adminUsers={adminUsers}
                                        isInSelectedSprint={
                                            !!(selectedSprint && issue.sprints && issue.sprints.includes(selectedSprint.uuid))
                                        }
                                    />
                                ))}
                            </div>
                        </DropTarget>
                    ))}
                </div>

                {/* Backlog and Blocked Issues */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                    {/* Backlog Column */}
                    <DropTarget
                        status="backlog"
                        onDrop={handleDrop}
                        className="bg-st_dark rounded-lg p-4 shadow-sm border border-st flex-1">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium text-primary_light text-sm flex items-center">
                                All Backlog Issues
                                <span className="ml-2 px-2 py-0.5 text-xs bg-st rounded-full">{backlogIssues.length}</span>
                            </h3>
                            <div className="text-xs text-st_lighter">
                                {backlogIssues.reduce((sum, issue) => sum + (issue.points || 0), 0)} pts
                            </div>
                        </div>
                        <div className="space-y-2 min-h-[400px] max-h-[400px] overflow-y-auto pr-1">
                            {backlogIssues.map((issue) => (
                                <DraggableIssue
                                    key={issue.uuid}
                                    issue={issue}
                                    onView={handleViewIssue}
                                    adminUsers={adminUsers}
                                    isInSelectedSprint={!!(selectedSprint && issue.sprints && issue.sprints.includes(selectedSprint.uuid))}
                                />
                            ))}
                        </div>
                    </DropTarget>

                    {/* Blocked Issues Column */}
                    <DropTarget
                        status="blocked"
                        onDrop={handleDrop}
                        className="bg-red-900/20 rounded-lg p-4 shadow-sm border border-red-800 flex-1">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium text-red-400 text-sm flex items-center gap-2">
                                <AlertCircle size={16} />
                                Blocked Issues
                                <span className="ml-1 px-2 py-0.5 text-xs bg-red-900/40 rounded-full">{blockedIssues.length}</span>
                            </h3>
                            <div className="text-xs text-red-400">
                                {blockedIssues.reduce((sum, issue) => sum + (issue.points || 0), 0)} pts
                            </div>
                        </div>
                        {blockedIssues.length > 0 ? (
                            <div className="space-y-2 min-h-[400px] max-h-[400px] overflow-y-auto pr-1">
                                {blockedIssues.map((issue) => (
                                    <DraggableIssue
                                        key={issue.uuid}
                                        issue={issue}
                                        onView={handleViewIssue}
                                        isBlocked
                                        adminUsers={adminUsers}
                                        isInSelectedSprint={
                                            !!(selectedSprint && issue.sprints && issue.sprints.includes(selectedSprint.uuid))
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-20 text-st_light">
                                <p>No blocked issues</p>
                            </div>
                        )}
                    </DropTarget>
                </div>

                <IssueCreateModal />
                <SprintCreateModal />
                <SprintEditModal />

                {showBurndownChart && selectedSprint && (
                    <BurndownChart
                        isOpen={showBurndownChart}
                        onClose={() => setShowBurndownChart(false)}
                        sprint={selectedSprint}
                        issues={issues}
                    />
                )}
            </div>
        </DndProvider>
    );
}

// Add global type definition
declare global {
    interface Window {
        __KANBAN_ADMIN_USERS__?: AdminUser[];
    }
}
