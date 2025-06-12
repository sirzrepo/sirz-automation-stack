"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "../../../components/common/ui/Button"
import { Person } from "../../../assets"

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      quote: "This chatbot changed the game for us.",
      description:
        "We went from missing messages after hours to closing sales while we slept. The setup was quick, the integration was smooth, and it feels like we hired a 24/7 sales rep — without the overhead.",
      name: "Grace Miller",
      title: "Founder, GlowEssence Skincare",
      image: Person,
    },
    {
      id: 2,
      quote: "Our conversion rates doubled overnight.",
      description:
        "The AI chatbot doesn't just respond to customers—it understands them. It's like having our best salesperson available 24/7, handling objections and closing deals even when we're not there.",
      name: "Marcus Johnson",
      title: "CEO, TechFlow Solutions",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      quote: "Customer satisfaction has never been higher.",
      description:
        "Our customers love the instant responses and personalized recommendations. The chatbot has transformed our customer service from reactive to proactive, and our team can focus on strategic growth.",
      name: "Sarah Chen",
      title: "Director of Operations, StyleHub",
      image: "https://images.unsplash.com/photo-1618509681862-58a29bf6eee6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJsYWNrJTIwZmVtYWxlfGVufDB8fDB8fHww",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const previousTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentTestimonial]

  return (
    <div className=" bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="lg:w-[80%] w-[95%] mx-auto pt-20">
        {/* Main Testimonial Card */}
        <div className="bg-white/10  backdrop-blur-sm rounded-lg p-8 mb-8 border border-white/20 shadow-2xl">
          <div className="md:grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Side - Image */}
            <div className="col-span-2 max-md:pb-6 max-md:flex items-center justify-center">
              <div className="relative">
                <img
                  src={current.image || "/placeholder.svg"}
                  alt={current.name}
                  className="lg:h-[550px] h-[350px] w-full object-cover object-top md:rounded-lg rounded-full shadow-lg"
                />
              </div>
            </div>

            {/* Right Side - Testimonial Content */}
            <div className="bg-white rounded-lg p-8 col-span-3 lg:h-[550px] lg:p-10 shadow-lg">
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 leading-tight">"{current.quote}"</h2>

                <p className="text-base py-8 lg:text-xl text-gray-600 leading-relaxed">{current.description}</p>

                <div className="">
                  <p className="text-base font-semibold text-gray-800">
                    — {current.name}, {current.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={previousTestimonial}
            variant="outline"
            size="lg"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          <Button
            onClick={nextTestimonial}
            size="lg"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-200"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonial ? "bg-white shadow-lg" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
