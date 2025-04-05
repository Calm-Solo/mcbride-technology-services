'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TitleEditOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSave: (newTitle: string) => void;
    isSaving: boolean;
}

export function TitleEditOverlay({ isOpen, onClose, title, onSave, isSaving }: TitleEditOverlayProps) {
    const [newTitle, setNewTitle] = useState(title);

    // Reset newTitle when the overlay opens or title changes
    useEffect(() => {
        if (isOpen) {
            setNewTitle(title);
        }
    }, [isOpen, title]);

    const handleSave = () => {
        if (newTitle.trim()) {
            onSave(newTitle);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-st_dark text-st_white border-st">
                <DialogHeader>
                    <DialogTitle className="text-xl text-primary_light">Edit Title</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <Input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Issue title"
                        className="bg-st border-st_light text-st_white"
                        autoFocus
                    />

                    <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" variant="outline" onClick={onClose} className="border-st_light text-st_white hover:bg-st">
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving || !newTitle.trim()}
                            className="bg-primary_dark hover:bg-primary text-white">
                            {isSaving ? 'Saving...' : 'Save Title'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
