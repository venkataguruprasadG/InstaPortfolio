export interface PortfolioTemplate {
  id: string
  name: string
  description: string
  category: 'creative' | 'professional' | 'minimal' | 'tech'
  previewImage: string
  fullPreviewImage: string
  colors: string[]
  features: string[]
  rating: number
  usageCount: number
}

export interface UserData {
  name: string
  email: string
  profilePhoto?: string
  bio: string
  skills: string[]
  projects: Project[]
  education: Education[]
  experience: Experience[]
}

export interface Project {
  title: string
  description: string
  link: string
  image?: string
}

export interface Education {
  institution: string
  degree: string
  year: string
}

export interface Experience {
  company: string
  position: string
  duration: string
  description: string
}