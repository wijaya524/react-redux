/* eslint-disable linebreak-style */
import React from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

function ThreadInput() {
  const [title, onTitleChange, setTitle] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [body, onBodyChange, setBody] = useInput('');

  const dispatch = useDispatch();

  const onCreateThread = (e) => {
    e.preventDefault();
    // Payload baru: title, body, category
    dispatch(asyncAddThread({ title, body, category }));

    // Reset semua input
    setTitle('');
    setCategory('');
    setBody('');
  };

  return (
    <Card className="mb-8 border-primary/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold">
          Buat Diskusi Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onCreateThread} className="space-y-3">
          <Input
            placeholder="Judul Diskusi"
            value={title}
            onChange={onTitleChange}
            required
            className="bg-zinc-50 dark:bg-zinc-900 border-none shadow-inner"
          />
          <Input
            placeholder="Kategori (contoh: #react)"
            value={category}
            onChange={onCategoryChange}
            className="bg-zinc-50 dark:bg-zinc-900 border-none shadow-inner text-sm"
          />
          <Textarea
            placeholder="Apa yang ingin kamu bahas?"
            value={body}
            onChange={onBodyChange}
            required
            className="min-h-30 resize-none focus-visible:ring-1 border-none bg-zinc-50 dark:bg-zinc-900 shadow-inner"
          />
          <div className="flex justify-end border-t pt-3">
            <Button
              type="submit"
              disabled={!title.trim() || !body.trim()}
              className="rounded-full px-8 font-semibold"
            >
              Posting
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ThreadInput;