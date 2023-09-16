import { createClient } from '@supabase/supabase-js'
import { env } from '../env'

export const supabase = createClient('https://ypohusdowusoohwgyplu.supabase.co', env.SUPABASE_SECRET_KEY)
