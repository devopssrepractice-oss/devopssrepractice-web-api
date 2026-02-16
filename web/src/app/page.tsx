import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import SREMetrics from '@/components/sections/SREMetrics';
import TechStack from '@/components/sections/TechStack';
import LatestPosts from '@/components/sections/LatestPosts';
import LatestNews from '@/components/sections/LatestNews';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <ProcessTimeline />
        <SREMetrics />
        <TechStack />
        <LatestPosts />
        <LatestNews />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
