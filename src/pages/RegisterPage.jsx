/* eslint-disable linebreak-style */
import React from 'react';
import { IoEarthOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    try {
      // Pastikan asyncRegisterUser mengembalikan true jika berhasil (cek file action-mu)
      const success = await dispatch(asyncRegisterUser({  name, email, password }));
      if (success) {
        navigate('/'); // Pindah ke halaman login setelah daftar
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <section className="min-h-screen grid lg:grid-cols-2">
      {/* Sisi Kiri: Form (Kebalikan dari LoginPage agar variasi) */}
      <div className="flex items-center justify-center p-8 bg-background order-2 lg:order-1">
        <div className="w-full max-w-md space-y-8">
          <header className="lg:hidden flex flex-col items-center mb-8">
            <IoEarthOutline className="text-6xl text-primary mb-2" />
            <h1 className="text-2xl font-bold">Open Space</h1>
          </header>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
            <p className="text-muted-foreground text-balance">
              Bergabunglah dengan komunitas kami dan mulai jelajahi dunia.
            </p>
          </div>

          <RegisterInput register={onRegister} />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Sisi Kanan: Hero/Visual (Hanya muncul di desktop) */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-zinc-900 text-white p-12 order-1 lg:order-2">
        <div className="relative">
          <IoEarthOutline className="text-9xl mb-6 text-primary animate-pulse" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full blur-xl animate-bounce"></div>
        </div>
        <h2 className="text-4xl font-bold text-center leading-tight">
          Your Journey<br />
          Starts <strong>Here.</strong>
        </h2>
        <p className="mt-4 text-zinc-400 text-center max-w-xs">
          Daftar sekarang untuk mendapatkan akses penuh ke Open Space.
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;