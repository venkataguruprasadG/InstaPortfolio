'use client'

import { useState } from 'react'
import { Download, Eye, Edit, Share2, FileText, ExternalLink, Copy, Check } from 'lucide-react'
import { PortfolioTemplate } from '@/types'
import { generateResumePDF } from '@/utils/resumeGenerator'
import toast from 'react-hot-toast'

interface GeneratedPortfolioProps {
  template: PortfolioTemplate
  userData: any
  onBackToForm: () => void
  onStartOver: () => void
}

export function GeneratedPortfolio({ template, userData, onBackToForm, onStartOver }: GeneratedPortfolioProps) {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'resume'>('portfolio')
  const [copied, setCopied] = useState(false)
  
  const portfolioUrl = `https://instaportfolio.com/${userData.name.toLowerCase().replace(/\s+/g, '-')}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl)
    setCopied(true)
    toast.success('Portfolio link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadResume = async () => {
    try {
      toast.loading('Generating resume PDF...')
      await generateResumePDF(userData, template)
      toast.dismiss()
      toast.success('Resume downloaded successfully!')
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to generate resume')
    }
  }

  const handleDownloadPortfolio = () => {
    toast.success('Portfolio files prepared for download!')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Portfolio is Ready! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            We've generated your personalized portfolio using the <span className="font-semibold text-primary-600">{template.name}</span> template.
          </p>

          {/* Portfolio URL */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ExternalLink className="w-5 h-5 text-gray-400" />
              <span className="font-mono text-gray-700">{portfolioUrl}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="btn-primary">
              <Eye className="w-4 h-4 mr-2" />
              View Live Portfolio
            </button>
            
            <button
              onClick={handleDownloadResume}
              className="btn-secondary"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume (PDF)
            </button>
            
            <button
              onClick={onBackToForm}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Edit className="w-4 h-4 mr-2 inline" />
              Edit Details
            </button>
          </div>
        </div>

        {/* Preview Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all ${
                  activeTab === 'portfolio'
                    ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Eye className="w-5 h-5" />
                <span>Portfolio Preview</span>
              </button>
              
              <button
                onClick={() => setActiveTab('resume')}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all ${
                  activeTab === 'resume'
                    ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Resume Preview</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'portfolio' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Portfolio Preview</h3>
                
                {/* Portfolio Mock-up */}
                <div className="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
                  <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                      {userData.profilePhoto && (
                        <img
                          src={userData.profilePhoto}
                          alt={userData.name}
                          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary-200"
                        />
                      )}
                      <h1 className="text-4xl font-bold text-gray-900 mb-2">{userData.name}</h1>
                      <p className="text-xl text-gray-600">{userData.email}</p>
                    </div>

                    {/* Bio */}
                    {userData.bio && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
                        <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
                      </div>
                    )}

                    {/* Skills */}
                    {userData.skills.length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {userData.skills.map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userData.projects.filter((p: any) => p.title).map((project: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-3">{project.description}</p>
                            {project.link && (
                              <a
                                href={project.link}
                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                              >
                                View Project →
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Resume Preview</h3>
                
                {/* Resume Mock-up */}
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto border">
                  <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{userData.name}</h1>
                    <p className="text-gray-600">{userData.email}</p>
                  </div>

                  {userData.bio && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">Summary</h2>
                      <p className="text-gray-700 text-sm leading-relaxed">{userData.bio}</p>
                    </div>
                  )}

                  {userData.skills.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">Skills</h2>
                      <div className="text-sm text-gray-700">
                        {userData.skills.join(' • ')}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">Experience</h2>
                    {userData.experience.filter((exp: any) => exp.company).map((exp: any, index: number) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
                          <span className="text-xs text-gray-500">{exp.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
                        {exp.description && (
                          <p className="text-xs text-gray-600">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">Education</h2>
                    {userData.education.filter((edu: any) => edu.institution).map((edu: any, index: number) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                            <p className="text-sm text-gray-600">{edu.institution}</p>
                          </div>
                          <span className="text-xs text-gray-500">{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={handleDownloadResume}
                    className="btn-primary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Resume
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg">
            <button
              onClick={handleDownloadPortfolio}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Files</span>
            </button>
            
            <div className="h-4 border-l border-gray-300"></div>
            
            <button
              onClick={() => toast.success('Shared successfully!')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <div className="h-4 border-l border-gray-300"></div>
            
            <button
              onClick={onStartOver}
              className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
            >
              Create Another
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}