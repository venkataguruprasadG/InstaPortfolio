'use client'

import { useState } from 'react'
import { Hero } from '@/components/Hero'
import { TemplateGallery } from '@/components/TemplateGallery'
import { TemplatePreview } from '@/components/TemplatePreview'
import { UserForm } from '@/components/UserForm'
import { GeneratedPortfolio } from '@/components/GeneratedPortfolio'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PortfolioTemplate } from '@/types'

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'gallery' | 'preview' | 'form' | 'generated'>('gallery')
  const [selectedTemplate, setSelectedTemplate] = useState<PortfolioTemplate | null>(null)
  const [userData, setUserData] = useState(null)

  const handleTemplateSelect = (template: PortfolioTemplate) => {
    setSelectedTemplate(template)
    setCurrentStep('preview')
  }

  const handleUseTemplate = () => {
    setCurrentStep('form')
  }

  const handleFormSubmit = (data: any) => {
    setUserData(data)
    setCurrentStep('generated')
  }

  const handleBackToGallery = () => {
    setCurrentStep('gallery')
    setSelectedTemplate(null)
  }

  const handleBackToPreview = () => {
    setCurrentStep('preview')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      {currentStep === 'gallery' && (
        <>
          <Hero />
          <TemplateGallery onTemplateSelect={handleTemplateSelect} />
        </>
      )}
      
      {currentStep === 'preview' && selectedTemplate && (
        <TemplatePreview
          template={selectedTemplate}
          onUseTemplate={handleUseTemplate}
          onBack={handleBackToGallery}
        />
      )}
      
      {currentStep === 'form' && selectedTemplate && (
        <UserForm
          template={selectedTemplate}
          onSubmit={handleFormSubmit}
          onBack={handleBackToPreview}
        />
      )}
      
      {currentStep === 'generated' && selectedTemplate && userData && (
        <GeneratedPortfolio
          template={selectedTemplate}
          userData={userData}
          onBackToForm={() => setCurrentStep('form')}
          onStartOver={handleBackToGallery}
        />
      )}
      
      <Footer />
    </div>
  )
}