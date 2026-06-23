import { createClient } from '@supabase/supabase-js';

// Substitua pelas suas chaves reais do Supabase (URL e Anon Key)
const supabaseUrl = 'https://nujgmdocztbdnxglmaap.supabase.co';
const supabaseAnonKey = 'sb_publishable_t1ZhMLkPmIPM98QI9GOyWw_Yss1LUsf';

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
