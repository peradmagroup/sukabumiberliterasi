import React, { useState } from 'react';
import { useDonasiStats, useDropoffLocations, useSubmitJemputDonasi } from './hooks/useApi';

export default function Donasi() {
  const [activeTab, setActiveTab] = useState('dropoff'); // 'dropoff' or 'jemput'
  
  const { data: stats } = useDonasiStats();
  const { data: dropoffLocations = [] } = useDropoffLocations();
  const submitJemput = useSubmitJemputDonasi();
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleJemputSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    const formData = new FormData(e.target);
    const payload = {
      name: formData.get('name'),
      whatsapp: formData.get('whatsapp'),
      bookCount: parseInt(formData.get('bookCount'), 10),
      address: formData.get('address')
    };

    try {
      await submitJemput.mutateAsync(payload);
      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus('idle');
        e.target.reset();
      }, 3000);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <>
      <div className="space-y-lg">
        {/* Donation Guide & Criteria (Bento Style) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Left: Criteria */}
          <div className="md:col-span-2 bg-white p-lg rounded-xl border border-outline-variant/30 soft-card-shadow space-y-md transition-transform duration-200 ease-out hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary-container/10 rounded-lg text-secondary">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Kriteria Buku Layak Donasi</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="flex gap-sm">
                <span className="material-symbols-outlined text-tertiary-container/60">auto_stories</span>
                <div>
                  <p className="font-bold text-primary">Kondisi Utuh</p>
                  <p className="text-body-sm text-on-surface-variant">Halaman lengkap, tidak sobek parah, dan tidak terkena air/jamur.</p>
                </div>
              </div>
              <div className="flex gap-sm">
                <span className="material-symbols-outlined text-tertiary-container/60">category</span>
                <div>
                  <p className="font-bold text-primary">Semua Kategori</p>
                  <p className="text-body-sm text-on-surface-variant">Fiksi, non-fiksi, komik, atau majalah sains.</p>
                </div>
              </div>
              <div className="flex gap-sm">
                <span className="material-symbols-outlined text-tertiary-container/60">update</span>
                <div>
                  <p className="font-bold text-primary">Relevansi</p>
                  <p className="text-body-sm text-on-surface-variant">Buku pengetahuan populer sebaiknya tidak lebih dari 5 tahun terakhir.</p>
                </div>
              </div>
              <div className="flex gap-sm">
                <span className="material-symbols-outlined text-tertiary-container/60">no_accounts</span>
                <div>
                  <p className="font-bold text-primary">Non-SARA</p>
                  <p className="text-body-sm text-on-surface-variant">Tidak mengandung konten pornografi, SARA, atau radikalisme.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Guide / Call to Action */}
          <div className="bg-primary-container p-lg rounded-xl flex flex-col justify-between text-white border border-outline/10">
            <div className="space-y-sm">
              <h3 className="font-headline-sm text-headline-sm text-secondary-container">Butuh Bantuan?</h3>
              <p className="text-body-sm text-on-primary-container">Tim kami siap memandu proses donasi atau menjawab pertanyaan Anda seputar titik drop-off.</p>
            </div>
            <a 
              className="mt-lg flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-fixed py-3 px-md rounded-lg font-bold transition-all hover:brightness-110 active:scale-95" 
              href="https://wa.me/6281385586238"
            >
              <span className="material-symbols-outlined">chat</span>
              Hubungi Admin (Ayuna)
            </a>
          </div>
        </section>

        {/* Tabs for Interaction: Drop-off vs Jemput */}
        <section className="space-y-md">
          <div className="flex p-1 bg-surface-container-low rounded-xl w-full max-w-md mx-auto">
            <button 
              className={`flex-1 py-2 text-center rounded-lg font-bold transition-all duration-300 ${activeTab === 'dropoff' ? 'bg-white text-secondary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
              onClick={() => setActiveTab('dropoff')}
            >
              Drop-off
            </button>
            <button 
              className={`flex-1 py-2 text-center rounded-lg font-bold transition-all duration-300 ${activeTab === 'jemput' ? 'bg-white text-secondary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
              onClick={() => setActiveTab('jemput')}
            >
              Jemput Donasi
            </button>
          </div>

          {/* Drop-off Points Content */}
          {activeTab === 'dropoff' && (
            <div className="space-y-md">
              <h3 className="font-headline-sm text-headline-sm text-primary text-center">Titik Drop-off Terdekat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                
                {dropoffLocations.map((loc) => (
                  <div key={loc.id} className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 soft-card-shadow transition-transform duration-200 ease-out hover:-translate-y-0.5">
                    <div className="h-32 bg-surface-container">
                      <img className="w-full h-full object-cover" alt={loc.name} src={loc.imageUrl || "https://placehold.co/600x400?text=Location"} />
                    </div>
                    <div className="p-md space-y-sm">
                      <p className="font-bold text-primary">{loc.name}</p>
                      <p className="text-body-sm text-on-surface-variant flex gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span>{loc.address}</p>
                      <p className="text-label-md text-secondary bg-secondary-container/10 inline-block px-2 py-0.5 rounded">{loc.operatingHours}</p>
                    </div>
                  </div>
                ))}
                
                {dropoffLocations.length === 0 && (
                  <>
                    {/* Fallback Location Card 1 */}
                    <div className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 soft-card-shadow transition-transform duration-200 ease-out hover:-translate-y-0.5">
                      <div className="h-32 bg-surface-container">
                        <img className="w-full h-full object-cover" alt="Sukabumi Shopping Center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_LVEGwOURkmW_R5ZNXHLPVvYUApg_0B3ar_DPaWpkmQorjFZygSu9FFKbsvWuhU2sWNZB0DhprJ7RRU9621Cg0k3hjaQ609BjKuwkBQxz7MPqINeSpzVmE8i7iT_x6n3UgrjiGspzuvdkspZKcbuHHX6XxnZS1qvUoWo_FUVljo45FOHjiU4ZqSrIlfkZ97Yw3ggMUtdHguEK5fye5U6JZ15_Ad3RfebNg5rn5_JCwRD_gQwYnOABUZi-hkWLM7-bAMF9K153fj8V" />
                      </div>
                      <div className="p-md space-y-sm">
                        <p className="font-bold text-primary">Depan Sukabumi Shopping&nbsp;</p>
                        <p className="text-body-sm text-on-surface-variant flex gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span>JL. A. Yani depan Sukabumi Shopping Center</p>
                        <p className="text-label-md text-secondary bg-secondary-container/10 inline-block px-2 py-0.5 rounded">Setiap Hari Minggu 06:00 - 09:00 WIB</p>
                      </div>
                    </div>
                    
                    {/* Fallback Location Card 2 */}
                    <div className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 soft-card-shadow transition-transform duration-200 ease-out hover:-translate-y-0.5">
                      <div className="h-32 bg-surface-container">
                        <img className="w-full h-full object-cover" alt="Perpustakaan Cisarua" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEAZGlowgwl-kkJUrjENu1kuTsojT9gZSRH4xN22l1hvkSL48Sh6mYBc1FB0mLu-tT-30qLzWg4HpJ3CE9-kNh0v65mewuK34Ph0nq2X_uO5BuYsFyGBQ3aZ0QqdJRrQnU59VoCwN_W5OClvseednOZdev8r-4lHqUhluHM8-G1B0Oo0zuos6mmodop31deAbbhNCL5DP8-254aiWx8LyYpg7BP1bEW2HMkqx7ODDAIxpfPTN6xKk2Exp7gefN45dfBlACvKB0ITUX" />
                      </div>
                      <div className="p-md space-y-sm">
                        <p className="font-bold text-primary">Perpustakaan Cisarua</p>
                        <p className="text-body-sm text-on-surface-variant flex gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Jl. Samsi Belakang kantor Kelurahan Cisarua</p>
                        <p className="text-label-md text-secondary bg-secondary-container/10 inline-block px-2 py-0.5 rounded">Senin-Jumat Pukul 08:00 - 16:00 WIB</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Location Card 3 */}
                <div className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 soft-card-shadow transition-transform duration-200 ease-out hover:-translate-y-0.5 flex flex-col justify-center items-center h-full min-h-[200px]">
                   <span className="material-symbols-outlined text-outline/50 text-4xl mb-2">add_location</span>
                   <p className="text-on-surface-variant font-body-md text-body-md">Lebih banyak titik segera hadir</p>
                </div>
              </div>
            </div>
          )}

          {/* Jemput Donasi Form Content */}
          {activeTab === 'jemput' && (
            <div className="max-w-2xl mx-auto bg-white p-lg rounded-xl border border-outline-variant/30 soft-card-shadow space-y-md text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl">local_shipping</span>
              </div>
              <div className="space-y-xs">
                <h3 className="font-headline-sm text-headline-sm text-primary">Formulir Jemput Donasi</h3>
                <p className="text-body-sm text-on-surface-variant max-w-md mx-auto">
                  Layanan jemput tersedia untuk donasi minimal 10 buku di area Kota Sukabumi. Silakan isi form penjemputan berikut, dan relawan kami akan menghubungi Anda.
                </p>
              </div>
              
              <a 
                href={"https://forms.gle/oY2Z3ZQAN9nXJ7LM7"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full max-w-sm py-4 font-bold rounded-lg shadow-lg transition-all active:scale-[0.98] bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">open_in_new</span>
                Isi Google Form Penjemputan
              </a>
            </div>
          )}
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-md pt-lg">
          <div className="text-center space-y-xs p-md bg-white rounded-xl soft-card-shadow border border-outline-variant/20 transition-transform duration-200 ease-out hover:-translate-y-0.5">
            <p className="font-headline-sm text-headline-sm text-secondary">{stats?.booksCollected || '0'}+</p>
            <p className="text-label-md text-on-surface-variant">Buku Terkumpul</p>
          </div>
          <div className="text-center space-y-xs p-md bg-white rounded-xl soft-card-shadow border border-outline-variant/20 transition-transform duration-200 ease-out hover:-translate-y-0.5">
            <p className="font-headline-sm text-headline-sm text-secondary">{stats?.tbmCount || '15'}</p>
            <p className="text-label-md text-on-surface-variant">Taman Baca</p>
          </div>
          <div className="text-center space-y-xs p-md bg-white rounded-xl soft-card-shadow border border-outline-variant/20 transition-transform duration-200 ease-out hover:-translate-y-0.5">
            <p className="font-headline-sm text-headline-sm text-secondary">{stats?.activeDonors || '0'}</p>
            <p className="text-label-md text-on-surface-variant">Donatur Aktif</p>
          </div>
          <div className="text-center space-y-xs p-md bg-white rounded-xl soft-card-shadow border border-outline-variant/20 transition-transform duration-200 ease-out hover:-translate-y-0.5">
            <p className="font-headline-sm text-headline-sm text-secondary">{stats?.libraryCount || '33'}</p>
            <p className="text-label-md text-on-surface-variant">Perpustakaan</p>
          </div>
        </section>
      </div>
    </>
  );
}
