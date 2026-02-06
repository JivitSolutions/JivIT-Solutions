import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yxqxxqmfazbrxpgchysp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_RoBEdIRavImWb_akieit9Q_zM4SlwKi'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


// Soham24052002@