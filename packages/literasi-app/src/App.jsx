import { useEffect, useState } from 'react';
import { authClient } from './api/authClient';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  // Real authentication session
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // Simulated minimal splash duration before fade out
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      
      // After fade out transition (1s), show login screen
      setTimeout(() => { 
        setShowLogin(true);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
  };

  if (session?.user) {
    return <Dashboard onLogout={handleLogout} user={session.user} />;
  }

  if (showLogin || !isPending) {
    return <Login onLogin={() => {}} />; // Login will be handled internally by Login.jsx
  }

  return (
    <>
      {/* Atmospheric Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-on-primary-container/5 rounded-full blur-[100px]"></div>
      </div>
      
      <main className={`relative z-10 flex flex-col items-center justify-center text-center px-margin-mobile animate-fade-in ${isTransitioning ? 'transition-all duration-1000 opacity-0 scale-105' : ''}`}>
        
        {/* Logo Container */}
        <div className="relative mb-8 group animate-fade-in-up">
          {/* Subtle Glow behind logo */}
          <div className="absolute inset-0 bg-primary-container blur-2xl rounded-full opacity-50 scale-125"></div>
          <div className="relative bg-primary-container/40 p-6 rounded-full border border-white/5 backdrop-blur-sm shadow-2xl">
            <img 
              alt="Sukabumi Berliterasi Logo" 
              className="h-32 w-auto object-contain drop-shadow-2xl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkC-TxELDMLyt9E2gUSklrgvduB8HXVRSoxhHdPGrr1XLf2wC7sHcaf3kdTWuhjStj4CdESNP65y-a4tA5wZ4Wef7EQOWk91_1Kc7lJ982VLPhxmVpxao_FalSv-iXpVUrie_tVjMDSpCG-J_CZgQVZjaPdqDkellcp_pCB3XAxIlpvp2_9PgVX-1NnPu9xmt0jzfDiVKG9fU7hqHy3foCMb6moZYJGAcFmop6kY_yTm5p5tx7_XGVlnfT5i4x1lw5kJYNXcK92EPf"
            />
          </div>
        </div>

        {/* Brand Text Section */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="font-headline text-3xl font-bold text-white tracking-tight">
            Sukabumi Berliterasi
          </h1>
          <p className="font-body text-base text-on-primary-container/80 max-w-xs mx-auto font-light italic">
            Jendela ilmu untuk warga Sukabumi
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="absolute bottom-16 left-0 w-full flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-secondary-container/60 to-transparent animate-shimmer"></div>
          </div>
          <p className="mt-4 font-body text-[10px] text-on-primary-container/40 uppercase tracking-[0.25em]">
            Menyiapkan Konten
          </p>
        </div>
      </main>
    </>
  );
}

export default App;
