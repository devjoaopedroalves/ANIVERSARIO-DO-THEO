import { useEffect } from 'react';

interface AchievementProps {
  title: string;
  subtitle: string;
  onClose: () => void;
}

export default function Achievement({ title, subtitle, onClose }: AchievementProps) {
  useEffect(() => {
    // The animation takes 4.5s total. We close it slightly after.
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-4 sm:top-10 sm:right-10 z-50 animate-achievement pointer-events-none">
      <div className="flex items-center gap-4 p-4 bg-black/80 border-2 border-[#555] rounded-xl max-w-xs sm:max-w-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-sm">
        
        {/* Achievement Icon - Classic Cake style */}
        <div className="w-10 h-10 shrink-0 bg-[#ffffff] border-2 border-[#dddddd] flex items-center justify-center relative overflow-hidden shadow-inner">
          <span className="text-2xl" style={{ filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.5))' }}>🎂</span>
        </div>
        
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-yellow-300 font-pixel text-[10px] sm:text-xs tracking-wide" style={{ textShadow: '2px 2px 0 #000' }}>
            {title}
          </span>
          <span className="text-white font-pixel text-[8px] sm:text-[10px] leading-relaxed" style={{ textShadow: '2px 2px 0 #000' }}>
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
