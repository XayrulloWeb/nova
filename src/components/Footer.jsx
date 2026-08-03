import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-outline/10 pt-24 pb-12 relative z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Contact */}
          <div className="col-span-1 md:col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link to="/" className="flex items-center gap-3 mb-8 group inline-flex w-max">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary font-bold shadow-[0_0_15px_rgba(0,219,233,0.4)] group-hover:scale-110 transition-transform">
                  N
                </div>
                <span className="text-2xl font-extrabold text-on-surface tracking-tight">
                  NOVA
                </span>
              </Link>
              <p className="text-on-surface-variant max-w-md mb-8 leading-relaxed">
                Ertangi kun maktabi. Kelajak yetakchilarini tayyorlash uchun klassik an'analar va ilg'or texnologiyalarni birlashtirgan innovatsion ta'lim.
              </p>
              <div className="flex flex-col gap-3">
                <a className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors w-max group" href="mailto:info@novaschool.uz">
                  <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">mail</span>
                  <span className="font-medium">info@novaschool.uz</span>
                </a>
                <a className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors w-max group" href="tel:+998712000000">
                  <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">call</span>
                  <span className="font-medium">+998 71 200 00 00</span>
                </a>
                <p className="flex items-center gap-3 text-on-surface-variant w-max mt-2">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="font-medium">Toshkent sh., Sayram ko'chasi, 15-uy</span>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3 lg:col-start-7">
            <h4 className="font-label-caps text-sm text-on-surface font-bold tracking-widest uppercase mb-6">Navigatsiya</h4>
            <ul className="flex flex-col gap-3">
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors font-medium" to="/about">Maktab haqida</Link></li>
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors font-medium" to="/parents">Ota-onalarga</Link></li>
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors font-medium" to="/students">O'quvchilarga</Link></li>
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors font-medium" to="/news">Yangiliklar</Link></li>
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors font-medium" to="/contacts">Aloqa</Link></li>
            </ul>
          </div>

          {/* Newsletter & Socials */}
          <div className="col-span-1 md:col-span-8 lg:col-span-3">
            <h4 className="font-label-caps text-sm text-on-surface font-bold tracking-widest uppercase mb-6">Obuna</h4>
            <p className="text-on-surface-variant text-sm mb-4">Muhim maktab yangiliklarini to'g'ridan-to'g'ri pochtangizga oling.</p>
            <form className="relative group mb-10" onSubmit={(e) => e.preventDefault()}>
              <input 
                className="w-full bg-surface-container/50 border border-outline/20 rounded-xl py-3 pl-4 pr-12 text-on-surface focus:outline-none focus:border-primary focus:bg-surface-container transition-colors placeholder:text-on-surface-variant/50" 
                placeholder="Pochtangiz" 
                type="email" 
                required
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>

            <h4 className="font-label-caps text-sm text-on-surface font-bold tracking-widest uppercase mb-6">Biz ijtimoiy tarmoqlarda</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-surface-container border border-outline/10 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300">
                <span className="font-bold">Tg</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface-container border border-outline/10 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300">
                <span className="font-bold">Ig</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface-container border border-outline/10 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300">
                <span className="font-bold">Fb</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-outline/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-on-surface-variant font-medium">
            © {new Date().getFullYear()} NOVA SCHOOL. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Litsenziya</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
