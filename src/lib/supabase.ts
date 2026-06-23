import { createClient } from '@supabase/supabase-js';

// Substitua pelas suas chaves reais do Supabase (URL e Anon Key)
// O ideal é colocar em um arquivo .env como VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nujgmdocztbdnxglmaap.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'SUA_CHAVE_ANON_AQUI';

// Criamos o client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função mock para fallback caso as chaves não estejam configuradas
export const mockSubmitRsvp = async (nome: string, vai: boolean) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock Supabase: Presença salva com sucesso!', { nome, vai });
      resolve({ data: null, error: null });
    }, 1000);
  });
};
