import React from 'react';

export default function Konsul() {
  const googleFormLink = "https://forms.gle/uBuZdabLqTPY2n458";
  const waNumber = import.meta.env.VITE_ADMIN_WA || "6281234567890";
  
  return (
    <>
      {/* Hero Section & Disclaimer */}
      <section className="mb-lg">
        <div className="relative overflow-hidden rounded-xl bg-primary-container p-lg text-on-primary-container mb-sm">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-sm relative z-10">Konsultasi &amp; Aduan Publik</h2>
          <p className="font-body-md text-body-md text-on-primary-container/80 relative z-10">Sampaikan keluhan resmi atau konsultasi langsung dengan tim kami.</p>
        </div>
        <div className="flex items-start gap-sm bg-surface-container-low p-md rounded-lg border border-outline-variant/30">
          <span className="material-symbols-outlined text-secondary shrink-0">info</span>
          <p className="font-label-md text-label-md text-on-surface-variant">
            Layanan ini merupakan inisiatif Pegiat Literasi independen Kota Sukabumi, namun berkolaborasi dengan berbagai pihak untuk menyalurkan inspirasi warga.
          </p>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-stretch">
        
        {/* Google Form Section */}
        <section className="bg-white rounded-xl p-lg border border-outline-variant/50 soft-card-shadow flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Formulir Aduan Resmi</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Sampaikan keluhan, masukan, atau laporan terkait fasilitas dan program literasi di Sukabumi secara terstruktur. Laporan Anda akan didata dan ditindaklanjuti secara resmi.
            </p>
          </div>
          
          <a 
            href={googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full font-headline-sm py-4 rounded-lg flex justify-center items-center gap-2 bg-primary text-on-primary hover:bg-primary/90 transition-all active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined">open_in_new</span>
            Isi Google Form Aduan
          </a>
        </section>

        {/* Live Chat Section */}
        <section className="bg-white rounded-xl p-lg border border-outline-variant/50 soft-card-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <span className="material-symbols-outlined text-[200px]">support_agent</span>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-3xl">forum</span>
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-ping border-2 border-white"></span>
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-1">Live Konsultasi</h3>
                <span className="font-label-sm text-label-sm bg-green-100 text-green-700 px-2 py-1 rounded">Admin Online</span>
              </div>
            </div>
            
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Butuh bantuan cepat atau sekadar ingin berkonsultasi seputar program? Chat langsung dengan relawan kami sekarang juga via WhatsApp.
            </p>
            
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 mb-6 text-body-sm text-on-surface-variant italic">
              "Layanan kami tersedia 24/7 secara sistem, namun respon tim dilakukan pada jam kerja (08:00 - 17:00)."
            </div>
          </div>

          <a 
            href={`https://wa.me/${waNumber}?text=Halo%20Admin%20Literasi,%20saya%20ingin%20berkonsultasi.`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 w-full font-headline-sm py-4 rounded-lg flex justify-center items-center gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined">chat</span>
            Chat via WhatsApp
          </a>
        </section>

      </div>
    </>
  );
}
