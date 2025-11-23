'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface Booking {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  guests: number
  roomType: string
  specialRequests: string
  createdAt: string
}

// Zod schema for form validation
const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name is too long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1, 'At least 1 guest is required').max(10, 'Maximum 10 guests allowed'),
  roomType: z.enum(['standard', 'deluxe', 'suite', 'villa'], {
    message: 'Please select a valid room type',
  }),
  specialRequests: z.string().max(500, 'Special requests must be less than 500 characters').optional(),
}).refine((data) => {
  if (data.checkIn && data.checkOut) {
    return new Date(data.checkOut) > new Date(data.checkIn)
  }
  return true
}, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOut'],
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

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

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await axios.get(`${apiUrl}/api/bookings`)
      setBookings(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: BookingFormData) => {
    try {
      setFormSuccess(null)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await axios.post(`${apiUrl}/api/bookings`, data)
      
      if (response.status === 201) {
        setFormSuccess('Booking created successfully!')
        reset()
        setShowForm(false)
        await fetchBookings()
      }
    } catch (err: any) {
      setFormSuccess(err.response?.data?.message || 'Failed to create booking. Please try again.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatRoomType = (roomType: string) => {
    return roomType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Manage bookings and create new reservations
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {showForm ? 'Hide Form' : '+ New Booking'}
              </button>
              <Link
                href="/"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                ← Home
              </Link>
            </div>
          </div>
        </div>

        {/* Create Booking Form */}
        {showForm && (
          <div className="mb-8 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Booking</h2>
            
            {formSuccess && (
              <div className={`mb-6 p-4 rounded-xl ${
                formSuccess.includes('successfully') 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    id="firstName"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                      errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-in Date *
                  </label>
                  <input
                    {...register('checkIn')}
                    type="date"
                    id="checkIn"
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                      errors.checkOut ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                  />
                  {errors.checkOut && (
                    <p className="mt-1 text-sm text-red-600">{errors.checkOut.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
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

              <div>
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

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Creating...' : 'Create Booking'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset()
                    setShowForm(false)
                    setFormSuccess(null)
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bookings Table Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">All Bookings</h2>
              <button
                onClick={fetchBookings}
                disabled={loading}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Refreshing...' : '🔄 Refresh'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading bookings...</p>
            </div>
          ) : error ? (
            <div className="m-6 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-600 text-lg font-semibold">No bookings found.</p>
              <p className="text-gray-500 text-sm mt-2">Create your first booking using the form above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Guest Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Check-out
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Guests
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Room Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Special Requests
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Booked On
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking, index) => (
                    <tr 
                      key={booking.id} 
                      className={`hover:bg-teal-50 transition-colors duration-150 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {booking.firstName} {booking.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{booking.email}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatDate(booking.checkIn)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatDate(booking.checkOut)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-teal-100 text-teal-800">
                          {booking.guests}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800">
                          {formatRoomType(booking.roomType)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                        <div className="truncate" title={booking.specialRequests || '-'}>
                          {booking.specialRequests || <span className="text-gray-400">-</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(booking.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {!loading && bookings.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">{bookings.length}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">
                  {new Set(bookings.map(b => b.roomType)).size}
                </div>
                <div className="text-sm text-gray-600">Room Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {bookings.reduce((sum, b) => sum + b.guests, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Guests</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


