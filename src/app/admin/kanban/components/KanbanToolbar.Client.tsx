'use client';

import React from 'react';
import { useKanbanStore } from '../Kanban.Store';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, CalendarDays } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip } from 'react-tooltip';

export function KanbanToolbar() {
    const {
        setIsCreateModalOpen,
        setIsCreateSprintModalOpen,
        sprints,
        selectedSprint,
        setSelectedSprint,
        setIsEditSprintModalOpen,
        setSprintToEdit,
    } = useKanbanStore();

    const handleSelectSprint = (sprintUuid: string) => {
        // If "all" is selected, clear the selection
        if (sprintUuid === 'all') {
            setSelectedSprint(null);
            return;
        }

        // Otherwise find the sprint and set it
        const sprint = sprints.find((s) => s.uuid === sprintUuid);
        if (sprint) {
            setSelectedSprint(sprint);
        }
    };

    const handleEditSprint = () => {
        if (selectedSprint) {
            setSprintToEdit(selectedSprint);
            setIsEditSprintModalOpen(true);
        }
    };

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                {sprints.length > 0 && (
                    <Select value={selectedSprint?.uuid || 'all'} onValueChange={handleSelectSprint}>
                        <SelectTrigger className="w-[250px] bg-st border-st_light text-st_white">
                            <SelectValue placeholder="Select a sprint to filter" />
                        </SelectTrigger>
                        <SelectContent className="bg-st border-st_light text-st_white">
                            <SelectItem value="all" className="text-st_white hover:bg-st_darker">
                                All Issues
                            </SelectItem>
                            {sprints.map((sprint) => (
                                <SelectItem key={sprint.uuid} value={sprint.uuid} className="text-st_white hover:bg-st_darker">
                                    {sprint.title} {sprint.is_active ? '(Active)' : ''}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                <Button
                    className="bg-st hover:bg-st_light text-white p-2 h-9 w-9"
                    onClick={() => setIsCreateSprintModalOpen(true)}
                    data-tooltip-id="toolbar-new-sprint-tooltip">
                    <CalendarDays size={18} />
                </Button>
                <Tooltip id="toolbar-new-sprint-tooltip" content="New Sprint" className="z-[100]" />

                <Button
                    className="bg-st hover:bg-st_light text-white p-2 h-9 w-9"
                    onClick={handleEditSprint}
                    disabled={!selectedSprint}
                    data-tooltip-id="toolbar-edit-sprint-tooltip">
                    <Edit size={18} />
                </Button>
                <Tooltip id="toolbar-edit-sprint-tooltip" content="Edit Sprint" className="z-[100]" />

                <Button
                    className="bg-primary_dark hover:bg-primary text-white p-2 h-9 w-9"
                    onClick={() => setIsCreateModalOpen(true)}
                    data-tooltip-id="toolbar-new-issue-tooltip">
                    <PlusCircle size={18} />
                </Button>
                <Tooltip id="toolbar-new-issue-tooltip" content="New Issue" className="z-[100]" />
            </div>
        </div>
    );
}
