import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesGrid } from '@/components/sections/FeaturesGrid'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesGrid />
      <ProcessTimeline />
      <CTASection />
    </>
  )
}
