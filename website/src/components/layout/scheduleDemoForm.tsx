"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import Button from "../common/button"
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { allReduxSliceInfo, setShowScheduleDemoModal, setShowSuccessModal } from "../../features/reduxSlice"
import { sirzLogo } from "../../assets"
import SuccessModal from "./successModal"
import axios from "axios"
import { BASE_URL } from "../../utils"

export default function ScheduleDemoForm() {
  const dispatch = useAppDispatch()
  const { showScheduleDemoModal } = useAppSelector(allReduxSliceInfo)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    employees: "",
    country: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    dispatch(setShowScheduleDemoModal(true))
    console.log('formData', formData);
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.company || !formData.website || !formData.employees || !formData.country) {
     setError("All fields are required")
     return;
    }

     try {
          const response = await axios.post(`${BASE_URL}/api/chedule-demo`, formData);
          console.log('response', response);
          dispatch(setShowSuccessModal(true));
          setTimeout(() => {
              dispatch(setShowSuccessModal(false))
              dispatch(setShowScheduleDemoModal(false))
              setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  company: "",
                  website: "",
                  employees: "",
                  country: "",
              })
          }, 10000);
      } catch (error) {
          console.error('Error:', error);
          setError("Something went wrong")
      }
  }

  const handleCloseModal = () => {
    dispatch(setShowScheduleDemoModal(false))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!showScheduleDemoModal) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50">
      <div className="min-h-screen bg-gradient-to-br from-[#032247] via-[#2743b7] to-blue-300 flex items-center justify-center p-4">
        <div>
          <X onClick={handleCloseModal} size={40} className="text-5xl absolute top-4 right-4 cursor-pointer bg-white p-2 rounded-full" />
        </div>
      <div className="w-full max-w-4xl p-8 bg-white shadow-2xl  border-r-[0.6em] border-l-[0.6em] border-b-[0.2em] border-teal-400 rounded-3xl border-0 relative">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-lg blur-xl -z-10" />

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Let's get started</h1>
            <p className="text-gray-600">Schedule a demo with us to get started</p>
          </div>
          <div className="inline-flex items-center gap-1 text-2xl font-bold text-blue-600">
            <img src={sirzLogo} alt="" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First row: First name and Last name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First name *
              </label>
              <input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="h-12 border-gray-300 rounded-lg border border-gray-300 px-3 rounded-lg"
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last name *
              </label>
              <input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="h-12 border-gray-300 rounded-lg border border-gray-300 px-3 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Second row: Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12 border-gray-300 rounded-lg border border-gray-300 px-3 rounded-lg"
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone number *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-12 border-gray-300 rounded-lg border border-gray-300 px-3 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Third row: Company and Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="company" className="text-sm font-medium text-gray-700">
                Company name *
              </label>
              <input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="h-12 border-gray-300 rounded-lg border border-gray-300 px-3 rounded-lg"
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="website" className="text-sm font-medium text-gray-700">
                Website URL *
              </label>
              <input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="h-12 border-gray-300 rounded-lg border border-gray-300 px-3 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Fourth row: Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">Number of employees</label>
              <select 
              value={formData.employees} 
              onChange={(e) => handleInputChange("employees", e.target.value)}
              className="h-12 border-gray-300 rounded-lg bg-transparent border border-gray-300 px-3 rounded-lg"
              required>
                <option value="">Please select</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700">Country of company headquarters</label>
              <select 
              value={formData.country} 
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="h-12 border-gray-300 rounded-lg bg-transparent border border-gray-300 px-3 rounded-lg"
              required>
                <option value="">Please select</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
                <option value="germany">Germany</option>
                <option value="france">France</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

          <div className="pt-4">
            <Button
              text="Get demo"
              type="submit"
              onClick={() => {}}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors"
            />
          </div>
        </form>
        <SuccessModal 
        title="Thank you for requesting a demo!" 
        message="Our team will be in touch shortly to schedule your session. We can&apos;t wait to show you how our product can help you simplify your workflow" 
        buttonLabel="Okay, thanks!" />
      </div>
      </div>
    </div>
  )
}
