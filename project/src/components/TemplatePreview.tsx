'use client'

import { ArrowLeft, Check, Palette, Monitor, Smartphone, Globe } from 'lucide-react'
import { PortfolioTemplate } from '@/types'
import Image from 'next/image'

interface TemplatePreviewProps {
  template: PortfolioTemplate
  onUseTemplate: () => void
  onBack: () => void
}

export function TemplatePreview({ template, onUseTemplate, onBack }: TemplatePreviewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Templates</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-gray-600">
                <Monitor className="w-5 h-5" />
                <span className="text-sm">Desktop Preview</span>
              </div>
              
              <button
                onClick={onUseTemplate}
                className="btn-primary"
              >
                <Check className="w-4 h-4 mr-2" />
                Use This Template
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Template Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{template.name}</h2>
              <p className="text-gray-600 mb-6">{template.description}</p>
              
              {/* Template Features */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900">Features Include:</h3>
                <ul className="space-y-2">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-accent-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Template Stats */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Category</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">{template.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rating</span>
                  <span className="text-sm font-medium text-gray-900">{template.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Used by</span>
                  <span className="text-sm font-medium text-gray-900">{template.usageCount}+ people</span>
                </div>
              </div>

              {/* Color Palette */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Palette className="w-4 h-4 mr-2" />
                  Color Palette
                </h4>
                <div className="flex space-x-2">
                  {template.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Template Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Preview Controls */}
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-mono">portfolio.yourname.com</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-5 h-5 text-gray-400" />
                    <Smartphone className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Template Content */}
              <div className="relative h-[600px] lg:h-[800px] overflow-auto">
                <Image
                  src={template.fullPreviewImage}
                  alt={`${template.name} full preview`}
                  fill
                  className="object-cover object-top"
                />
                
                {/* Interactive Elements Overlay */}
                <div className="absolute inset-0 bg-transparent">
                  {/* Simulated clickable areas */}
                  <div className="absolute top-20 right-8 w-32 h-10 bg-primary-500/20 rounded border-2 border-primary-500 animate-pulse"></div>
                  <div className="absolute top-1/2 left-8 w-40 h-12 bg-secondary-500/20 rounded border-2 border-secondary-500 animate-pulse delay-500"></div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-500">
                This template includes a matching resume design
              </div>
              
              <button
                onClick={onUseTemplate}
                className="btn-primary text-lg px-8 py-4"
              >
                Customize This Template
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}