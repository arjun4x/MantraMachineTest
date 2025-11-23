
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { useState } from 'react'
import {BookingFormData,bookingSchema} from '../Validation/validation';



export default function BookingForm() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      roomType: 'standard',
      specialRequests: '',
    },
  })

  const checkInDate = watch('checkIn')

  const onSubmit = async (data: BookingFormData) => {
    try {
      setMessage(null)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await axios.post(`${apiUrl}/api/bookings`, data)
      
      if (response.status === 201) {
        setMessage({ type: 'success', text: 'Booking submitted successfully! We will contact you soon.' })
        reset()
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit booking. Please try again.',
      })
    }
  }

  return (
    <section id="booking-form" className="py-24 px-4 bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700 rounded-full text-sm font-semibold mb-4 border border-teal-200">
            Reserve Your Stay
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Book Your Stay
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Fill out the form below and we'll get back to you to confirm your reservation
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                {...register('firstName')}
                type="text"
                id="firstName"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                {...register('lastName')}
                type="text"
                id="lastName"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                }`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone *
              </label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="checkIn" className="block text-sm font-semibold text-gray-700 mb-2">
                Check-in Date *
              </label>
              <input
                {...register('checkIn')}
                type="date"
                id="checkIn"
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.checkIn ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                }`}
              />
              {errors.checkIn && (
                <p className="mt-1 text-sm text-red-600">{errors.checkIn.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="checkOut" className="block text-sm font-semibold text-gray-700 mb-2">
                Check-out Date *
              </label>
              <input
                {...register('checkOut')}
                type="date"
                id="checkOut"
                min={checkInDate || new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.checkOut ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                }`}
              />
              {errors.checkOut && (
                <p className="mt-1 text-sm text-red-600">{errors.checkOut.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Guests *
              </label>
              <input
                {...register('guests', { valueAsNumber: true })}
                type="number"
                id="guests"
                min="1"
                max="10"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.guests ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                }`}
              />
              {errors.guests && (
                <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="roomType" className="block text-sm font-semibold text-gray-700 mb-2">
                Room Type *
              </label>
              <select
                {...register('roomType')}
                id="roomType"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-left-2 pl-8 ${
                  errors.roomType ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                }`}
              >
                <option value="standard">Standard Room</option>
                <option value="deluxe">Deluxe Room</option>
                <option value="suite">Suite</option>
                <option value="villa">Villa</option>
              </select>
              {errors.roomType && (
                <p className="mt-1 text-sm text-red-600">{errors.roomType.message}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-700 mb-2">
              Special Requests
            </label>
            <textarea
              {...register('specialRequests')}
              id="specialRequests"
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                errors.specialRequests ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
              }`}
              placeholder="Any special requests or preferences..."
            />
            {errors.specialRequests && (
              <p className="mt-1 text-sm text-red-600">{errors.specialRequests.message}</p>
            )}
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-xl border ${
                message.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Booking'
            )}
          </button>

        </form>
      </div>
    </section>
  )
}


