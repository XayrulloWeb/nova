import React from 'react';
import { Link } from 'react-router-dom';

export default function Announcements() {
  return (
    <div className="bg-primary text-on-primary py-3 relative z-40 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_linear_infinite]"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between relative z-10 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-on-primary"></span>
          </span>
          <p className="text-sm font-semibold tracking-wide">
            <strong className="font-bold uppercase tracking-wider mr-2">Muhim:</strong> 
            2026-2027 o'quv yili uchun hujjatlar qabuli boshlandi.
          </p>
        </div>
        <Link to="/parents" className="text-sm font-bold underline hover:text-white transition-colors uppercase tracking-wider text-on-primary/90">
          Batafsil ma'lumot
        </Link>
      </div>
    </div>
  );
}
