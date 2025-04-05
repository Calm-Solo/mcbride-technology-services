'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'react-mde/lib/styles/css/react-mde-all.css';
import styles from '@/styles/KanbanMarkdown.module.css';

interface MarkdownEditorOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    initialValue: string;
    onSave: (value: string) => void;
    minHeight?: number;
    isSaving?: boolean;
}

export function MarkdownEditorOverlay({
    isOpen,
    onClose,
    title,
    initialValue,
    onSave,
    minHeight = 200,
    isSaving = false,
}: MarkdownEditorOverlayProps) {
    // Initialize state directly from props
    const [value, setValue] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

    // Reset editor content when the modal opens or initialValue changes
    useEffect(() => {
        console.log('MarkdownEditorOverlay - isOpen:', isOpen, 'initialValue:', initialValue);
        if (isOpen) {
            // Ensure we always have a string, even if initialValue is undefined or null
            setValue(initialValue || '');
            setSelectedTab('write');
        }
    }, [isOpen, initialValue]);

    // If modal is closed, don't render anything
    if (!isOpen) return null;

    const handleSave = () => {
        console.log('Saving markdown content:', value);
        onSave(value);
    };

    const generateMarkdownPreview = (markdown: string) => {
        return Promise.resolve(
            <div
                className={`${styles.markdown} ${styles.editor} mde-preview`}
                style={{
                    color: 'white',
                    backgroundColor: '#292524',
                }}>
                <style>
                    {`
                    /* Override code block styles with higher specificity */
                    .mde-preview pre {
                        background-color: #1c1917 !important;
                        padding: 1em !important;
                        border-radius: 3px !important;
                        overflow: auto !important;
                        margin-bottom: 1em !important;
                        color: white !important;
                    }
                    .mde-preview pre code {
                        background-color: transparent !important;
                        padding: 0 !important;
                        color: white !important;
                        font-family: monospace !important;
                    }
                    .mde-preview code {
                        background-color: #1c1917 !important;
                        color: white !important;
                        padding: 0.2em 0.4em !important;
                        border-radius: 3px !important;
                        font-family: monospace !important;
                    }
                    /* Ensure these specific selectors apply */
                    div.mde-preview pre {
                        background-color: #1c1917 !important;
                        color: white !important;
                    }
                    div.mde-preview code {
                        color: white !important;
                    }
                    `}
                </style>
                <div className="markdown-body" style={{ color: 'white' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-st_dark border border-st_light rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between border-b border-st_light p-4">
                    <h3 className="text-lg font-medium text-white">{title}</h3>
                    <Button variant="ghost" size="sm" onClick={onClose} className="text-st_light hover:text-white">
                        <X size={20} />
                    </Button>
                </div>
                <div className="p-4 flex-grow overflow-auto">
                    <div className={styles.editor}>
                        <ReactMde
                            value={value}
                            onChange={setValue}
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                            generateMarkdownPreview={generateMarkdownPreview}
                            minEditorHeight={minHeight}
                            heightUnits="px"
                        />
                    </div>
                </div>
                <div className="border-t border-st_light p-4 flex justify-end">
                    <Button variant="outline" className="mr-2 text-st_light" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-primary_dark hover:bg-primary text-white">
                        {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
