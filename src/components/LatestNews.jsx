import React from 'react';
import { Link } from 'react-router-dom';

export default function LatestNews() {
  const news = [
    {
      id: 1,
      tag: "Texnologiyalar",
      title: "Yangi robototexnika laboratoriyasining ochilishi",
      date: "12 Avgust 2026",
      desc: "O'quvchilarimiz eng zamonaviy robototexnika majmualaridan foydalanish imkoniyatiga ega bo'lishdi.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y7B9Y7X8X8Z8_9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5A6B7C8D9E0F1G2H3I4J5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y0Z",
    },
    {
      id: 2,
      tag: "G'alaba",
      title: "Xalqaro olimpiadada oltin medal",
      date: "05 Avgust 2026",
      desc: "NOVA jamoasi Singapurda informatika bo'yicha birinchi o'rinni egalladi.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2_Y7B9Y7X8X8Z8_9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5A6B7C8D9E0F1G2H3I4J5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y0Z",
    },
    {
      id: 3,
      tag: "Tadbirlar",
      title: "Yuqori sinf o'quvchilari uchun xakaton",
      date: "28 Iyul 2026",
      desc: "48 soat ichida aqlli shahar uchun yechimlar yaratamiz.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuE3_Y7B9Y7X8X8Z8_9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5A6B7C8D9E0F1G2H3I4J5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y0Z",
    }
  ];

  return (
    <section className="py-24 bg-background border-t border-outline/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-primary font-label-caps uppercase tracking-widest block mb-2">Mediamarkaz</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">So'nggi yangiliklar</h2>
          </div>
          <Link to="/news" className="text-primary hover:text-primary-container font-semibold flex items-center gap-2 transition-colors mt-6 md:mt-0">
            Barcha yangiliklar <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link to="/news" key={item.id} className="group flex flex-col glass-card rounded-[24px] overflow-hidden hover:shadow-[0_0_30px_rgba(0,219,233,0.1)] hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-64 overflow-hidden bg-surface-container-high">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Fallback image background in case src fails */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface-variant to-background z-0"></div>
              </div>
              <div className="p-8 flex flex-col flex-1 relative z-20">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">{item.tag}</span>
                  <span className="text-on-surface-variant text-sm">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-on-surface-variant text-sm mb-6 flex-1">{item.desc}</p>
                <div className="mt-auto">
                  <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">
                    O'qish <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">east</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
