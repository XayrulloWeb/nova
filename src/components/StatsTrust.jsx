import React from 'react';

export default function StatsTrust() {
  return (
    <section className="w-full py-24 md:py-32 bg-background relative z-10" id="stats-trust">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center pb-16 md:pb-24">
          <span className="text-primary font-label-caps uppercase tracking-widest block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">Samaradorlik ko'rsatkichlari</span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight max-w-3xl">Mukammallikka erishish uchun yaratilgan.</h2>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Main Stat Card */}
            <div className="md:col-span-12 lg:col-span-8 glass-card rounded-[32px] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/30 transition-colors duration-700"></div>
                <div>
                    <div className="flex items-baseline gap-2 mb-6 relative z-10">
                        <span className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-on-surface to-on-surface-variant tracking-tighter leading-none">99%</span>
                        <span className="text-4xl font-bold text-primary">*</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-on-surface mb-4 relative z-10">Oliygohlarga qabul</h3>
                </div>
                <p className="text-body-lg text-on-surface-variant max-w-lg mt-8 relative z-10 font-medium">99% bitiruvchilarimiz maktabni tamomlagandan so'ng 90 kun ichida mamlakat va jahonning yetakchi universitetlariga muvaffaqiyatli qabul qilinadi.</p>
            </div>

            {/* Smaller Stats */}
            <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-8">
                <div className="glass-card rounded-[32px] p-8 flex-1 flex flex-col justify-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                    <div className="text-5xl md:text-6xl font-black text-on-surface mb-3 tracking-tighter">15+</div>
                    <div className="text-body-md text-primary font-bold uppercase tracking-widest mb-2">Yillik tajriba</div>
                    <div className="text-sm text-on-surface-variant leading-relaxed">Tashkil etilgan kundan boshlab biz zamonaviy ta'lim sohasida kashshofmiz.</div>
                </div>
                <div className="glass-card rounded-[32px] p-8 flex-1 flex flex-col justify-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                    <div className="text-5xl md:text-6xl font-black text-on-surface mb-3 tracking-tighter">12K</div>
                    <div className="text-body-md text-primary font-bold uppercase tracking-widest mb-2">Bitiruvchilar</div>
                    <div className="text-sm text-on-surface-variant leading-relaxed">Dunyo bo'ylab bir-birini qo'llab-quvvatlovchi innovatorlarning kuchli tarmog'i.</div>
                </div>
            </div>

        </div>
        
        {/* Trust / Partners Block */}
        <div className="mt-24 pt-16 border-t border-outline/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-2">Hamkorlarimiz</p>
              <h3 className="text-2xl font-semibold text-on-surface">Ta'lim sohasidagi yetakchilar bizga ishonishadi.</h3>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center opacity-60">
              <img className="h-8 md:h-10 w-auto mx-auto object-contain filter grayscale hover:grayscale-0 hover:brightness-200 transition-all duration-300" alt="Partner 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaSHJRX7vH9R8-RYN83FwCEJTLEDIWzPP7gXO5IFC6d2MOmmGoHkC6DMyvPNZYLU79FyKwGZjCBD8XeE2UTZ1lnnBfOQnhH9lk865eI2pOw_rifClXzdRP-LbD8IiksKUDzKFUV_CLP64fO-NmVEsEnyrpsuPWwU3MGuUxAcGyI5RL1Cur9WQUyjN4tkyV48-C-56tep9VboOdNU9J7vyRHEC5tWZhqPLTxqll8TZaB21BdIzjF1nQ" />
              <img className="h-8 md:h-10 w-auto mx-auto object-contain filter grayscale hover:grayscale-0 hover:brightness-200 transition-all duration-300" alt="Partner 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbNLWBvUOvUb337uluGwkbDiftDZd5CGP_bmxBLl4BVm8tXufKLv4PAeSPzonvMQwxv81OPEqal7vcpqwncujZp9ZLUBeezfAvEntQfxSJc92DSX7Kdhsh6ausewFcRGKPscW2VzJw1mWOdOmH08KGwUMKaLjAq_0z6iSvB9UsW5_Q3buRveUum1Ck6X_De_F4iOCGa9QKK2SqMkNbJHf8Ge91zrPf3rNw3JmmBihs6cBsls8pCYwe" />
              <img className="h-8 md:h-10 w-auto mx-auto object-contain filter grayscale hover:grayscale-0 hover:brightness-200 transition-all duration-300" alt="Partner 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHdWNlzXl_BsJ0cgY26o5XHbawWFx0ySu8IV0IrwFJwmRyIeIjVfE_-RTX1-NmqYq170XJpWpaXUm8LDER97c7Ttg7RywBEDJDkSKuZJqhB9MhtfzQWJh_FAdTIut2ix33HlU8MN_uEMkiP8qTbQvxeIYE8xQbRPQZXzd8sERM2Fl8GJ00v2qpZ-va3S_5OidF6sTgl25ZC6cgpCWqigacQwUl50V-Ts0dM55FxvUsDlSstGqjvsOj" />
              <img className="h-8 md:h-10 w-auto mx-auto object-contain filter grayscale hover:grayscale-0 hover:brightness-200 transition-all duration-300" alt="Partner 4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuuFWeAYJz79f6x35xkp42YC1NjLz6ws_gMBo9wgIAHlb9zp_xr3KCleCBlhFzw8wy5eE-aYPQ2SuUlw7967ce-T2Kcscwst9dM6xN2zQkpIoSxCImSJpdtFnWVGT-ZpO1MZJhDKWM_mMZiCCoOwGZvAYcAyUgJ80OK_953jLon3SQ0rXErmaXV453iTZqxSEMwSJ0BpvbGlshbmY5w3hOeoNdZWCDhtsgGWiIIrtU2DVZlLlhS8UA" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
