'use client'

import { useEffect, useState } from 'react'
import { getPortfolioBySlug } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Globe, Mail, ExternalLink } from 'lucide-react'

interface PortfolioPageProps {
  params: { slug: string }
}

export default function PortfolioPage({ params }: PortfolioPageProps) {
  const [portfolio, setPortfolio] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await getPortfolioBySlug(params.slug)
      
      if (error || !data) {
        notFound()
        return
      }
      
      setPortfolio(data)
      setLoading(false)
    }

    fetchPortfolio()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!portfolio) {
    notFound()
  }

  const userData = portfolio.user_data

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">{userData.name}</h1>
            <div className="flex items-center space-x-4">
              <a
                href={`mailto:${userData.email}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </a>
              <a
                href="/"
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Create Your Own</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          {userData.profilePhoto && (
            <div className="mb-8">
              <img
                src={userData.profilePhoto}
                alt={userData.name}
                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-primary-200 shadow-lg"
              />
            </div>
          )}
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
            {userData.name}
          </h1>
          
          {userData.bio && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
              {userData.bio}
            </p>
          )}
        </section>

        {/* Skills Section */}
        {userData.skills.length > 0 && (
          <section className="mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills & Expertise</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {userData.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-4 py-2 rounded-full font-medium border border-primary-200 hover:shadow-md transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userData.projects.filter((p: any) => p.title).map((project: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden card-hover"
              >
                {project.image && (
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        {userData.experience.filter((exp: any) => exp.company).length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Experience</h2>
            <div className="space-y-8">
              {userData.experience.filter((exp: any) => exp.company).map((exp: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-lg text-primary-600">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 font-medium">{exp.duration}</span>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {userData.education.filter((edu: any) => edu.institution).length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.education.filter((edu: any) => edu.institution).map((edu: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-500">{edu.year}</span>
                  </div>
                  <p className="text-primary-600 font-medium">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's Work Together</h2>
          <p className="text-lg text-gray-600 mb-8">
            Interested in collaborating? I'd love to hear from you.
          </p>
          
          <a
            href={`mailto:${userData.email}`}
            className="btn-primary text-lg px-8 py-4"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get In Touch
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        <p>
          Portfolio powered by{' '}
          <a href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            InstaPortfolio
          </a>
        </p>
      </footer>
    </div>
  )
}