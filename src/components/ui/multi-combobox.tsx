'use client';

import * as React from 'react';
import { ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

export type ComboboxItem = {
    value: string;
    label: string;
    [key: string]: string | number | boolean | undefined;
};

interface MultiComboboxProps {
    placeholder?: string;
    emptyText?: string;
    searchPlaceholder?: string;
    values: string[]; // Array of selected values
    onChange: (values: string[]) => void;
    items: ComboboxItem[];
    className?: string;
    renderOption?: (item: ComboboxItem) => React.ReactNode;
    maxHeight?: string;
    showSelectedInDropdown?: boolean;
}

export function MultiCombobox({
    placeholder = 'Select options',
    emptyText = 'No results found',
    searchPlaceholder = 'Search...',
    items,
    values = [],
    onChange,
    className,
    renderOption,
    maxHeight = '200px',
    showSelectedInDropdown = false,
}: MultiComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    // Find selected items
    const selectedItems = React.useMemo(() => items.filter((item) => values.includes(item.value)), [items, values]);

    // Filter items based on search
    const filteredItems = React.useMemo(() => {
        // Filter out already selected items and apply search
        const availableItems = showSelectedInDropdown ? items : items.filter((item) => !values.includes(item.value));

        if (!searchValue) return availableItems;

        return availableItems.filter((item) => {
            const matchesLabel = item.label.toLowerCase().includes(searchValue.toLowerCase());
            const matchesEmail = item.email && String(item.email).toLowerCase().includes(searchValue.toLowerCase());
            return matchesLabel || matchesEmail;
        });
    }, [items, values, searchValue, showSelectedInDropdown]);

    // Debug logs
    React.useEffect(() => {
        console.log('MultiCombobox selected values:', values);
        console.log('Selected items:', selectedItems);
    }, [values, selectedItems]);

    const handleSelect = (value: string) => {
        // Add value to the array if not already present
        if (!values.includes(value)) {
            onChange([...values, value]);
        } else if (showSelectedInDropdown) {
            // If already selected and we're showing selected items, remove it
            onChange(values.filter((v) => v !== value));
        }
        setSearchValue('');
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className={cn('w-full justify-between', className)}>
                    {selectedItems.length > 0 ? `${selectedItems.length} selected` : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="p-0 bg-st_dark border-st_light z-[100]"
                align="start"
                side="top"
                sideOffset={5}
                style={{ width: 'var(--radix-popover-trigger-width)' }}>
                <div className="bg-st_dark text-st_white rounded-md overflow-hidden">
                    {/* Search input */}
                    <div className="flex items-center border-b border-st_light px-3 py-2">
                        <input
                            className="flex w-full bg-transparent py-1 text-sm outline-none placeholder:text-slate-500"
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    {/* Results */}
                    <div style={{ maxHeight: maxHeight }} className="overflow-y-auto">
                        {filteredItems.length === 0 ? (
                            <div className="py-6 text-center text-sm">{emptyText}</div>
                        ) : (
                            filteredItems.map((item) => {
                                const isSelected = values.includes(item.value);
                                return (
                                    <div
                                        key={item.value}
                                        className={cn(
                                            'relative flex cursor-pointer select-none items-center py-2 px-3 text-sm outline-none hover:bg-st',
                                            isSelected && showSelectedInDropdown && 'bg-st'
                                        )}
                                        onClick={() => {
                                            handleSelect(item.value);
                                            // Keep the dropdown open to allow more selections
                                        }}>
                                        {renderOption ? renderOption(item) : <div className="flex items-center">{item.label}</div>}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

// Separate component to render selected items
export function SelectedItems({
    items,
    selectedValues,
    onRemove,
    renderItem,
}: {
    items: ComboboxItem[];
    selectedValues: string[];
    onRemove: (value: string) => void;
    renderItem?: (item: ComboboxItem) => React.ReactNode;
}) {
    const selectedItems = React.useMemo(() => items.filter((item) => selectedValues.includes(item.value)), [items, selectedValues]);

    if (selectedItems.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-1 mt-2">
            {selectedItems.map((item) => (
                <Badge key={item.value} className="bg-st border-st_light px-2 py-1 text-xs">
                    {renderItem ? renderItem(item) : item.label}
                    <button type="button" className="ml-2 rounded-full hover:bg-red-700/20" onClick={() => onRemove(item.value)}>
                        <X size={12} />
                    </button>
                </Badge>
            ))}
        </div>
    );
}
