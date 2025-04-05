'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useKanbanStore } from '@/app/admin/kanban/Kanban.Store';
import { updateSprint } from '@/app/admin/kanban/Kanban.Actions';
import { toast } from 'react-hot-toast';
import { Checkbox } from '@/components/ui/checkbox';

export function SprintEditModal() {
    const { isEditSprintModalOpen, setIsEditSprintModalOpen, sprintToEdit, updateSprint: updateSprintInStore } = useKanbanStore();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load sprint data when sprintToEdit changes
    useEffect(() => {
        if (sprintToEdit) {
            setTitle(sprintToEdit.title);
            setDescription(sprintToEdit.description || '');

            // Format dates for input type="date" (YYYY-MM-DD)
            const formatDateForInput = (dateString: string | Date) => {
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            };

            if (sprintToEdit.start_date) {
                setStartDate(formatDateForInput(sprintToEdit.start_date));
            }

            if (sprintToEdit.end_date) {
                setEndDate(formatDateForInput(sprintToEdit.end_date));
            }

            setIsActive(sprintToEdit.is_active || false);
        }
    }, [sprintToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!sprintToEdit) {
            toast.error('No sprint selected for editing');
            return;
        }

        if (!title || !description || !startDate || !endDate) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('start_date', startDate);
            formData.append('end_date', endDate);
            formData.append('is_active', isActive.toString());

            const result = await updateSprint(sprintToEdit.uuid, formData);

            if (result.success) {
                updateSprintInStore(result.data);
                toast.success('Sprint updated successfully');
                setIsEditSprintModalOpen(false);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error updating sprint:', error);
            toast.error('Failed to update sprint');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsEditSprintModalOpen(false);
    };

    return (
        <Dialog open={isEditSprintModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-st_dark border-st sm:max-w-[500px] text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl text-primary_light">Edit Sprint</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title" className="text-sm font-medium text-st_white">
                            Sprint Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-st border-st_light mt-2"
                            placeholder="Sprint title"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="description" className="text-sm font-medium text-st_white">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-st border-st_light mt-2 h-24"
                            placeholder="Sprint description"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="start_date" className="text-sm font-medium text-st_white">
                                Start Date
                            </Label>
                            <Input
                                id="start_date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-st border-st_light mt-2"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="end_date" className="text-sm font-medium text-st_white">
                                End Date
                            </Label>
                            <Input
                                id="end_date"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-st border-st_light mt-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="is_active"
                            checked={isActive}
                            onCheckedChange={(value: boolean | 'indeterminate') => setIsActive(value === true)}
                        />
                        <Label htmlFor="is_active" className="text-sm font-medium text-st_white">
                            Set as active sprint
                        </Label>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={handleClose}
                            variant="outline"
                            className="bg-transparent border-st_light hover:bg-st text-st_light">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-primary_dark hover:bg-primary text-white">
                            {isSubmitting ? 'Updating...' : 'Update Sprint'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
