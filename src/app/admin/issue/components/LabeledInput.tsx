'use client';

import React, { ReactNode, Children, isValidElement, cloneElement } from 'react';
import { Label } from '@/components/ui/label';

interface LabeledInputProps {
    label: string;
    htmlFor?: string;
    children: ReactNode;
    className?: string;
}

export function LabeledInput({ label, htmlFor, children, className = '' }: LabeledInputProps) {
    // Clone the child element and ensure it has the correct id attribute if not already set
    const childrenWithId = Children.map(children, (child) => {
        // Only process if the child is a valid React element and we have an htmlFor value
        if (isValidElement<{ id?: string }>(child) && htmlFor) {
            // Check if the child already has an id in its props
            if (!child.props.id) {
                // Clone the element with the id set to the htmlFor value
                return cloneElement(child, { id: htmlFor });
            }
        }
        return child;
    });

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <Label htmlFor={htmlFor} className="text-primary_light w-24 flex-shrink-0">
                {label}
            </Label>
            <div className="flex-grow">{childrenWithId}</div>
        </div>
    );
}
