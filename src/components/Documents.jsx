import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Documents() {
  const { t } = useTranslation();
  const docs = [
    { title: t('documents.charter'), size: '2.4 MB', type: 'PDF' },
    { title: t('documents.license'), size: '1.1 MB', type: 'PDF' },
    { title: t('documents.accreditation'), size: '1.8 MB', type: 'PDF' },
    { title: t('documents.rules'), size: '345 KB', type: 'PDF' },
    { title: t('documents.finance'), size: '5.2 MB', type: 'PDF' },
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[32px] md:text-headline-lg font-bold text-on-surface mb-12">{t('documents.title')}</h2>
        <div className="space-y-4">
          {docs.map((doc, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-6 rounded-2xl flex items-center justify-between group hover:bg-primary/5 transition-colors cursor-pointer border border-outline/10">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-error text-3xl">picture_as_pdf</span>
                <div>
                  <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">{doc.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-1">{doc.type} • {doc.size}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">download</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
