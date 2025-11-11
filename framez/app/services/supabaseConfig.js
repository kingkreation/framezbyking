import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xhwzaiczdoqgxncxghmm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhod3phaWN6ZG9xZ3huY3hnaG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTYwODYsImV4cCI6MjA3ODQzMjA4Nn0.eNKPdvwZQ-Im8Pz67P980IZ1MXxKie87ykuh_AtmMI4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
