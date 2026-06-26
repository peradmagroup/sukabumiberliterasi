import React from 'react';
import { useMitra } from './hooks/useApi';

export default function Mitra() {
  const { data: partners = [], isLoading } = useMitra();
  
  const mitraUtama = partners.find(p => p.type === 'Mitra Utama') || partners[0];
  const otherPartners = partners.filter(p => p.id !== mitraUtama?.id).slice(0, 6);

  // Count stats
  const tbmCount = partners.filter(p => p.type === 'TBM').length;
  const komunitasCount = partners.filter(p => p.type === 'Komunitas').length;

  return (
    <>
      {/* Welcome Section */}
      <section className="mb-lg">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-2">Mitra Literasi</h2>
        <p className="text-on-surface-variant max-w-2xl font-body-md text-body-md">Berkolaborasi dengan perpustakaan, taman baca, dan komunitas untuk membangun ekosistem intelektual Sukabumi yang berkelanjutan.</p>
      </section>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : (
        <>
          {/* Partner Categories (Bento-like layout) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-xl">
            {/* Main Featured Partner */}
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl glass-card shadow-sm transition-all hover:shadow-lg">
              <div className="h-64 md:h-80 w-full relative">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt={mitraUtama?.name || "Perpustakaan Daerah Kota Sukabumi"} 
                  src={mitraUtama?.logoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDF6hYTqTI0O36pqo0gD4gee0hWFiToRKzl-XYNo1TTlbFSaGIzgggHgfEnoxnV1E66xbtyJzQ2_9yos6viyKIb8Llh8_jVAoOPAEL-cQjo_Pdnl_Autj9P2Z5w-OS0EX28ACHTdfZaW28LFZDptyo3wBRcTPU786cM4blQ9RsXTM6GCi745UbXcCtAfRrhYHHLE_0SAPJs6Gal2qthRUKXdx4PzJPBK7qeNcuN3gvL62Cnwc486AZtMIEg5j67FZdh3GRptOw8fBJQ"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-lg text-white">
                  <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-fixed text-label-md font-bold rounded-full mb-2 uppercase tracking-wider">{mitraUtama?.type || 'Mitra Utama'}</span>
                  <h3 className="font-headline-md text-headline-md mb-1">{mitraUtama?.name || 'Perpustakaan Daerah Kota Sukabumi'}</h3>
                  <p className="text-white/80 font-body-sm text-body-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span> {mitraUtama?.address || 'Jl. Perpustakaan No. 1, Sukabumi'}
                  </p>
                </div>
              </div>
            </div>

            {/* Side Categories */}
            <div className="md:col-span-4 flex flex-col gap-gutter">
              <div className="flex-1 p-md glass-card rounded-xl shadow-sm hover:border-secondary transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-3xl">auto_stories</span>
                  </div>
                  <span className="text-label-md font-bold text-secondary">{tbmCount > 0 ? `${tbmCount} TBM` : '15+ TBM'}</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Taman Baca Masyarakat</h4>
                <p className="text-on-surface-variant font-body-sm text-body-sm leading-relaxed">Unit literasi mandiri yang tersebar di berbagai kelurahan di Sukabumi.</p>
              </div>
              
              <div className="flex-1 p-md glass-card rounded-xl shadow-sm hover:border-secondary transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-3xl">group</span>
                  </div>
                  <span className="text-label-md font-bold text-secondary">{komunitasCount > 0 ? `${komunitasCount} Komunitas` : '8 Komunitas'}</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Komunitas Literasi</h4>
                <p className="text-on-surface-variant font-body-sm text-body-sm leading-relaxed">Kelompok diskusi dan penggerak minat baca dari kalangan pelajar & mahasiswa.</p>
              </div>
            </div>
          </div>

          {/* Peta Digital Section */}
          <section className="mb-xl">
            <div className="flex items-center justify-between mb-md">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary">Peta Digital Literasi</h2>
                <p className="text-on-surface-variant font-body-sm text-body-sm">Cari lokasi mitra terdekat dari posisi Anda.</p>
              </div>
              <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-[18px]">near_me</span> Cari Lokasi
              </button>
            </div>
            
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-surface-container">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCn8gsmcJPkSkG5xI0l5xgf3ih3NZL88tARSQxwX288-k9cGE0deb3IF3N8qvochi_a4ZCins4HWqv1tK1A7L-3kZW8Hdk_ui3tySfR3ccQ0LbbtherlVkR0l_Dki9X9pWJXfzfuCSSmH3Y1VWizgD-_qYtoK2TDwTyY7L0Z0ooIn6OIg9_GcTU41iACxigHN2P2w5mpwt1XBRIISm73YUvTDekc8aagEoDW1ItF3glKhEiYjPMAnwO1_pnEk1Yo-DoGwxUDZBoz2eG')" }}></div>
                
                {/* UI Overlays for Map */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <button className="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                </div>
                
                {/* Marker Example */}
                {partners.map(partner => (
                  <div key={partner.id} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group" style={{ marginLeft: `${(Math.random() - 0.5) * 100}px`, marginTop: `${(Math.random() - 0.5) * 100}px` }}>
                    <div className="flex flex-col items-center">
                      <div className="bg-white px-3 py-1 rounded-full shadow-lg text-label-md font-bold text-primary mb-1 border border-secondary transition-transform group-hover:scale-105 whitespace-nowrap">{partner.name}</div>
                      <div className="w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-md ring-4 ring-secondary/20"></div>
                    </div>
                  </div>
                ))}
                {partners.length === 0 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group">
                    <div className="flex flex-col items-center">
                      <div className="bg-white px-3 py-1 rounded-full shadow-lg text-label-md font-bold text-primary mb-1 border border-secondary transition-transform group-hover:scale-105">Perpusda Sukabumi</div>
                      <div className="w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-md ring-4 ring-secondary/20"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Partner List Feed */}
          <section>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-md">Daftar Mitra Terpopuler</h3>
            
            {otherPartners.length === 0 ? (
              <p className="text-on-surface-variant italic">Belum ada mitra literasi lainnya.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {otherPartners.map(partner => (
                  <div key={partner.id} className="glass-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                    <div className="h-40 w-full relative shrink-0">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]" alt={partner.name} src={partner.logoUrl || "https://placehold.co/600x400?text=Mitra"}/>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur rounded-md text-[10px] font-bold uppercase tracking-widest text-secondary shadow-sm">{partner.type}</div>
                    </div>
                    <div className="p-md flex-1 flex flex-col">
                      <h4 className="font-headline-sm text-headline-sm text-primary mb-1">{partner.name}</h4>
                      <p className="text-on-surface-variant font-body-sm text-body-sm line-clamp-2 mb-3 flex-1">{partner.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="flex items-center gap-1 text-label-md text-secondary">
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8
                        </span>
                        <button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline">
                          Detail <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
