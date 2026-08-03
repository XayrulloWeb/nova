import React from 'react';

export default function Gallery() {
  const images = [
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop', // kids studying
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop', // school hallway
    'https://images.unsplash.com/photo-1546410531-91ea3c136c07?q=80&w=600&auto=format&fit=crop', // lab
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop', // teacher
    'https://images.unsplash.com/photo-1576082498748-038c11e3895f?q=80&w=600&auto=format&fit=crop', // art
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop', // group
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="material-symbols-outlined text-4xl text-primary">photo_library</span>
          <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface">Fotogalereya</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="relative group rounded-3xl overflow-hidden aspect-square cursor-pointer glass-card">
              <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
