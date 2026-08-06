import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Countdown({ targetDate }) {
  const { i18n } = useTranslation();
  
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
        timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const getLabel = (interval) => {
      const labelsUz = { days: 'Kun', hours: 'Soat', minutes: 'Daqiqa', seconds: 'Soniya' };
      const labelsRu = { days: 'Дней', hours: 'Часов', minutes: 'Минут', seconds: 'Секунд' };
      return i18n.language?.startsWith('uz') ? labelsUz[interval] : labelsRu[interval];
  };

  const isFinished = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="mt-16 flex flex-col items-center pointer-events-auto w-full max-w-2xl mx-auto relative z-30">
        <h3 className="text-sm md:text-base font-semibold text-on-surface-variant uppercase tracking-widest mb-4">
            {i18n.language?.startsWith('uz') ? "O'quv yili boshlanishiga qoldi:" : "До начала учебного года осталось:"}
        </h3>
      {!isFinished ? (
        <div className="flex gap-3 sm:gap-6 justify-center">
          {Object.keys(timeLeft).map((interval) => (
            <div key={interval} className="flex flex-col items-center justify-center p-3 sm:p-5 bg-surface/10 backdrop-blur-md rounded-2xl border border-outline/20 shadow-[0_0_20px_rgba(0,219,233,0.15)] min-w-[70px] sm:min-w-[90px]">
                <span className="text-3xl sm:text-5xl font-bold text-on-surface mb-1 font-mono tracking-tighter">
                    {timeLeft[interval].toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-label-caps uppercase text-primary tracking-widest">
                    {getLabel(interval)}
                </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-primary/20 backdrop-blur-md rounded-2xl border border-primary/50 text-center">
            <span className="text-xl md:text-3xl font-bold text-primary">
                {i18n.language?.startsWith('uz') ? "O'quv yili boshlandi! 🎉" : "Учебный год начался! 🎉"}
            </span>
        </div>
      )}
    </div>
  );
}
