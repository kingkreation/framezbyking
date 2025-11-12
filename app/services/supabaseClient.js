import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://emwleufoncyuikpfszqp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtd2xldWZvbmN5dWlrcGZzenFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NjE2NzYsImV4cCI6MjA3ODUzNzY3Nn0.UNDDmC3DuM3fAfV4qZbRjnRMAEM3CVDZysdLnRtaEnI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});