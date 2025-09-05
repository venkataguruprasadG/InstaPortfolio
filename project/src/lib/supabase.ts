import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Portfolio helpers
export const savePortfolio = async (portfolioData: any) => {
  const { data, error } = await supabase
    .from('portfolios')
    .insert([portfolioData])
    .select()
  
  return { data, error }
}

export const getUserPortfolios = async (userId: string) => {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const getPortfolioBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('slug', slug)
    .single()
  
  return { data, error }
}