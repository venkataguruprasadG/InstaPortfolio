'use client'

import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary-500" />
          <span className="text-sm font-medium text-primary-700">AI-Powered Portfolio Generation</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
          Create Your Portfolio
          <br />
          <span className="text-gradient">in Seconds</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
          Choose from stunning templates, add your details, and generate a professional portfolio 
          and resume instantly. No design skills required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-slide-up delay-300">
          <button className="btn-primary group">
            <span>Browse Templates</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="btn-secondary group">
            <Globe className="w-4 h-4 mr-2" />
            <span>View Examples</span>
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 animate-slide-up delay-500">
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
            <Zap className="w-4 h-4 text-accent-500" />
            <span className="text-sm font-medium text-gray-700">Instant Generation</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
            <Globe className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-gray-700">Professional Templates</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
            <Sparkles className="w-4 h-4 text-secondary-500" />
            <span className="text-sm font-medium text-gray-700">Resume Included</span>
          </div>
        </div>
      </div>
    </section>
  )
}