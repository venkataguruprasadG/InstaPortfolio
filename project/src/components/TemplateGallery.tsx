'use client'

import { useState } from 'react'
import { Eye, ArrowRight, Star, Palette } from 'lucide-react'
import { PortfolioTemplate } from '@/types'
import { templateData } from '@/data/templates'
import Image from 'next/image'

interface TemplateGalleryProps {
  onTemplateSelect: (template: PortfolioTemplate) => void
}

export function TemplateGallery({ onTemplateSelect }: TemplateGalleryProps) {
  const [filter, setFilter] = useState<string>('all')
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  const categories = ['all', 'creative', 'professional', 'minimal', 'tech']
  
  const filteredTemplates = filter === 'all' 
    ? templateData 
    : templateData.filter(template => template.category === filter)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our collection of professionally designed portfolio templates. 
            Each one is fully customizable and mobile-ready.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden card-hover"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Template Preview Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <Image
                  src={template.previewImage}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay on Hover */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex space-x-4">
                    <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => onTemplateSelect(template)}
                      className="bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{template.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Palette className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500 capitalize">{template.category}</span>
                  </div>
                  
                  <button
                    onClick={() => onTemplateSelect(template)}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm group"
                  >
                    Use This Design
                    <ArrowRight className="w-4 h-4 ml-1 inline group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Portfolios Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Premium Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}