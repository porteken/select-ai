'use client';

import { AsyncSelect } from 'components/async-select';
import { SelectFilter } from 'components/select-filter';
import { fetchUsers, type User } from 'lib/mock-data';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

export default function Home() {
  const [selectedUser, setSelectedUser] = React.useState('');
  const [preloadUser, setPreloadUser] = React.useState('');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Async Select</h1>
          <p className="text-muted-foreground">Built with React & shadcn/ui</p>
        </div>

        {/* Async Select with infinite scroll */}
        <div className="w-full max-w-xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Async Select</h2>
            <p className="text-sm text-muted-foreground">
              Async select component with search functionality and infinite scroll
            </p>
            <AsyncSelect<User>
              fetcher={async (query) => {
                const result = await fetchUsers(query);
                return result.users;
              }}
              getDisplayValue={(user) => (
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
                    <div className="text-xs text-muted-foreground">{user.role}</div>
                  </div>
                </div>
              )}
              getOptionValue={(user) => user.id}
              label="User"
              loadingSkeleton={
                <div className="py-6 text-center">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                </div>
              }
              notFound={<div className="py-6 text-center text-sm">No users found</div>}
              onChange={setSelectedUser}
              placeholder="Search users..."
              renderOption={(user) => (
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
                    <div className="text-xs text-muted-foreground">{user.role}</div>
                  </div>
                </div>
              )}
              value={selectedUser}
              width="375px"
            />
          </div>

          {/* Select Filter Component */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Filter</h2>
            <p className="text-sm text-muted-foreground">
              Async select component with preloaded options and local filtering
            </p>
            <SelectFilter
              label="User"
              onChange={setPreloadUser}
              placeholder="Search users..."
              value={preloadUser}
              width="375px"
            />
          </div>
        </div>

        {/* Code link */}
        <div className="mt-8">
          <a
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            href="https://github.com/rudrodip/asyncr/tree/main/src/components/async-select.tsx"
            rel="noopener noreferrer"
            target="_blank"
          >
            View code
          </a>
        </div>
      </main>
    </div>
  );
}
