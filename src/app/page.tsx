import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { DmaitMethod } from '@/components/sections/DmaitMethod'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <DmaitMethod />
      <Testimonials />
      <ContactSection />
    </main>
  )
}
