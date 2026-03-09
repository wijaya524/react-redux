/* eslint-disable linebreak-style */
import React from 'react';
import { IoEarthOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="min-h-screen grid lg:grid-cols-2">
      {/* Sisi Kiri: Hero (Hanya muncul di desktop) */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-zinc-900 text-white p-12">
        <IoEarthOutline className="text-8xl mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-center leading-tight">
          See <strong>The World</strong>,<br />
          Through Open Space.
        </h2>
      </div>

      {/* Sisi Kanan: Form Login */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <header className="lg:hidden flex flex-col items-center mb-8">
            <IoEarthOutline className="text-6xl text-primary mb-2" />
            <h1 className="text-2xl font-bold">Open Space</h1>
          </header>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Login</h2>
            <p className="text-muted-foreground">Masuk untuk menjelajahi dunia.</p>
          </div>

          <LoginInput login={onLogin} />

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;