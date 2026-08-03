import React from 'react';

export default function Administration() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-y border-outline/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface mb-12 text-center">Maktab ma'muriyati</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              role: 'Maktab direktori',
              name: 'Aleksandr Gromov',
              desc: 'Pedagogika fanlari doktori. Qabul vaqti: Chor, Juma 14:00 - 16:00',
              img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop'
            },
            {
              role: 'O\'quv ishlari bo\'yicha direktor o\'rinbosari',
              name: 'Marina Sokolova',
              desc: 'Faxriy ta\'lim xodimi. Qabul vaqti: Sesh, Pay 10:00 - 12:00',
              img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop'
            },
            {
              role: 'Ma\'naviyat va ma\'rifat ishlari bo\'yicha direktor o\'rinbosari',
              name: 'Timur Xasanov',
              desc: 'Darsdan tashqari mashg\'ulotlar kuratori. Qabul vaqti: Dush, Chor 11:00 - 13:00',
              img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&auto=format&fit=crop'
            }
          ].map((admin, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-8 flex flex-col items-center text-center hover:scale-[1.02] transition-transform">
              <img src={admin.img} alt={admin.name} className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-primary/20" />
              <div className="text-primary font-label-caps text-xs tracking-widest mb-2">{admin.role}</div>
              <h3 className="text-2xl font-bold text-on-surface mb-3">{admin.name}</h3>
              <p className="text-sm text-on-surface-variant">{admin.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
