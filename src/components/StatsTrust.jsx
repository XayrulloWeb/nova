import React from 'react';

export default function StatsTrust() {
  return (
    <section className="w-full py-[160px] md:py-[240px] bg-surface-container-lowest relative z-10" id="stats-trust">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter-desktop px-margin-mobile md:px-margin-desktop max-w-[1920px] mx-auto">
        
        {/* Context Header */}
        <div className="col-span-4 md:col-start-2 md:col-span-4 flex flex-col justify-end pb-12 md:pb-24">
          <p className="text-xs font-bold text-primary-fixed-dim mb-2 uppercase tracking-widest">Samaradorlik Ko'rsatkichlari</p>
          <h2 className="text-[32px] md:text-[48px] font-bold text-on-surface">Mukammallik uchun Aniq Ishlab Chiqilgan.</h2>
        </div>
        
        {/* Main Stat */}
        <div className="col-span-4 md:col-start-6 md:col-span-7 flex flex-col justify-end pb-12 md:pb-24 relative group cursor-default">
          <div className="absolute inset-0 bg-primary-container/0 group-hover:bg-primary-container/5 blur-3xl transition-all duration-700 pointer-events-none rounded-full transform scale-50 group-hover:scale-100"></div>
          <div className="flex items-baseline gap-4 relative z-10">
            <span className="text-[80px] md:text-[200px] font-extrabold text-on-surface tracking-tighter opacity-90 transition-opacity duration-500 group-hover:opacity-100 leading-none">99%</span>
            <span className="text-[32px] font-bold text-primary-fixed-dim opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-y-4 group-hover:translate-y-0">*</span>
          </div>
          <div className="h-[1px] w-full bg-surface-variant mt-4 mb-8"></div>
          <p className="text-body-lg text-outline">Bitiruvchilarimizning 99 foizi dasturni tugatgandan so'ng 90 kun ichida elita muhandislik guruhlari va tez o'sayotgan laboratoriyalarga muvaffaqiyatli qo'shilishadi.</p>
        </div>
        
        {/* Secondary Stats Grid */}
        <div className="col-span-4 md:col-start-2 md:col-span-10 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-gutter-desktop mt-[80px]">
            {/* Stat 1 */}
            <div className="flex flex-col border-b border-outline-variant/30 pb-6">
              <div className="text-[64px] font-extrabold text-primary-fixed-dim leading-none mb-2">99%</div>
              <div className="text-body-md text-on-surface-variant font-bold uppercase tracking-widest">Ish bilan Ta'minlanish</div>
              <div className="text-sm text-on-surface-variant/60 mt-1">Bitiruvchilarimiz butun dunyo bo'ylab eng yaxshi texnologik kompaniyalarga ishga qabul qilinadi.</div>
            </div>
            
            {/* Stat 2 */}
            <div className="flex flex-col border-b border-outline-variant/30 pb-6 md:border-b-0">
              <div className="text-[64px] font-extrabold text-primary-fixed-dim leading-none mb-2">5+</div>
              <div className="text-body-md text-on-surface-variant font-bold uppercase tracking-widest">Yillik Mukammallik</div>
              <div className="text-sm text-on-surface-variant/60 mt-1">Tashkil etilganimizdan beri zamonaviy texnologik ta'limda kashshofmiz.</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col border-b border-outline-variant/30 pb-6">
              <div className="text-[64px] font-extrabold text-primary-fixed-dim leading-none mb-2">12K</div>
              <div className="text-body-md text-on-surface-variant font-bold uppercase tracking-widest">Global Bitiruvchilar</div>
              <div className="text-sm text-on-surface-variant/60 mt-1">Bir-birini qo'llab-quvvatlovchi dasturchilarning kuchli tarmog'i.</div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col">
              <div className="text-[64px] font-extrabold text-primary-fixed-dim leading-none mb-2">100%</div>
              <div className="text-body-md text-on-surface-variant font-bold uppercase tracking-widest">Loyihaga Asoslangan</div>
              <div className="text-sm text-on-surface-variant/60 mt-1">Zerikarli ma'ruzalar yo'q. Siz haqiqiy ilovalarni yaratish orqali o'rganasiz.</div>
            </div>
        </div>
        
        {/* Trust / Partners Block */}
        <div className="col-span-4 md:col-span-12 mt-[160px]">
          <div className="glass-card rounded-xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_8s_infinite] pointer-events-none"></div>
            <div className="w-full md:w-1/3">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tarmoqqa Birlashtirilgan Tashkilotlar</p>
              <h3 className="text-[32px] font-bold text-on-surface mt-4">Texnologiya ilg'orlari tomonidan ishonch bildirilgan.</h3>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
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
