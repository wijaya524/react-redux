/* eslint-disable linebreak-style */
import React from 'react';
import { IoEarthOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';

function Navigation({ authUser, onSignOut }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Perbaikan: Ganti <di menjadi <div */}
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-sm">
            <IoEarthOutline size={24} />
          </div>
          <span className="hidden sm:inline-block text-zinc-900 dark:text-zinc-100">
                        Hello World
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Menampilkan nama user jika ada */}
          {authUser && (
            <div className="hidden md:flex flex-col items-end mr-2">
              <p className="text-sm font-medium leading-none">{authUser.name}</p>
              <p className="text-xs text-muted-foreground">@{authUser.id}</p>
            </div>
          )}


          <Button
            onClick={onSignOut}
          >
                        Sign Out
          </Button>
        </div>

      </div>
    </header>
  );
}

export default Navigation;