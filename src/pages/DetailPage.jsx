/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveThreadDetail, asyncCreateComment } from '../states/threadDetail/action'; // Gunakan action creator yang baru
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { IoTimeOutline, IoArrowBackOutline } from 'react-icons/io5';

function DetailPage() {
  const { id } = useParams();
  const [commentText, setCommentText] = useState('');

  const threadDetail = useSelector((state) => state.threadDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onCommentSubmit = (e) => {
    e.preventDefault();
    // Menggunakan action create comment sesuai spesifikasi API baru
    dispatch(asyncCreateComment({ threadId: id, content: commentText }));
    setCommentText('');
  };

  if (!threadDetail) return null;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Tombol Kembali */}
      <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <IoArrowBackOutline /> Kembali ke Beranda
      </Link>

      {/* Konten Utama Thread */}
      <Card className="mb-6 border-none shadow-none bg-transparent">
        <CardHeader className="px-0 flex-row gap-4 items-center">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={threadDetail.owner?.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {threadDetail.owner?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold leading-tight">{threadDetail.title}</h2>
            <div className="flex items-center text-xs text-muted-foreground gap-2 mt-1">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{threadDetail.owner?.name}</span>
              <span>•</span>
              <IoTimeOutline />
              <span>{new Date(threadDetail.createdAt).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 pt-2">
          <p className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap mb-4">
            {threadDetail.body}
          </p>
          {threadDetail.category && (
            <span className="text-xs font-medium px-3 py-1 bg-secondary rounded-full">
              #{threadDetail.category}
            </span>
          )}
        </CardContent>
      </Card>

      {/* Form Input Komentar Baru */}
      <div className="mb-10 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-inner">
        <form onSubmit={onCommentSubmit} className="space-y-3">
          <Textarea
            placeholder="Tulis komentar kamu..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-25 bg-background border-none focus-visible:ring-1 resize-none"
            required
          />
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={!commentText.trim()} className="rounded-full px-8 shadow-sm">
              Kirim Komentar
            </Button>
          </div>
        </form>
      </div>

      <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
        Komentar <span className="text-sm font-normal text-muted-foreground">({threadDetail.comments?.length || 0})</span>
      </h3>

      {/* Daftar Komentar */}
      <div className="space-y-4">
        {threadDetail.comments?.length > 0 ? (
          threadDetail.comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
              <Avatar className="h-9 w-9 mt-1 border">
                <AvatarImage src={comment.owner?.avatar} />
                <AvatarFallback className="bg-zinc-100 text-xs text-zinc-500">
                  {comment.owner?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold">{comment.owner?.name}</span>
                  <span className="text-[10px] text-muted-foreground italic">
                    {new Date(comment.createdAt).toLocaleTimeString('id-ID')}
                  </span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-2xl border-zinc-100 dark:border-zinc-900">
            <p className="text-sm text-muted-foreground italic">Belum ada komentar.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPage;