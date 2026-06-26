import React, { useState, useEffect } from 'react';
import { authClient } from './api/authClient';

export default function Login({ onLogin }) {
  const [showContent, setShowContent] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    // Smooth appear effect
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFocus = (e) => {
    e.target.parentElement.classList.add('scale-[1.01]');
  };

  const handleBlur = (e) => {
    e.target.parentElement.classList.remove('scale-[1.01]');
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex items-center justify-center relative overflow-hidden w-full">
      {/* Background Illustration Overlay */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlmbLEpiUc5QRmaiCEgdN4buYXHtXznGc1yDcjnB96zn49mi-1hX_GjkhMAGnkIG-9bNNyViuWR_5u27qJ9ebEZ_ojag8raRcLOrtES-wVMe-CR4bI8WIJnHb4248fjYsBkFZQBUyqEA65FqnBKz3VFL6-ITg1-kNPpFA7GGlJHPVYo65elBWFA8qDLIbzFFcbCz0z1fMO0qrcXe-029ivz_vYcS8jxax9oMmYbk52PQ-nLM5uH3kG0a_owVQtwYKg0PmzxRIPnc2K')" }}
        ></div>
      </div>
      
      {/* Decorative Gradient Blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-surface-container rounded-full blur-[120px] z-0 opacity-50"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary-container/20 rounded-full blur-[120px] z-0 opacity-40"></div>
      
      {/* Main Content Container */}
      <main 
        className={`relative z-10 w-full max-w-md px-margin-mobile transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}
      >
        {/* Brand Header */}
        <header className="flex flex-col items-center mb-xl">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-sm shadow-lg animate-float">
            <img alt="Literasi Sukabumi Logo" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOmumhVU5QdbtwASGAkpFc10JSrvGkn8el6zQFG-F8pmihRnTHaBM6dVbHirsJk3Cu17xJbklhyWCVCLjch7jE0_z5b0iCtTgi8-KrZB9xLXKjtJtG8c54P1OZCoMAPt7TtdR-Vda_pstz8lzlROvU8JLUnRKcWA3Gra_ufUVmS3QjD6ggRtcLa7qJJENhID9ctuomXyGpX5JgiWhHTuKnipu3Zj1eGnon64osi9My_54U_HJXntTtxp41-ekaPvsG7ZcVOUBGfnSv" />
          </div>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Sukabumi Berliterasi</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Jendela ilmu untuk warga Sukabumi</p>
        </header>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-[12px] border border-outline-variant/30 rounded-xl p-lg shadow-sm">
          <div className="mb-lg text-center">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">{isRegister ? 'Daftar Akun Baru' : 'Selamat Datang'}</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{isRegister ? 'Lengkapi data Anda untuk mendaftar.' : 'Masuk untuk mengakses Informasi digital dan agenda literasi Anda.'}</p>
          </div>
          
          {!isRegister && (
            <>
              {/* Primary Login Action: Google */}
              <button 
                onClick={() => authClient.signIn.social({ provider: "google" })} 
                className="w-full flex items-center justify-center gap-sm bg-white border border-outline-variant hover:bg-surface-container-low transition-all duration-250 ease-out active:scale-95 py-md px-lg rounded-xl shadow-sm mb-lg group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-primary transition-colors">Masuk dengan Google</span>
              </button>
              
              {/* Divider */}
              <div className="flex items-center gap-sm mb-lg">
                <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
                <span className="font-label-md text-label-md text-outline">Atau gunakan email</span>
                <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
              </div>
            </>
          )}
          
          {/* Manual Form (Secondary) */}
          <form className="space-y-md" onSubmit={async (e) => { 
            e.preventDefault(); 
            const email = e.target.email.value;
            const password = e.target.password.value;
            if (isRegister) {
              const name = e.target.name.value;
              const { data, error } = await authClient.signUp.email({ email, password, name });
              if (error) {
                alert(error.message || "Gagal mendaftar.");
              } else {
                alert("Berhasil mendaftar! Silakan login.");
                setIsRegister(false);
              }
            } else {
              const { data, error } = await authClient.signIn.email({ email, password });
              if (error) {
                alert(error.message || "Gagal masuk, periksa email dan kata sandi Anda.");
              }
            }
          }}>
            {isRegister && (
              <div className="relative transition-transform duration-200">
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-md px-lg font-body-md focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200" 
                  id="name" 
                  placeholder="Nama Lengkap" 
                  type="text" 
                  required
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            )}
            <div className="relative transition-transform duration-200">
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-md px-lg font-body-md focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200" 
                id="email" 
                placeholder="Alamat Email" 
                type="email" 
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="relative transition-transform duration-200">
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-md px-lg font-body-md focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200" 
                id="password" 
                placeholder="Kata Sandi" 
                type="password" 
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            {!isRegister && (
              <div className="flex justify-end">
                <button type="button" className="font-label-md text-label-md text-secondary hover:text-secondary-fixed-dim transition-colors">Lupa Kata Sandi?</button>
              </div>
            )}
            <button type="submit" className="w-full bg-primary text-on-primary py-md rounded-xl font-label-md text-label-md shadow-lg hover:bg-primary-container transition-all active:scale-95">
              {isRegister ? 'Daftar Sekarang' : 'Masuk ke Akun'}
            </button>
          </form>
        </div>
        
        {/* Footer Actions */}
        <footer className="mt-lg text-center space-y-md">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
            <button 
              className="text-secondary font-bold hover:underline bg-transparent border-none p-0 cursor-pointer" 
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Masuk di sini' : 'Daftar Sekarang'}
            </button>
          </p>
          <div className="flex justify-center gap-lg pt-md">
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Bantuan</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Kebijakan Privasi</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Syarat &amp; Ketentuan</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

