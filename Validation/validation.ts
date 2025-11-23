import {z} from 'zod';

export const bookingSchema = z.object({
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


export  type BookingFormData = z.infer<typeof bookingSchema>