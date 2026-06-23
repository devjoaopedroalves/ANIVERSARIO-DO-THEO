import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFading(true), 300); // Wait a bit at 100%
          setTimeout(() => onComplete(), 1300); // 1s fade out duration
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 2;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#744e31',
        backgroundImage: `
          linear-gradient(45deg, #5c3c24 25%, transparent 25%, transparent 75%, #5c3c24 75%, #5c3c24), 
          linear-gradient(45deg, #5c3c24 25%, transparent 25%, transparent 75%, #5c3c24 75%, #5c3c24)
        `,
        backgroundSize: '64px 64px',
        backgroundPosition: '0 0, 32px 32px',
        imageRendering: 'pixelated'
      }}
    >
      <div className="flex flex-col items-center drop-shadow-2xl bg-black/40 p-10 rounded-sm">
        <h2 className="mb-10 text-white font-pixel text-xl sm:text-2xl text-shadow-xl text-center tracking-widest">
          Gerando nivel...
        </h2>
        
        {/* Progress Bar Container */}
        <div className="w-64 sm:w-96 h-8 border-4 border-white bg-black/80 p-1 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {/* Progress Fill */}
          <div 
            className="h-full bg-[#83ff26] shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] transition-all duration-200 ease-linear"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <p className="mt-4 text-gray-400 font-pixel text-[8px] sm:text-[10px]">
          Construindo terreno: {Math.min(progress, 100)}%
        </p>
      </div>
    </div>
  );
}
