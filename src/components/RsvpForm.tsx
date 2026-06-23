import { useState } from 'react';
import { mockSubmitRsvp, supabase } from '../lib/supabase';

interface RsvpFormProps {
  onSuccess: () => void;
}

export default function RsvpForm({ onSuccess }: RsvpFormProps) {
  const [nome, setNome] = useState('');
  const [vai, setVai] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      setError('Por favor, digite seu nome!');
      return;
    }
    if (vai === null) {
      setError('Selecione se voce vai ou nao!');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('convidados')
        .insert([{ nome, vai }]);

      if (dbError) {
        console.error('Supabase error:', dbError);
        await mockSubmitRsvp(nome, vai);
      }
      
      onSuccess();
      setNome('');
      setVai(null);
    } catch (err) {
      console.error(err);
      setError('Erro ao confirmar presenca.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mc-panel p-6 sm:p-8 w-full max-w-md mx-auto flex flex-col items-center">
      <h2 className="font-pixel text-center text-sm sm:text-base mb-8 text-[#3f3f3f] drop-shadow-sm">
        Confirmar Presenca
      </h2>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
        
        {/* Name Input */}
        <div className="flex flex-col gap-3">
          <label className="font-pixel text-[10px] sm:text-xs text-[#3f3f3f]">
            Qual o seu nome?
          </label>
          <input
            type="text"
            className="mc-input text-yellow-300"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Steve"
            disabled={isSubmitting}
            maxLength={30}
          />
        </div>

        {/* Radio Options */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setVai(true)}
            className={`mc-btn flex items-center justify-center gap-4 ${vai === true ? 'active ring-4 ring-[#83ff26] ring-offset-2 ring-offset-[#c6c6c6]' : ''}`}
            disabled={isSubmitting}
          >
            <div className="relative w-6 h-6 bg-[#51F0EA] border-2 border-[#1c6e6b] shadow-inner rotate-45 transform flex-shrink-0" />
            <span className="text-xs sm:text-sm">Eu vou!</span>
          </button>

          <button
            type="button"
            onClick={() => setVai(false)}
            className={`mc-btn flex items-center justify-center gap-4 ${vai === false ? 'active ring-4 ring-[#ff2626] ring-offset-2 ring-offset-[#c6c6c6]' : ''}`}
            disabled={isSubmitting}
          >
            <div className="relative w-6 h-6 bg-[#FF0000] border-2 border-[#5c0000] shadow-inner flex-shrink-0" />
            <span className="text-xs sm:text-sm">Nao poderei ir</span>
          </button>
        </div>

        {error && (
          <div className="bg-black/80 border-2 border-red-500 p-2 text-center animate-pulse">
            <p className="font-pixel text-[10px] text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mc-btn mt-2 w-full py-4 text-xs sm:text-sm text-green-300 hover:text-green-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'CONFIRMAR'}
        </button>
      </form>
    </div>
  );
}
