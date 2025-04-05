'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useKanbanStore } from '@/app/admin/kanban/Kanban.Store';
import { createSprint } from '@/app/admin/kanban/Kanban.Actions';
import { toast } from 'react-hot-toast';
import { Checkbox } from '@/components/ui/checkbox';

export function SprintCreateModal() {
    const { isCreateSprintModalOpen, setIsCreateSprintModalOpen, addSprint } = useKanbanStore();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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

            const result = await createSprint(formData);

            if (result.success) {
                addSprint(result.data);
                toast.success('Sprint created successfully');
                setIsCreateSprintModalOpen(false);
                resetForm();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error creating sprint:', error);
            toast.error('Failed to create sprint');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setIsActive(false);
    };

    const handleClose = () => {
        setIsCreateSprintModalOpen(false);
        resetForm();
    };

    return (
        <Dialog open={isCreateSprintModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-st_dark border-st sm:max-w-[500px] text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl text-primary_light">Create New Sprint</DialogTitle>
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
                            {isSubmitting ? 'Creating...' : 'Create Sprint'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
