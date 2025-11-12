import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://alhblvqwatowqmlbotan.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsaGJsdnF3YXRvd3FtbGJvdGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MzgyNjMsImV4cCI6MjA3ODUxNDI2M30.5Q7tgTvOVw9J0r2RZYEIHwcnpd2cpmyspEFC0LGaN6g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});