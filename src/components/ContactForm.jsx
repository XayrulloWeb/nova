import React from 'react';

export default function ContactForm() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[32px] md:text-headline-md font-bold text-on-surface mb-4 text-center">Savollaringiz qoldimi?</h2>
        <p className="text-body-lg text-on-surface-variant text-center mb-12">Bizga yozing va biz jon deb javob beramiz.</p>
        <form className="glass-card p-10 rounded-3xl flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">Ismingiz</label>
              <input type="text" className="bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="Ivan Ivanov" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">Telefon</label>
              <input type="tel" className="bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="+998 90 000 00 00" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">Xabar</label>
            <textarea className="bg-surface-container border border-outline/20 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors min-h-[150px]" placeholder="Savolingiz..."></textarea>
          </div>
          <button type="button" className="bg-primary text-on-primary py-4 rounded-xl font-label-caps tracking-widest font-bold hover:bg-primary/90 transition-colors mt-4">
            YUBORISH
          </button>
        </form>
      </div>
    </section>
  );
}
