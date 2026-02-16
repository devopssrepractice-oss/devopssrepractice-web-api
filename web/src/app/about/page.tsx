import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | DevOps SRE Practice',
  description: 'Learn about DevOps SRE Practice and our mission.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8">About Us</h1>
        
        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              We are dedicated to helping organizations master DevOps and SRE practices. 
              Our expert team provides consulting, training, and guidance to transform 
              your infrastructure and operations.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">What We Offer</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-xl font-semibold text-white mb-2">Consulting Services</h3>
                <p>Strategic guidance on implementing DevOps practices and SRE principles.</p>
              </li>
              <li>
                <h3 className="text-xl font-semibold text-white mb-2">Training Programs</h3>
                <p>Comprehensive training on modern DevOps tools and practices.</p>
              </li>
              <li>
                <h3 className="text-xl font-semibold text-white mb-2">Infrastructure Setup</h3>
                <p>Help setting up and optimizing your infrastructure and automation.</p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-lg leading-relaxed">
              Stay updated with the latest in DevOps and SRE. Subscribe to our newsletter 
              and follow us on social media for valuable insights and updates.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
