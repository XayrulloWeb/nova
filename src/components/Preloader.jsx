import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the preloader after a delay to ensure components (like 3D canvas) have mounted
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2 seconds minimum loading time

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-container-lowest transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      
      {/* Blurred background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div className="w-32 h-32 md:w-48 md:h-48 mb-8 relative">
          {/* Pulsing ring behind logo */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping"></div>
          {/* The Logo */}
          <img 
            src="/logo.png" 
            alt="Nova School Logo" 
            className="w-full h-full object-contain relative z-10 animate-bounce"
            style={{ animationDuration: '2s' }}
          />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-on-surface bg-clip-text">
          Nova International
        </h2>
        <p className="mt-2 text-primary font-medium tracking-widest text-sm md:text-base animate-pulse">
          AI SCHOOL
        </p>
        
        {/* Loading Bar */}
        <div className="w-64 h-1.5 bg-surface-container-high rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-progress origin-left"></div>
        </div>
      </div>

    </div>
  );
}
