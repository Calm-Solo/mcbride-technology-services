import { create } from 'zustand';
import { KanbanIssue, KanbanSprint } from '@/db/schema';

export type IssueStatus = 'backlog' | 'groomed' | 'in_progress' | 'in_review' | 'blocked' | 'completed';
export type IssuePriority = 'low' | 'medium' | 'high' | 'critical';
export type IssueType = 'bug' | 'feature' | 'improvement' | 'task';

interface KanbanStore {
    issues: KanbanIssue[];
    setIssues: (issues: KanbanIssue[]) => void;
    addIssue: (issue: KanbanIssue) => void;
    updateIssue: (issue: KanbanIssue) => void;
    removeIssue: (issueUuid: string) => void;
    selectedIssue: KanbanIssue | null;
    setSelectedIssue: (issue: KanbanIssue | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (isOpen: boolean) => void;

    // Sprint related state
    sprints: KanbanSprint[];
    setSprints: (sprints: KanbanSprint[]) => void;
    addSprint: (sprint: KanbanSprint) => void;
    updateSprint: (sprint: KanbanSprint) => void;
    removeSprint: (sprintUuid: string) => void;
    selectedSprint: KanbanSprint | null;
    setSelectedSprint: (sprint: KanbanSprint | null) => void;
    isCreateSprintModalOpen: boolean;
    setIsCreateSprintModalOpen: (isOpen: boolean) => void;
    isSprintLoading: boolean;
    setIsSprintLoading: (isLoading: boolean) => void;

    // Edit sprint related state
    isEditSprintModalOpen: boolean;
    setIsEditSprintModalOpen: (isOpen: boolean) => void;
    sprintToEdit: KanbanSprint | null;
    setSprintToEdit: (sprint: KanbanSprint | null) => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
    issues: [],
    setIssues: (issues) => set({ issues }),
    addIssue: (issue) => set((state) => ({ issues: [...state.issues, issue] })),
    updateIssue: (issue) =>
        set((state) => ({
            issues: state.issues.map((i) => (i.uuid === issue.uuid ? issue : i)),
            selectedIssue: state.selectedIssue?.uuid === issue.uuid ? issue : state.selectedIssue,
        })),
    removeIssue: (issueUuid) =>
        set((state) => ({
            issues: state.issues.filter((i) => i.uuid !== issueUuid),
            selectedIssue: state.selectedIssue?.uuid === issueUuid ? null : state.selectedIssue,
        })),
    selectedIssue: null,
    setSelectedIssue: (issue) => set({ selectedIssue: issue }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
    isCreateModalOpen: false,
    setIsCreateModalOpen: (isOpen) => set({ isCreateModalOpen: isOpen }),

    // Sprint related state initialization
    sprints: [],
    setSprints: (sprints) => set({ sprints }),
    addSprint: (sprint) => set((state) => ({ sprints: [...state.sprints, sprint] })),
    updateSprint: (sprint) =>
        set((state) => ({
            sprints: state.sprints.map((s) => (s.uuid === sprint.uuid ? sprint : s)),
            selectedSprint: state.selectedSprint?.uuid === sprint.uuid ? sprint : state.selectedSprint,
        })),
    removeSprint: (sprintUuid) =>
        set((state) => ({
            sprints: state.sprints.filter((s) => s.uuid !== sprintUuid),
            selectedSprint: state.selectedSprint?.uuid === sprintUuid ? null : state.selectedSprint,
        })),
    selectedSprint: null,
    setSelectedSprint: (sprint) => set({ selectedSprint: sprint }),
    isCreateSprintModalOpen: false,
    setIsCreateSprintModalOpen: (isOpen) => set({ isCreateSprintModalOpen: isOpen }),
    isSprintLoading: false,
    setIsSprintLoading: (isLoading) => set({ isSprintLoading: isLoading }),

    // Edit sprint related state initialization
    isEditSprintModalOpen: false,
    setIsEditSprintModalOpen: (isOpen) => set({ isEditSprintModalOpen: isOpen }),
    sprintToEdit: null,
    setSprintToEdit: (sprint) => set({ sprintToEdit: sprint }),
}));
