/* eslint-disable linebreak-style */
import ThreadItem from '@/components/ThreadItem';
import ThreadInput from '@/components/ThreadInput';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncPopulateThreads } from '@/states/threads/action';

function HomePage() {
  const threads = useSelector((state) => state.threads || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreads());
  }, [dispatch]);

  // --- LOGIKA PENYUSUNAN THREADS ---
  // 1. Ambil semua thread utama (yang tidak punya replyTo)
  const mainThreads = threads.filter((t) => !t.replyTo);

  // 2. Ambil semua balasan
  const replies = threads.filter((t) => t.replyTo);

  // 3. Gabungkan: Untuk setiap thread utama, cari balasannya
  const orderedThreads = [];
  mainThreads.forEach((main) => {
    orderedThreads.push(main); // Masukkan induk
    const threadReplies = replies.filter((r) => r.replyTo === main.id);
    orderedThreads.push(...threadReplies); // Masukkan balasan tepat di bawahnya
  });

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <ThreadInput />

      <div className="space-y-1"> {/* Spasi rapat agar terlihat menyatu */}
        {orderedThreads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;