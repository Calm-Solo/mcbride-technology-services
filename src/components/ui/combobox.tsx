'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type ComboboxItem = {
    value: string;
    label: string;
    [key: string]: string | number | boolean | undefined;
};

interface ComboboxProps {
    placeholder?: string;
    emptyText?: string;
    searchPlaceholder?: string;
    value: string;
    onChange: (value: string) => void;
    items: ComboboxItem[];
    className?: string;
    renderOption?: (item: ComboboxItem) => React.ReactNode;
}

export function Combobox({
    placeholder = 'Select an option',
    emptyText = 'No results found',
    searchPlaceholder = 'Search...',
    items,
    value,
    onChange,
    className,
    renderOption,
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    // Debug logs
    React.useEffect(() => {
        console.log('Combobox mounted with items:', items);
        console.log('Current selected value:', value);
    }, [items, value]);

    // Find selected item
    const selectedItem = React.useMemo(() => items.find((item) => item.value === value), [items, value]);

    // Filter items based on search
    const filteredItems = React.useMemo(() => {
        if (!searchValue) return items;

        return items.filter((item) => {
            const matchesLabel = item.label.toLowerCase().includes(searchValue.toLowerCase());
            const matchesEmail = item.email && String(item.email).toLowerCase().includes(searchValue.toLowerCase());
            return matchesLabel || matchesEmail;
        });
    }, [items, searchValue]);

    // Debug filtered items
    React.useEffect(() => {
        console.log('Search value:', searchValue);
        console.log('Filtered items:', filteredItems);
    }, [searchValue, filteredItems]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className={cn('w-full justify-between', className)}>
                    {selectedItem ? selectedItem.label : placeholder}
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
                    <div className="max-h-72 overflow-y-auto">
                        {filteredItems.length === 0 ? (
                            <div className="py-6 text-center text-sm">{emptyText}</div>
                        ) : (
                            filteredItems.map((item) => (
                                <div
                                    key={item.value}
                                    className={cn(
                                        'relative flex cursor-pointer select-none items-center py-2 px-3 text-sm outline-none hover:bg-st data-[selected]:bg-st',
                                        value === item.value && 'bg-st'
                                    )}
                                    onClick={() => {
                                        onChange(item.value);
                                        setSearchValue('');
                                        setOpen(false);
                                    }}
                                    data-selected={value === item.value}>
                                    {renderOption ? (
                                        renderOption(item)
                                    ) : (
                                        <div className="flex items-center">
                                            <Check className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')} />
                                            {item.label}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
