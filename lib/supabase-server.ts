import {Database} from '#/types/supabase'
import {createServerComponentSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {cookies, headers} from 'next/headers'

export const createSupabaseClient = () =>
  createServerComponentSupabaseClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookies,
    headers,
  })
