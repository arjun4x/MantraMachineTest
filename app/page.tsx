import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import BookingForm from '@/components/BookingForm'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Gallery />
      <BookingForm />
      <Footer />
    </main>
  )
}



