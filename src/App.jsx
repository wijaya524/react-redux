import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import Navigation from './components/Navigation';
import Loading from './components/Loading';
import DetailPage from './pages/DetailPage';

function App() {
  // 1. Ambil data dari Redux Store
  const {
    authUser = null,
    isPreload = true, // Default true agar tidak "flash" login page saat refresh
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  // 2. Jalankan preload saat aplikasi pertama kali dimuat
  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());

  };

  // 3. Jika sedang loading preload, jangan tampilkan apa-apa (atau loading spinner)
  if (isPreload) {
    return null;
  }

  // 4. Jika BELUM login, hanya bisa akses Login & Register
  if (authUser === null) {
    return (
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    );
  }

  // 5. Jika SUDAH login, tampilkan halaman utama
  return (
    <div className="app-container">
      <Navigation authUser={authUser} onSignOut={onSignOut} />
      <Loading />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/thread/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;