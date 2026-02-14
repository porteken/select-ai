'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommandLoading } from 'cmdk';
import { cn } from 'lib/utils';
import { Check, ChevronsUpDown, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { fetchUsers, type User } from '@/lib/mock-data';

// Popover components
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = PopoverPrimitive.Content;

export interface SelectFilterProperties {
  className?: string;
  clearable?: boolean;
  disabled?: boolean;
  label?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
  width?: number | string;
}

interface FetchResult {
  hasMore: boolean;
  total: number;
  users: User[];
}

export function SelectFilter({
  className,
  clearable = true,
  disabled = false,
  label = 'User',
  onChange,
  placeholder = 'Search users...',
  value,
  width = '375px',
}: Readonly<SelectFilterProperties>) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState<User>();
  const loadingReference = React.useRef<HTMLDivElement>(null);

  // Use the fetchUsers function from mock-data
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    enabled: open,
    getNextPageParam: (lastPage, allPages) => {
      if ((lastPage as FetchResult).hasMore) {
        return allPages.length + 1;
      }
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam: pageParameter = 1 }) => {
      const result = await fetchUsers(query, pageParameter);
      return result as FetchResult;
    },
    queryKey: ['users', query],
  });

  // Flatten items from all pages
  const items = React.useMemo(() => {
    const pages = data?.pages as FetchResult[] | undefined;
    return pages?.flatMap((page) => page.users) ?? [];
  }, [data]);

  // Infinite scroll observer
  React.useEffect(() => {
    if (!open || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingReference.current) {
      observer.observe(loadingReference.current);
    }

    return () => observer.disconnect();
  }, [open, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handle selection
  const handleSelect = React.useCallback(
    (userId: string) => {
      const user = items.find((item) => item.id === userId);
      if (user) {
        onChange(user.id);
        setSelectedItem(user);
      }
      setOpen(false);
    },
    [onChange, items]
  );

  // Handle clear
  const handleClear = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onChange('');
      setSelectedItem(undefined);
    },
    [onChange]
  );

  // Find selected item when value changes
  React.useEffect(() => {
    if (value && items.length > 0) {
      const found = items.find((item) => item.id === value);
      setSelectedItem(found);
    }
  }, [value, items]);

  // Display value
  const displayValue = React.useMemo(() => {
    if (selectedItem) {
      return (
        <div className="flex items-center gap-2">
          <Image
            alt={selectedItem.name}
            className="rounded-full"
            height={24}
            src={selectedItem.avatar}
            unoptimized
            width={24}
          />
          <div className="flex flex-col">
            <div className="font-medium">{selectedItem.name}</div>
            <div className="text-xs text-muted-foreground">{selectedItem.role}</div>
          </div>
        </div>
      );
    }
  }, [selectedItem]);

  return (
    <div className={cn('relative', className)} style={{ width }}>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            )}
            type="button"
          >
            {displayValue ? (
              <span className="flex items-center gap-2 truncate">{displayValue}</span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <div className="flex items-center gap-1">
              {clearable && value && !disabled && (
                <X className="h-4 w-4 opacity-50 hover:opacity-100" onClick={handleClear} />
              )}
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0" style={{ width: 'var(--radix-popover-trigger-width)' }}>
          <Command shouldFilter={false}>
            <CommandInput
              onValueChange={setQuery}
              placeholder={`Search ${label}...`}
              value={query}
            />
            <CommandList>
              {(() => {
                if (isLoading) {
                  return (
                    <CommandLoading>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </CommandLoading>
                  );
                }
                if (items.length === 0) {
                  return <CommandEmpty>No users found</CommandEmpty>;
                }
                return (
                  <>
                    <CommandGroup>
                      {items.map((user) => (
                        <CommandItem
                          className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                          key={user.id}
                          onSelect={handleSelect}
                          value={user.id}
                        >
                          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                            {value === user.id && <Check className="h-4 w-4" />}
                          </span>
                          <div className="flex items-center gap-2">
                            <Image
                              alt={user.name}
                              className="rounded-full"
                              height={24}
                              src={user.avatar}
                              unoptimized
                              width={24}
                            />
                            <div className="flex flex-col">
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    {hasNextPage && (
                      <div className="py-2 text-center" ref={loadingReference}>
                        {isFetchingNextPage ? (
                          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                        ) : (
                          <span className="text-xs text-muted-foreground">Scroll for more</span>
                        )}
                      </div>
                    )}
                  </>
                );
              })()}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
