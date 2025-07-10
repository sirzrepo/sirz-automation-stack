"use client"

import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function BrandBanner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])


  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
};

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-15 animate-pulse delay-1000"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-60 right-20 w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-500 opacity-25 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-60 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 opacity-20 animate-pulse delay-500"></div>

        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q150,50 300,100 T600,100"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M100,200 Q250,150 400,200 T700,200"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse delay-700"
          />
        </svg>
      </div>

      {/* Mouse Follower */}
      <div
        className="absolute w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-30 pointer-events-none transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading with Animation */}
          <div className="space-y-4">
            
                                <motion.h1 
                                    variants={itemVariants}
                                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
                                >
                                    Create Your{' '}
                                    <span className="relative inline-block">
                                        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400">
                                            Dream Brand
                                        </span>
                                        <span className="absolute bottom-3 left-0 w-full h-4 bg-white/20 -z-0 rounded-full blur-sm"></span>
                                    </span>{' '}
                                    with{' '}
                                    <span className="relative inline-block">
                                        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                            AI Power
                                        </span>
                                        <span className="absolute bottom-3 left-0 w-full h-4 bg-purple-400/20 -z-0 rounded-full blur-sm"></span>
                                    </span>
                                </motion.h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-1000">
            Brandcom is an AI-powered automation platform built to streamline branding, e-commerce, and digital
            marketing — all in one place.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up delay-1200">
            <button
              onClick={() => window.open("https://brandcom.sirz.co.uk/", "_blank")}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              Learn More →
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up delay-1400">
            {["AI Powered", "All-in-One Platform", "Easy to Use", "24/7 Support"].map((feature, index) => (
              <div
                key={feature}
                className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors duration-300 group"
                style={{ animationDelay: `${1600 + index * 200}ms` }}
              >
                <div className="p-1 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm md:text-base font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Floating Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-10 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-500"></div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1200 { animation-delay: 1200ms; }
        .delay-1400 { animation-delay: 1400ms; }
        .delay-1600 { animation-delay: 1600ms; }
        .delay-2000 { animation-delay: 2000ms; }
      `}</style>
    </div>
  )
}
