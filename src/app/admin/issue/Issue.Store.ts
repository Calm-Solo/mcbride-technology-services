import { create } from 'zustand';
import { KanbanIssue, KanbanMessage } from '@/db/schema';

interface IssueStore {
    issue: KanbanIssue | null;
    setIssue: (issue: KanbanIssue | null) => void;
    messages: KanbanMessage[];
    setMessages: (messages: KanbanMessage[]) => void;
    addMessage: (message: KanbanMessage) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isSubmitting: boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
    isDeleting: boolean;
    setIsDeleting: (isDeleting: boolean) => void;
}

export const useIssueStore = create<IssueStore>((set) => ({
    issue: null,
    setIssue: (issue) => set({ issue }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    isLoading: true,
    setIsLoading: (isLoading) => set({ isLoading }),
    isSubmitting: false,
    setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
    isDeleting: false,
    setIsDeleting: (isDeleting) => set({ isDeleting }),
}));
