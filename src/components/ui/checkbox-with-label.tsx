'use client';

import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CheckboxWithLabelProps {
    id: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label: string;
    disabled?: boolean;
}

export function CheckboxWithLabel({ id, checked, onCheckedChange, label, disabled = false }: CheckboxWithLabelProps) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(value: boolean | 'indeterminate') => onCheckedChange(value === true)}
                disabled={disabled}
            />
            <Label htmlFor={id} className={`text-sm ${disabled ? 'text-st_light opacity-70' : 'text-st_white'}`}>
                {label}
            </Label>
        </div>
    );
}
