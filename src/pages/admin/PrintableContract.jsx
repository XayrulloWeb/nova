import React, { useRef, useState } from 'react';

// Helpers to format numbers
const formatMoney = (amount) => {
  if (!amount) return '';
  return Number(amount).toLocaleString('ru-RU');
};

export default function PrintableContract({ application, contract, onClose }) {
  const contractRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!contractRef.current) return;
    setIsGenerating(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin:       [15, 15, 15, 15],
        filename:     `Shartnoma_${contract.contract_number}_${application.child_name}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          onclone: (clonedDoc) => {
            // Remove ALL stylesheets from cloned doc to avoid oklch parsing
            const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
            styles.forEach(s => s.remove());
            
            // Apply clean styles to the contract container
            const contract = clonedDoc.getElementById('printable-contract');
            if (contract) {
              contract.style.cssText = 'font-family: "Times New Roman", Times, serif; font-size: 12pt; line-height: 1.5; color: #000000; background-color: #ffffff; padding: 20mm; max-width: 210mm; margin: 0 auto;';
              // Force all children to simple black text on transparent bg
              contract.querySelectorAll('*').forEach(el => {
                el.style.color = '#000000';
                el.style.backgroundColor = 'transparent';
                if (el.style.borderColor) el.style.borderColor = '#000000';
              });
              // Fix bold elements
              contract.querySelectorAll('b, strong, h1, h2, h3, h4').forEach(el => {
                el.style.fontWeight = 'bold';
              });
              // Fix text alignment
              contract.querySelectorAll('.text-center, [class*="text-center"]').forEach(el => {
                el.style.textAlign = 'center';
              });
              contract.querySelectorAll('.text-justify, [class*="text-justify"]').forEach(el => {
                el.style.textAlign = 'justify';
              });
              // Fix border box
              contract.querySelectorAll('.border, [class*="border"]').forEach(el => {
                el.style.border = '1px solid #000000';
              });
              // Fix grid for requisites section
              contract.querySelectorAll('.grid-cols-2, [class*="grid-cols-2"]').forEach(el => {
                el.style.display = 'grid';
                el.style.gridTemplateColumns = '1fr 1fr';
                el.style.gap = '32px';
              });
              // Fix list styles
              contract.querySelectorAll('ul').forEach(el => {
                el.style.paddingLeft = '32px';
                el.style.listStyleType = 'lower-alpha';
              });
              // Fix flex containers
              contract.querySelectorAll('.flex, [class*="flex"]').forEach(el => {
                el.style.display = 'flex';
              });
              contract.querySelectorAll('.justify-between, [class*="justify-between"]').forEach(el => {
                el.style.justifyContent = 'space-between';
              });
            }
          }
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
      };
      await html2pdf().set(opt).from(contractRef.current).save();
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Ошибка при создании PDF файла');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!contract || !application) return null;

  const monthlyFee = Number(contract.monthly_fee) || 0;
  const annualFee = monthlyFee * 10; // 10 months
  const guaranteeFee = monthlyFee * 0.5; // 50% of monthly fee

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 flex flex-col" data-lenis-prevent="true">
      
      {/* Top bar with buttons */}
      <div className="flex items-center justify-between px-6 py-4 bg-surface-container shadow-lg z-10">
        <h3 className="text-lg font-bold text-on-surface">Предпросмотр договора</h3>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadPDF} 
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
            {isGenerating ? 'Генерация...' : 'Скачать PDF'}
          </button>
          <button 
            onClick={() => { window.print(); }} 
            className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-container-highest transition-all"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            Печать
          </button>
          <button onClick={onClose} className="px-5 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all">
            Закрыть
          </button>
        </div>
      </div>

      {/* Scrollable preview area */}
      <div className="flex-1 overflow-auto p-6" data-lenis-prevent="true">
        <div ref={contractRef} id="printable-contract" className="max-w-[210mm] mx-auto bg-white p-[20mm] text-black shadow-2xl" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt', lineHeight: '1.5' }}>
        
        {/* HEADER */}
        <div className="text-center font-bold mb-6">
          <h1 className="text-lg uppercase">O'ZBEKISTON RESPUBLIKASI</h1>
          <h2 className="text-base uppercase mb-2">PULLIK TA'LIM XIZMATLARINI KO'RSATISH TO'G'RISIDA</h2>
          <h1 className="text-2xl uppercase tracking-[0.2em] mb-4">SHARTNOMA</h1>
        </div>
        
        <div className="flex justify-between font-bold mb-6">
          <div>____{contract.contract_number}_____-son</div>
          <div>{new Date(contract.contract_date).toLocaleDateString('ru-RU')} yil</div>
          <div>Urganch shahri</div>
        </div>

        <p className="mb-4 indent-8 text-justify">
          Mazkur Shartnoma (keyingi o'rinlarda «Shartnoma» deb yuritiladi) quyida ko'rsatilgan taraflar o'rtasida tuzildi:
        </p>

        <p className="mb-4 indent-8 text-justify">
          O'zbekiston Respublikasi, Xorazm viloyati, Urganch shahri, Sanoatchilar ko'chasi, 9-uy manzilida faoliyat
          yurituvchi <b>«NOVA XALQARO AI-MAKTABI»</b> Mas'uliyati Cheklangan Jamiyati (STIR: 313 015 922, 
          keyingi o'rinlarda <b>«Maktab»</b> deb yuritiladi) nomidan uning Ustavi asosida vakolatli direktor Allaquliyev
          To'lqinjon Baxtiyorovich (pasport: seriyasi AD, raqami 0690743, 01.10.2021 yilda O'zbekiston
          Respublikasi IIB tomonidan berilgan) bir tomondan, hamda O'zbekiston Respublikasi, <b>{contract.parent_address}</b> 
          manzilida ro'yxatda turuvchi O'zbekiston Respublikasi fuqarosi <b>{application.parent_name}</b> (Shaxs 
          guvohnomasi/pasport: seriyasi <b>{contract.parent_passport_series}</b>, raqami <b>{contract.parent_passport_number}</b>, 
          <b>{new Date(contract.parent_passport_issue_date).toLocaleDateString('ru-RU')}</b> yilda <b>{contract.parent_passport_issued_by}</b> tomonidan 
          berilgan) (keyingi o'rinlarda <b>«O'quvchi»</b> deb yuritiladi) ning qonuniy vakili <b>{application.parent_name}</b> (Shaxs 
          guvohnomasi/pasport: seriyasi <b>{contract.parent_passport_series}</b>, raqami <b>{contract.parent_passport_number}</b>, 
          <b>{new Date(contract.parent_passport_issue_date).toLocaleDateString('ru-RU')}</b> yilda <b>{contract.parent_passport_issued_by}</b> tomonidan 
          berilgan) (keyingi o'rinlarda <b>«Ota-ona»</b> deb yuritiladi) ikkinchi tomondan, (keyingi o'rinlarda alohida 
          «Taraf», birgalikda «Taraflar» deb yuritiladi) O'zbekiston Respublikasi Mehnat kodeksi, «Ta'lim to'g'risida»gi Qonuni va 
          amaldagi qonunchilik hujjatlariga muvofiq ushbu Shartnomani quyidagilar to'g'risida tuzdik:
        </p>

        <h3 className="font-bold text-center uppercase mb-2">1. SHARTNOMA PREDMETI</h3>
        <p className="mb-2 text-justify">
          1.1. Mazkur Shartnoma asosida Maktab O'zbekiston Respublikasi davlat ta'lim standartlari talablaridan past 
          bo'lmagan o'quv dasturi va innovatsion usullar qo'llangan holda <b>{contract.academic_year}</b>-o'quv yilida O'quvchiga pullik 
          ta'lim xizmatlarini ko'rsatish majburiyatini o'z zimmasiga oladi.
        </p>
        <p className="mb-2 text-justify">
          1.2. O'quvchi Maktabning <b>{application.grade}</b>-sinfiga qabul qilinadi. Ta'lim muddati: 2026-yil 1-sentabrdan 2027-yil 30-iyungacha (10 o'quv oyi).
        </p>
        <p className="mb-4 text-justify">
          1.3. Ota-Ona ushbu Shartnomada belgilangan tartib va muddatlarda to'lovlarni to'liq hamda o'z vaqtida amalga oshirish majburiyatini o'z zimmasiga oladi.
        </p>

        <h3 className="font-bold text-center uppercase mb-2">2. KO'RSATILADIGAN XIZMATLAR TARKIBI</h3>
        <p className="mb-2">2.1. Maktab O'quvchiga quyidagi xizmatlarni to'lovni hisobiga ko'rsatish majburiyatini oladi:</p>
        <ul className="list-[lower-alpha] pl-8 mb-2">
          <li>O'quv jarayonini tashkil etish — Dushanba—Juma, 08:30—17:30, sinfda ko'pi bilan 20 nafar o'quvchi;</li>
          <li>Kuniga 3 (uch) mahal issiq ovqat — nonushta, tushlik va polnik bilan ta'minlash;</li>
          <li>Tibbiy xodim va psixolog xizmatini ko'rsatish;</li>
          <li>Xavfsizlikni ta'minlash — video kuzatuv tizimi (08:30—17:30);</li>
          <li>O'quv materiallari, darsliklar, bir martalik papka, termos va futbolka bilan ta'minlash;</li>
        </ul>
        <p className="mb-2 text-justify">
          2.2. O'quvchiga maktab formasida kelish majburiy. To'garaklar (IT, Robototexnika, Xorijiy til, Matematika, Sport) shartnoma tarkibiga kiritilgan.
        </p>
        <p className="mb-6 text-justify">
          2.3. Intellektual salohiyati yuqori o'quvchilarga Maktabning ichki lokal hujjatlari asosida stipendiyalar beriladi.
        </p>

        <div style={{ pageBreakBefore: 'always' }}></div>

        <h3 className="font-bold text-center uppercase mb-2">3. SHARTNOMA QIYMATI VA TO'LOV TARTIBI</h3>
        <div className="border border-black p-4 mb-4 text-center font-bold">
          <div className="uppercase mb-2">OYLIK TO'LOV MIQDORI</div>
          <div className="mb-2 text-lg">({formatMoney(monthlyFee)}) so'm</div>
          <div className="flex justify-between px-10 mt-4 border-t border-black pt-4">
            <span>Yillik jami: <u>{formatMoney(annualFee)}</u> so'm</span>
          </div>
        </div>

        <p className="mb-2 text-justify">
          3.1. Mazkur Shartnoma bo'yicha yillik ta'lim to'lovi <b>{formatMoney(annualFee)}</b> so'mni tashkil etib, oylik to'lov miqdori <b>{formatMoney(monthlyFee)}</b> so'm hisobida Sentabr—Iyun oylarida har oyning 5 (besh) sanasiga qadar to'liq amalga oshiriladi.
        </p>
        <p className="mb-2 text-justify">
          3.2. Shartnoma imzolanganda Ota-ona tomonidan kafolat summasi — bir oylik to'lovning 50 (ellik) foizi miqdorida, ya'ni <b>{formatMoney(guaranteeFee)}</b> so'm to'lanadi; mazkur summa 1 (birinchi) oylik to'lov hisobiga qo'shiladi.
        </p>
        <p className="mb-2 text-justify">
          3.3. To'lov belgilangan muddatda amalga oshirilmagan taqdirda O'quvchi ta'lim jarayoniga kiritilmaydi. Joriy oyning 15 (o'n besh)inchi sanasiga qadar ham to'lov amalga oshirilmagan holda Maktab ushbu Shartnomani bir tomonlama bekor qilish huquqiga ega bo'ladi.
        </p>
        <p className="mb-2 text-justify">
          3.4. Masofaviy ta'lim holatlarida to'lov — oylik to'lov miqdorining 50 (ellik) foizi miqdorida undiriladi. O'quvchi tomonidan sababidan qat'i nazar ta'lim jarayoniga qatnashilmagan kunlar uchun to'lov miqdori to'liq undiriladi.
        </p>
        <p className="mb-6 text-justify">
          3.5. Agar o'quvchi uchun maktab narxidan turli xil chegirmalar berilgan bo'lsa va to'lovlar 2 oydan 10 oygacha oldindan chegirma narxda to'langan bo'lsa va ota-ona shartnomani bekor qilishni so'ragan holatda, maktab uchun bir oylik narx (<b>{formatMoney(monthlyFee)}</b>) so'mdan qayta hisob-kitob qilinadi.
        </p>

        <h3 className="font-bold text-center uppercase mb-2">4. TARAFLARNING HUQUQ VA MAJBURIYATLARI</h3>
        <p className="mb-2">4.1. Maktab quyidagi majburiyatlarni o'z zimmasiga oladi:</p>
        <ul className="list-[lower-alpha] pl-8 mb-2">
          <li>Davlat ta'lim standartlari talablaridan past bo'lmagan sifatli ta'limni ta'minlash;</li>
          <li>O'quvchi shaxsiy ma'lumotlari va tibbiy holati to'g'risidagi ma'lumotlarning maxfiyligini ta'minlash;</li>
          <li>To'lov miqdori o'zgarganda Ota-onani 30 (o'ttiz) kalendar kun oldin yozma ravishda ogohlantirish;</li>
          <li>Intizom buzilganda Ota-onani darhol xabardor qilish va dalolatnoma rasmiylashtirishish.</li>
        </ul>
        <p className="mb-2">4.2. Ota-ona quyidagi majburiyatlarni o'z zimmasiga oladi:</p>
        <ul className="list-[lower-alpha] pl-8 mb-6">
          <li>To'lovlarni Shartnomada belgilangan muddat va miqdorda to'liq amalga oshirish;</li>
          <li>O'quvchini belgilangan vaqtda maktabga keltirish va olib ketish (yoki vakolatli shaxsni yuborish);</li>
          <li>O'quvchining sog'lig'i, surunkali kasalliklari va tibbiy holati to'g'risida to'liq va to'g'ri ma'lumot berish;</li>
          <li>O'quvchi ta'lim jarayoniga qatnasha olmaydi degan hollarda, dars boshlanishiga qadar Maktabni xabardor qilish;</li>
          <li>Maktab Nizomi, ichki tartib-qoidalari va odob-axloq me'yorlariga rioya qilishni ta'minlash.</li>
        </ul>

        <h3 className="font-bold text-center uppercase mb-2">5. TARAFLARNING JAVOBGARLIGI</h3>
        <p className="mb-2 text-justify">
          5.1. To'lov belgilangan muddatdan kechiktirilgan har bir kalendar kun uchun Ota-onadan to'lanmagan summa miqdorining 0 (nol) foizi miqdorida penya undiriladi.
        </p>
        <p className="mb-2 text-justify">
          5.2. O'quvchi tomonidan Maktab mulkiga ataylab zarar yetkazilgan taqdirda, moddiy javobgarlik to'liq miqdorda Ota-onaga yuklatiladi.
        </p>
        <p className="mb-6 text-justify">
          5.3. Taraflar fors-major holatlari (tabiiy ofat, epidemiya, harbiy holat va boshqa) yuzaga kelganda, Shartnoma bo'yicha majburiyatlarini bajarmaslik uchun javobgar bo'lmaydilar, biroq boshqa Tarafni bunday holat to'g'risida darhol — 3 (uch) ish kuni ichida yozma ravishda xabardor qilishlari shart.
        </p>

        <div style={{ pageBreakBefore: 'always' }}></div>

        <h3 className="font-bold text-center uppercase mb-2">6. NIZOLARNI HAL ETISH TARTIBI</h3>
        <p className="mb-2 text-justify">
          6.1. Taraflar o'rtasida yuzaga keladigan barcha nizolar va kelishmovchiliklar, avvalo, muzokaralar yo'li bilan — 15 (o'n besh) kalendar kun muddatida hal etiladi.
        </p>
        <p className="mb-6 text-justify">
          6.2. Muzokaralar davomida nizoni hal etish imkoni bo'lmagan holatlarda, huquqi buzilgan taraf talabnomasini boshqa tarafga yo'llaydi; talabnoma 10 (o'n) ish kuni ichida ko'rib chiqilishi shart. Talabnoma tartibida ham hal etib bo'lmagan nizolar O'zbekiston Respublikasining vakolatli sudida ko'rib chiqiladi.
        </p>

        <h3 className="font-bold text-center uppercase mb-2">7. SHARTNOMANI MUDDATIDAN OLDIN BEKOR QILISH</h3>
        <p className="mb-2 text-justify">
          7.1. Mazkur Shartnoma quyidagi asoslarda muddatidan oldin bekor qilinishi mumkin: a) taraflarning o'zaro yozma kelishuvi asosida; b) sudning qonuniy kuchga kirgan qarori asosida; c) mazkur Shartnomada ko'rsatilgan asoslarda; d) O'zbekiston Respublikasining amaldagi qonunchiligida belgilangan boshqa asoslarda.
        </p>
        <p className="mb-2 text-justify">
          7.2. Maktab tomonidan bir tomonlama bekor qilish asoslari: to'lov 10 (o'n) ish kundan ortiq kechiktirilganda; o'quvchi tomonidan intizom qo'pol ravishda buzilganda; ota-ona o'quvchining jiddiy tibbiy muammolarini qasddan yashirgan bo'lsa va bu holat boshqalarga zarar yetkazsa.
        </p>
        <p className="mb-2 text-justify">
          7.3. Ota-ona tomonidan bir tomonlama bekor qilish asoslari: ta'lim sifati davlat standartlari talablaridan past bo'lgan va 10 (o'n) kunlik ogohlantirish muddatida bartaraf etilmagan holda; to'lov asossiz oshirilganda; Maktab bankrot deb topilganda.
        </p>
        <p className="mb-6 text-justify">
          7.4. Shartnomani bekor qilish to'g'risida har bir Taraf boshqa Tarafni 30 (o'ttiz) kalendar kun oldin yozma ravishda ogohlantirishi shart. Shartnomaning muddatidan oldin bekor qilinishi Taraflarni tugallanmagan majburiyatlarini bajarishdan ozod etmaydi.
        </p>

        <h3 className="font-bold text-center uppercase mb-2">8. YAKUNIY SHARTLAR</h3>
        <p className="mb-2 text-justify">
          8.1. Mazkur Shartnoma Taraflar tomonidan imzolangan kundan boshlab qonuniy kuchga kiradi va 2027-yil 30-iyungacha amal qiladi.
        </p>
        <p className="mb-2 text-justify">
          8.2. Mazkur Shartnomaga o'zgartirish va qo'shimchalar kiritish Taraflarning o'zaro yozma kelishuvi — qo'shimcha kelishuv asosida amalga oshiriladi. Shartnomada nazarda tutilmagan holatlar O'zbekiston Respublikasining amaldagi qonunchilik hujjatlariga muvofiq tartibga solinadi.
        </p>
        <p className="mb-10 text-justify">
          8.3. Mazkur Shartnoma Taraflar tomonidan bir xil huquqiy kuchga ega 2 (ikki) nusxada tuzilib imzolandi va har bir Tarafga 1 (bir) nusxadan topshirildi.
        </p>

        {/* REQUISITES */}
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-4 uppercase">MAKTAB:</h4>
            <p><b>«NOVA XALQARO AI-MAKTABI» MChJ</b></p>
            <p>STIR: 313 015 922</p>
            <p>Bank: «Mikrokreditbank» ATB Urganch filiali</p>
            <p>X/r: 20208000407460710001</p>
            <p>MFO: 00433</p>
            <p>Yuridik manzil: Urganch sh., Sanoatchilar ko'chasi, 9-o-uy</p>
            <p>Telefon: 99 890 820 1166</p>
            <p className="mb-8">Elektron manzil: ____________________</p>
            <p className="font-bold">Maktab direktori:</p>
            <p>____________ / Allaquliyev T.B. /</p>
            <p className="text-xs text-gray-500 italic mt-2">M.O'</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase">OTA-ONA (QONUNIY VAKIL):</h4>
            <p>F.I.Sh (to'liq): <b>{application.parent_name}</b></p>
            <p>Pasport: <b>{contract.parent_passport_series} {contract.parent_passport_number}</b></p>
            <p>Berilgan sana: <b>{new Date(contract.parent_passport_issue_date).toLocaleDateString('ru-RU')}</b></p>
            <p>Organ: <b>{contract.parent_passport_issued_by}</b></p>
            <p>JShShIR: <b>{contract.parent_pinfl}</b></p>
            <p>Tug'ilgan sana: <b>{new Date(contract.parent_dob).toLocaleDateString('ru-RU')}</b></p>
            <p>Manzil: <b>{contract.parent_address}</b></p>
            <p>Telefon: <b>{application.parent_phone}</b></p>
            <p className="mb-8">El. manzil: ____________________</p>
            <p className="font-bold">Ota-ona imzosi:</p>
            <p>____________ / ______________ /</p>
            <p className="text-xs text-gray-500 italic mt-2">Sana: ____ / ________ / 2026-yil</p>
          </div>
        </div>
      </div>
      </div>

      {/* Print-only styles */}
      <style type="text/css">{`
        @media print {
          body * { visibility: hidden; }
          #printable-contract, #printable-contract * { visibility: visible; }
          @page { size: A4; margin: 15mm; }
          #printable-contract {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 15mm;
            overflow: visible !important;
            height: auto !important;
            box-shadow: none !important;
            font-family: "Times New Roman", Times, serif;
            font-size: 12pt;
            line-height: 1.5;
          }
        }
      `}</style>
    </div>
  );
}
