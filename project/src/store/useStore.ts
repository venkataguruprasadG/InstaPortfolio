import { create } from 'zustand'
import { PortfolioTemplate, UserData } from '@/types'

interface AppState {
  user: any
  selectedTemplate: PortfolioTemplate | null
  userData: UserData | null
  portfolios: any[]
  
  setUser: (user: any) => void
  setSelectedTemplate: (template: PortfolioTemplate | null) => void
  setUserData: (data: UserData | null) => void
  setPortfolios: (portfolios: any[]) => void
  
  // Actions
  clearAll: () => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  selectedTemplate: null,
  userData: null,
  portfolios: [],
  
  setUser: (user) => set({ user }),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  setUserData: (data) => set({ userData: data }),
  setPortfolios: (portfolios) => set({ portfolios }),
  
  clearAll: () => set({
    user: null,
    selectedTemplate: null,
    userData: null,
    portfolios: []
  }),
}))