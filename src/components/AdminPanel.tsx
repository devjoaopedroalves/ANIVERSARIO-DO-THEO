import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Convidado {
  id: string;
  nome: string;
  vai: boolean;
  created_at: string;
}

export default function AdminPanel() {
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConvidados() {
      // Usando supabase para buscar todos
      const { data, error } = await supabase
        .from('convidados')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar convidados:', error);
      } else if (data) {
        setConvidados(data);
      }
      setLoading(false);
    }

    fetchConvidados();
  }, []);

  const totalConfirmados = convidados.filter((c) => c.vai).length;
  const totalAusentes = convidados.filter((c) => !c.vai).length;

  return (
    <div className="min-h-screen relative overflow-x-hidden text-white flex flex-col items-center py-10 px-4 bg-minecraft-dirt" style={{
      backgroundSize: '32px 32px',
      backgroundPosition: '0 0, 16px 16px',
      imageRendering: 'pixelated'
    }}>
      
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-2xl">
        <h1 className="font-pixel text-2xl sm:text-4xl text-center text-yellow-300 mb-8" style={{ textShadow: '4px 4px 0 #000' }}>
          Painel Admin
        </h1>

        <div className="mc-panel p-6 bg-[#866043] border-[#521414] text-white flex flex-row justify-between mb-8 shadow-2xl">
          <div className="flex flex-col gap-2">
            <span className="font-pixel text-[10px] text-gray-300">Confirmados:</span>
            <span className="font-pixel text-2xl text-green-400">{totalConfirmados}</span>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <span className="font-pixel text-[10px] text-gray-300">Ausentes:</span>
            <span className="font-pixel text-2xl text-red-400">{totalAusentes}</span>
          </div>
        </div>

        <div className="mc-panel p-4 bg-[#c6c6c6]">
          <h2 className="font-pixel text-sm text-black mb-4 text-center">Lista de Convidados</h2>
          
          {loading ? (
            <p className="font-pixel text-xs text-center text-[#555] my-8">Carregando dados...</p>
          ) : convidados.length === 0 ? (
            <p className="font-pixel text-xs text-center text-[#555] my-8">Nenhum convidado ainda.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {convidados.map((convidado) => (
                <div key={convidado.id} className="flex justify-between items-center p-3 bg-[#a0a0a0] border-2 border-[#555] border-t-[#fff] border-l-[#fff]">
                  <span className="font-pixel text-xs text-black truncate pr-4">
                    {convidado.nome}
                  </span>
                  
                  {convidado.vai ? (
                    <span className="flex items-center gap-2 text-xs font-pixel text-green-800 bg-[#51F0EA] px-2 py-1 border border-[#2b908c] shadow-inner">
                      VOU
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-xs font-pixel text-red-900 bg-[#FF0000] px-2 py-1 border border-[#8c0000] shadow-inner">
                      NÃO
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-center">
          <button onClick={() => window.location.href = '/'} className="mc-btn text-xs">
            Voltar ao Convite
          </button>
        </div>
      </div>
    </div>
  );
}
