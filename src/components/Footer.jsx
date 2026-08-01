import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bottom-0 border-t border-outline/20 bg-surface-container-lowest grid grid-cols-12 gap-gutter-desktop px-margin-desktop py-[160px] max-w-full relative z-10">
      <div className="col-span-12 md:col-span-6 flex flex-col justify-between mb-16 md:mb-0">
        <div>
          <div className="font-headline-md text-headline-md text-on-surface mb-8 tracking-tighter">NOVA</div>
          <div className="flex flex-col gap-4">
            <a className="font-body-lg text-body-lg text-on-surface-variant hover:text-primary transition-colors inline-block w-max" href="mailto:inquiries@nova.lab">inquiries@nova.lab</a>
          </div>
        </div>
        <div className="font-body-md text-body-md text-on-surface-variant mt-24">
          © 2024 NOVA LABS. BARCHA HUQUQLAR HIMOYA QILINGAN.
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 mb-16 md:mb-0">
        <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-6">MUNDARIJA</h4>
        <ul className="flex flex-col gap-4">
          <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface underline transition-all" href="#">O'quv Dasturi</a></li>
          <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface underline transition-all" href="#">Ustozlik</a></li>
          <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface underline transition-all" href="#">Karyera</a></li>
          <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface underline transition-all" href="#">Huquqiy</a></li>
        </ul>
      </div>
      <div className="col-span-12 md:col-span-3">
        <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-6">TARMOQ</h4>
        <ul className="flex flex-col gap-4 mb-12">
          <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface underline transition-all" href="#">Instagram</a></li>
          <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface underline transition-all" href="#">Github</a></li>
        </ul>
        <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-4">YANGILIKLAR</h4>
        <div className="relative group">
          <input className="w-full bg-transparent border-b border-outline/20 py-4 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-0 transition-colors placeholder:text-[#A1A1AA]" placeholder="ELEKTRON POCHTA" type="email" />
          <button className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
