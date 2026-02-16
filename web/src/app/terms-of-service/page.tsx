import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | DevOps SRE Practice',
  description: 'Terms of Service for DevOps SRE Practice — the rules governing your use of our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 hero-gradient overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors mb-8">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">Terms of Service</h1>
            <p className="text-lg text-slate-500">Last updated: 17 February 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              By accessing or using the DevOps SRE Practice website at <strong>devopssrepractice.com</strong> (&quot;the Site&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree with any part of these Terms, you must not use the Site.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">2. Description of Services</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">
              DevOps SRE Practice provides professional consulting services in the areas of:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Site Reliability Engineering (SRE) strategy and implementation</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>CI/CD pipeline design and automation</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Infrastructure as Code (IaC) with Terraform, Kubernetes, and cloud platforms</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Monitoring, observability, and incident management</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>DevOps transformation and platform engineering</span>
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              The Site also hosts a blog, news section, and informational content related to DevOps and SRE best practices.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">3. User Accounts</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              Certain features of the Site may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to provide accurate and complete information when creating an account and to notify us immediately of any unauthorised use.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">4. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              All content on the Site — including text, graphics, logos, code snippets, blog posts, news articles, and design elements — is the property of DevOps SRE Practice or its content creators and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without prior written consent.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">5. Content Publishing</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">If you contribute content through our platform (e.g. as an admin or author), you agree that:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>You will not publish content that is unlawful, defamatory, or infringes on third-party rights</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>You grant us a non-exclusive licence to display, distribute, and promote the content on the Site</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>You are solely responsible for the accuracy and legality of your contributions</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">6. Acceptable Use</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">You agree not to:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Use the Site for any illegal or unauthorised purpose</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Attempt to gain unauthorised access to any part of the Site or its infrastructure</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Transmit malware, viruses, or other harmful code</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Scrape, crawl, or harvest data from the Site without permission</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Interfere with the proper functioning of the Site</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">7. Consulting Services</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              Any consulting or professional services provided by DevOps SRE Practice are subject to a separate service agreement or statement of work. The content on this Site is for informational purposes only and does not constitute professional advice. Always consult a qualified professional for specific technical or business decisions.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">8. Disclaimer of Warranties</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              The Site and its content are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, whether express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components. Blog posts, tutorials, and code examples are provided for educational purposes and should be tested before use in production environments.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">9. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              To the fullest extent permitted by law, DevOps SRE Practice and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site, including but not limited to loss of data, revenue, or business opportunities, even if advised of the possibility of such damages.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">10. Indemnification</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              You agree to indemnify, defend, and hold harmless DevOps SRE Practice from and against any claims, liabilities, damages, losses, and expenses arising from your use of the Site or your violation of these Terms.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">11. Third-Party Links</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              The Site may contain links to third-party websites or services (e.g. GitHub, cloud providers, monitoring tools). We do not endorse or assume responsibility for any third-party content, products, or services. Your use of third-party sites is governed by their respective terms and policies.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">12. Termination</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              We reserve the right to suspend or terminate your access to the Site at any time, with or without cause, and with or without notice. Upon termination, your right to use the Site ceases immediately.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">13. Governing Law</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which DevOps SRE Practice operates, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the courts of that jurisdiction.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">14. Changes to These Terms</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              We may revise these Terms at any time by posting updated Terms on this page. The &quot;Last updated&quot; date at the top will reflect the most recent revision. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">15. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">If you have questions about these Terms of Service, please contact us:</p>
            <div className="bg-slate-50 rounded-2xl p-6 mb-6">
              <p className="text-slate-700 text-lg font-medium mb-1">DevOps SRE Practice</p>
              <p className="text-slate-600 text-base">Email: <a href="mailto:legal@devopssrepractice.com" className="text-primary-600 hover:text-primary-700 font-medium">legal@devopssrepractice.com</a></p>
              <p className="text-slate-600 text-base">Website: <a href="https://devopssrepractice.com" className="text-primary-600 hover:text-primary-700 font-medium">devopssrepractice.com</a></p>
            </div>

            {/* Bottom nav */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
              <Link href="/privacy-policy" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                Privacy Policy
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Home
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
