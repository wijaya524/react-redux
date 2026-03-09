/* eslint-disable linebreak-style */
import React from 'react';
import { Button } from './ui/button';
import {  IoChatbubbleOutline } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';

function ThreadItem({ thread }) {

  if (!thread) return null;

  return (
    <div className="mt-4">
      <div className="p-5 border bg-card shadow-sm transition-all rounded-xl hover:shadow-md border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Avatar className="h-9 w-9 border">
              <AvatarImage src={thread.user?.avatar} />
              <AvatarFallback>
                {thread.user?.name ? thread.user.name.charAt(0) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none">
                {thread.user?.name || 'User'}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1">
                {new Date(thread.createdAt).toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {thread.category && (
              <span className="text-[10px] bg-secondary px-2 py-1 rounded-full font-medium">
                                #{thread.category}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Link to={`/thread/${thread.id}`} className="group">
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
              {thread.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
              {thread.body}
            </p>
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
          <Link to={`/thread/${thread.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-[11px] gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full"
            >
              <IoChatbubbleOutline size={15} />
              {thread.totalComments || 0} Komentar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThreadItem;