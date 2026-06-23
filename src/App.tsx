import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import RsvpForm from './components/RsvpForm';
import Achievement from './components/Achievement';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAchievement, setShowAchievement] = useState(false);
  const [orbs, setOrbs] = useState<{ id: number; left: string; duration: string; delay: string }[]>([]);

  // Generate random XP orbs
  useEffect(() => {
    const newOrbs = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 5}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setOrbs(newOrbs);
  }, []);

  const handleRsvpSuccess = () => {
    setShowAchievement(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white flex flex-col justify-center">
      
      {/* Background Video */}
      {!isLoading && (
        <video 
          autoPlay 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
          src="/background.mov"
        />
      )}

      {/* Dynamic Background Effects */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), 
            linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)
          `,
          backgroundSize: '128px 128px',
          backgroundPosition: '0 0, 64px 64px'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 pointer-events-none z-0" />

      {/* Floating XP Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {orbs.map((orb) => (
          <div 
            key={orb.id} 
            className="xp-orb" 
            style={{ 
              left: orb.left, 
              animationDuration: orb.duration, 
              animationDelay: orb.delay 
            }} 
          />
        ))}
      </div>

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Main Content */}
      <div className={`relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Title Container */}
        <div className="text-center mb-10 mt-8 drop-shadow-2xl animate-float">
          <h1 className="font-pixel text-4xl sm:text-6xl text-white mb-4 tracking-widest text-shadow-xl" style={{ textShadow: '4px 4px 0 #3a3a3a, 8px 8px 0 #000' }}>
            <span className="text-gray-300">Niver do</span> <br className="sm:hidden" />
            <span className="text-green-400">Theo</span>
          </h1>
          <p className="font-pixel text-[10px] sm:text-sm text-yellow-300 mt-6" style={{ textShadow: '2px 2px 0 #000' }}>
            Nivel 6 Carregado. Venha jogar!
          </p>
        </div>

        {/* Details Panel (Minecraft Sign) */}
        <div className="mc-sign w-full max-w-sm p-6 flex flex-col gap-5 text-center mb-10 transform -rotate-2">
          
          <div className="flex flex-col gap-2">
            <span className="font-pixel text-[10px] text-yellow-500 opacity-80 uppercase tracking-widest">Player</span>
            <span className="font-pixel text-sm sm:text-lg text-white">Theo Alves Teixeira</span>
          </div>
          
          <div className="w-full h-1 bg-[#47331b] border-b border-[#a88659]" />
          
          <div className="flex flex-row justify-center gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-pixel text-[10px] text-yellow-500 opacity-80 uppercase tracking-widest">Data</span>
              <span className="font-pixel text-xs sm:text-sm text-white">27/06/2026</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-pixel text-[10px] text-yellow-500 opacity-80 uppercase tracking-widest">Hora</span>
              <span className="font-pixel text-xs sm:text-sm text-white">18:30h</span>
            </div>
          </div>
        </div>

        {/* RSVP Form */}
        <RsvpForm onSuccess={handleRsvpSuccess} />
      </div>

      {/* Achievement Popup */}
      {showAchievement && (
        <Achievement 
          title="Conquista Desbloqueada!" 
          subtitle="Presenca Confirmada" 
          onClose={() => setShowAchievement(false)} 
        />
      )}
    </div>
  );
}

export default App;
