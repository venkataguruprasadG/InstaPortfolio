'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Upload, Plus, X, User, Mail, FileText, Briefcase, GraduationCap, Code } from 'lucide-react'
import { PortfolioTemplate } from '@/types'
import toast from 'react-hot-toast'

interface UserFormProps {
  template: PortfolioTemplate
  onSubmit: (data: any) => void
  onBack: () => void
}

interface FormData {
  name: string
  email: string
  profilePhoto: string
  bio: string
  skills: string[]
  projects: Array<{
    title: string
    description: string
    link: string
    image: string
  }>
  education: Array<{
    institution: string
    degree: string
    year: string
  }>
  experience: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
}

export function UserForm({ template, onSubmit, onBack }: UserFormProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    profilePhoto: '',
    bio: '',
    skills: [],
    projects: [{ title: '', description: '', link: '', image: '' }],
    education: [{ institution: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }]
  })

  const sections = [
    { title: 'Basic Info', icon: User },
    { title: 'Skills & Bio', icon: FileText },
    { title: 'Projects', icon: Code },
    { title: 'Education', icon: GraduationCap },
    { title: 'Experience', icon: Briefcase }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }))
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '', link: '', image: '' }]
    }))
  }

  const updateProject = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }))
  }

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      toast.error('Please fill in required fields')
      return
    }
    
    toast.success('Generating your portfolio...')
    onSubmit(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Preview</span>
            </button>
            
            <div className="text-sm text-gray-500">
              Using template: <span className="font-medium text-gray-900">{template.name}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {sections[currentSection].title}
              </h2>
              <span className="text-sm text-gray-500">
                {currentSection + 1} of {sections.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    index === currentSection
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : index < currentSection
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.title}</span>
                  {index < currentSection && <Check className="w-4 h-4" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Basic Info Section */}
          {currentSection === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo URL
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="url"
                    value={formData.profilePhoto}
                    onChange={(e) => handleInputChange('profilePhoto', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="https://example.com/photo.jpg"
                  />
                  <button className="btn-secondary">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </button>
                </div>
                {formData.profilePhoto && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={formData.profilePhoto}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary-200"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills & Bio Section */}
          {currentSection === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Me / Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Tell us about yourself, your passions, and what makes you unique..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addSkill(e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Type a skill and press Enter (e.g., JavaScript, React, Design)"
                  />
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:bg-primary-200 rounded-full p-1 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Section */}
          {currentSection === 2 && (
            <div className="space-y-6 animate-fade-in">
              {formData.projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
                  {formData.projects.length > 1 && (
                    <button
                      onClick={() => removeProject(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  
                  <h3 className="font-medium text-gray-900 mb-4">Project {index + 1}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Project Title"
                    />
                    
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Project URL"
                    />
                  </div>
                  
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Project description..."
                  />
                  
                  <input
                    type="url"
                    value={project.image}
                    onChange={(e) => updateProject(index, 'image', e.target.value)}
                    className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Project image URL"
                  />
                </div>
              ))}
              
              <button
                onClick={addProject}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-primary-300 hover:text-primary-600 transition-all"
              >
                <Plus className="w-6 h-6 mx-auto mb-2" />
                Add Another Project
              </button>
            </div>
          )}

          {/* Education Section */}
          {currentSection === 3 && (
            <div className="space-y-6 animate-fade-in">
              {formData.education.map((edu, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Education {index + 1}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const newEducation = [...formData.education]
                        newEducation[index].institution = e.target.value
                        handleInputChange('education', newEducation)
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Institution Name"
                    />
                    
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => {
                        const newEducation = [...formData.education]
                        newEducation[index].year = e.target.value
                        handleInputChange('education', newEducation)
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Year (e.g., 2020-2024)"
                    />
                  </div>
                  
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEducation = [...formData.education]
                      newEducation[index].degree = e.target.value
                      handleInputChange('education', newEducation)
                    }}
                    className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Degree / Program"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Experience Section */}
          {currentSection === 4 && (
            <div className="space-y-6 animate-fade-in">
              {formData.experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Experience {index + 1}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const newExperience = [...formData.experience]
                        newExperience[index].company = e.target.value
                        handleInputChange('experience', newExperience)
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Company Name"
                    />
                    
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => {
                        const newExperience = [...formData.experience]
                        newExperience[index].duration = e.target.value
                        handleInputChange('experience', newExperience)
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Duration (e.g., Jan 2022 - Present)"
                    />
                  </div>
                  
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => {
                      const newExperience = [...formData.experience]
                      newExperience[index].position = e.target.value
                      handleInputChange('experience', newExperience)
                    }}
                    className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Job Title / Position"
                  />
                  
                  <textarea
                    value={exp.description}
                    onChange={(e) => {
                      const newExperience = [...formData.experience]
                      newExperience[index].description = e.target.value
                      handleInputChange('experience', newExperience)
                    }}
                    rows={3}
                    className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                currentSection === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="btn-primary"
            >
              <span>{currentSection === sections.length - 1 ? 'Generate Portfolio' : 'Next'}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}