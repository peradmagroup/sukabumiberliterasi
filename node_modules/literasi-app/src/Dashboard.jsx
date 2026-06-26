import React, { useState } from 'react';
import Info from './Info';
import Agenda from './Agenda';
import Mitra from './Mitra';
import Konsul from './Konsul';
import Donasi from './Donasi';

export default function Dashboard({ onLogout }) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [activeTab, setActiveTab] = useState('Info');

  const tabs = [
    { id: 'Info', icon: 'info', label: 'Info' },
    { id: 'Agenda', icon: 'event_note', label: 'Agenda' },
    { id: 'Mitra', icon: 'handshake', label: 'Mitra' },
    { id: 'Konsul', icon: 'chat', label: 'Konsul' },
    { id: 'Donasi', icon: 'volunteer_activism', label: 'Donasi' },
  ];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 w-full overflow-x-hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10">
              <img 
                className="w-full h-full object-cover" 
                alt="Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUCTeQRqdoJFy087KCFD2LOawwMp-gV_s4tdIF1JbJNJ-89PZBbK4j3l0WJU0ocC4plU8Ave0QDvTAtaURFHPG7v3IXSFd4agFg5t4nZJ2QlW-8bnMwKERL2mjShCCeS_vz6N-rstK6wpsbj_700x63Y42Tz78UAAShsQfmcQr1Xg-5XT9h47JXG43mWckq6xz31z-xpE6VQ9rNjl_Hwhl0eV0Ll5bFPgupPTO88cJ8SEZYz-W_3DWLhiyAgWc6kKsQp8Ve_flvW4p9Us"
              />
            </div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">Sukabumi Berliterasi</h1>
          </div>
          <button 
            onClick={onLogout}
            className="transition-all duration-250 ease-out active:scale-95 text-primary p-2 hover:bg-surface-container-low rounded-full"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      <main className="pt-20 px-margin-mobile max-w-7xl mx-auto">
        {activeTab === 'Info' && (
          <Info activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        )}
        
        {activeTab === 'Agenda' && (
          <Agenda />
        )}

        {activeTab === 'Mitra' && (
          <Mitra />
        )}

        {activeTab === 'Konsul' && (
          <Konsul />
        )}

        {activeTab === 'Donasi' && (
          <Donasi />
        )}
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-2 py-3 pb-safe bg-surface/90 backdrop-blur-md border-t border-outline-variant/30 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] z-50 rounded-t-xl">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-transform duration-200 ease-in-out active:scale-90 ${
              activeTab === tab.id 
                ? "text-secondary font-bold relative after:content-[''] after:w-1 after:h-1 after:bg-secondary-container after:rounded-full after:mt-1" 
                : "text-on-surface-variant hover:text-secondary/80"
            }`}
          >
            <span className="material-symbols-outlined" style={activeTab === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {tab.icon}
            </span>
            <span className="font-label-md text-label-md">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
