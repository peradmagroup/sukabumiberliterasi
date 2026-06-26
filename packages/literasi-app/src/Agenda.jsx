import React, { useState } from 'react';

export default function Agenda() {
  const googleDriveLink = "https://docs.google.com/document/d/1ONYNKcQoO7j_Hmne79IOjDu8iUGCYuAze4tNvihoxRA/edit?usp=sharing";
  
  return (
    <>
      <section className="mb-lg">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-2">Agenda Kegiatan</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-gutter">Jadwal kegiatan terbaru kami terdokumentasi secara langsung di Google Drive.</p>
      </section>

      <section className="mt-xl">
        <div className="bg-primary-container rounded-xl p-8 flex flex-col items-center text-center text-on-primary-container gap-4 shadow-sm border border-outline-variant/20">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-primary text-4xl">description</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md mb-2">Dokumen Agenda Resmi</h3>
            <p className="font-body-md text-body-md max-w-lg mb-6">
              Seluruh agenda kegiatan, program, dan jadwal acara Sukabumi Berliterasi dapat Anda lihat pada dokumen resmi kami di Google Drive yang selalu di-update secara berkala.
            </p>
          </div>
          <a 
            href={googleDriveLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-label-md text-label-md transition-all active:scale-95 shadow-md hover:bg-primary/90 hover:shadow-lg"
          >
            <span className="material-symbols-outlined">open_in_new</span>
            Buka Dokumen Agenda
          </a>
        </div>
      </section>
      
      {/* Optional: Embed Iframe if it's published to the web */}
      <section className="mt-xl">
        <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Preview Dokumen</h2>
        <div className="w-full h-[600px] border border-outline-variant rounded-xl overflow-hidden shadow-sm bg-white">
          <iframe 
            src={googleDriveLink} 
            className="w-full h-full border-none"
            title="Agenda Kegiatan"
          ></iframe>
        </div>
      </section>
    </>
  );
}
