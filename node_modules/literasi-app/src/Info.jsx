import React from 'react';
import { useInfo } from './hooks/useApi';

export default function Info({ activeFilter, setActiveFilter }) {
  const filters = ['Semua', 'Berita', 'Tips', 'Rekomendasi', 'Event'];
  const { data: articles = [], isLoading, isError } = useInfo(activeFilter);

  const utamaArticle = articles.find(a => a.type === 'Utama');
  const terkiniArticles = articles.filter(a => a.type !== 'Utama' || !utamaArticle);

  return (
    <>
      {/* Search & Hero Section */}
      <section className="py-lg">
        <div className="relative mb-lg transition-transform duration-200 focus-within:scale-[1.01]">
          <input 
            className="w-full h-14 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface shadow-sm" 
            placeholder="Cari info literasi..." 
            type="text"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
        </div>
        
        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar no-scrollbar">
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
                activeFilter === filter 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        </div>
      ) : isError ? (
        <div className="py-20 text-center text-error">
          <p>Gagal memuat info literasi.</p>
        </div>
      ) : (
        <>
          {/* Featured News (Asymmetric Layout) */}
          {utamaArticle && (
            <section className="mb-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                <div className="md:col-span-12 group cursor-pointer">
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.02]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url('${utamaArticle.imageUrl}')` }}
                    ></div>
                      <a href={utamaArticle.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20"></a>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-lg relative z-10">
                        <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-md mb-3">UTAMA</span>
                        <h2 className="text-on-primary font-headline-sm text-headline-sm mb-2 group-hover:underline underline-offset-4">{utamaArticle.title}</h2>
                        <p className="text-on-primary/80 font-body-sm text-body-sm line-clamp-2">{utamaArticle.summary || utamaArticle.content}</p>
                      </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* News Feed (Bento-style Grid) */}
          <section className="pb-xl">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-lg flex items-center gap-2">
              <span className="material-symbols-outlined">newspaper</span>
              Info Literasi Terkini
            </h2>
            
            {terkiniArticles.length === 0 ? (
              <p className="text-center text-on-surface-variant py-10">Belum ada info terbaru.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                {terkiniArticles.map((article) => (
                  <article key={article.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-outline-variant/20 hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="h-48 relative shrink-0">
                      <img className="w-full h-full object-cover" alt={article.category} src={article.imageUrl || "https://placehold.co/600x400?text=No+Image"} />
                      <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase">{article.category}</div>
                    </div>
                    <div className="p-lg flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2 text-outline font-label-md text-label-md">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        {new Date(article.createdAt).toLocaleDateString('id-ID')}
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary mb-3 line-clamp-2 leading-tight">{article.title}</h3>
                      <p className="text-on-surface-variant font-body-sm text-body-sm line-clamp-3 mb-4 flex-1">{article.summary || article.content}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-secondary font-label-md text-label-md">Penulis: {article.authorId}</span>
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
                          <span className="material-symbols-outlined text-primary">arrow_forward</span>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
            
            {terkiniArticles.length > 0 && (
              <div className="mt-xl flex justify-center">
                <button className="flex items-center gap-2 px-8 py-3 bg-primary-container text-on-primary-container rounded-full font-label-md text-label-md hover:opacity-90 transition-all active:scale-95 shadow-sm">
                  Lihat Lebih Banyak
                  <span className="material-symbols-outlined animate-bounce">expand_more</span>
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
