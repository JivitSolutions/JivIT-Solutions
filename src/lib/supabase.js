import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'EnterYourSupbaseURL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'EnterYourSupabasePrivateKey'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


//database it not connected
