import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | DevOps SRE Practice',
  description: 'Privacy Policy for DevOps SRE Practice — how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">Privacy Policy</h1>
            <p className="text-lg text-slate-500">Last updated: 17 February 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              DevOps SRE Practice (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating at <strong>devopssrepractice.com</strong>, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website and use our services.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">2. Information We Collect</h2>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">2.1 Information You Provide</h3>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">We collect information you voluntarily provide when you:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Submit a contact form or request a quote</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Create an account or register on our platform</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Subscribe to our blog, newsletter, or news updates</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Communicate with us via email or other channels</span>
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              This may include your name, email address, company name, phone number, and any other details you choose to share.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">When you visit devopssrepractice.com, we may automatically collect:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>IP address and approximate geographic location</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Browser type, operating system, and device information</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Pages visited, time spent, and referral sources</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Cookies and similar tracking technologies</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">3. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">We use the information we collect to:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Provide, operate, and improve our DevOps and SRE consulting services</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Respond to inquiries, quote requests, and support needs</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Send you blog posts, news updates, and service announcements</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Analyse site usage to improve content and user experience</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Ensure the security and integrity of our platform</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">4. Cookies</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              We use essential cookies to maintain session state and authentication. We may also use analytics cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the website.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">5. Data Sharing &amp; Disclosure</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">We do not sell your personal information. We may share your data with:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span><strong>Service providers</strong> — hosting, email delivery, and analytics platforms that help us operate the site</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span><strong>Legal requirements</strong> — when required by law, regulation, or legal process</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span><strong>Business transfers</strong> — in connection with a merger, acquisition, or sale of assets</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">6. Data Security</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              We implement industry-standard security measures to protect your data, including encryption in transit (TLS/HTTPS), hashed passwords (bcrypt), and secure server infrastructure. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">7. Data Retention</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              We retain your personal data only for as long as necessary to fulfil the purposes described in this policy, or as required by law. Account information is retained while your account is active. You may request deletion of your data at any time by contacting us.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">8. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Access, correct, or delete your personal information</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Object to or restrict certain processing activities</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Withdraw consent at any time where processing is based on consent</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                <span>Lodge a complaint with a data protection authority</span>
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              To exercise any of these rights, please contact us at <a href="mailto:privacy@devopssrepractice.com" className="text-primary-600 hover:text-primary-700 font-medium">privacy@devopssrepractice.com</a>.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">9. Third-Party Links</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              Our website may contain links to third-party sites (e.g. GitHub, LinkedIn, Twitter/X). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">10. Children&apos;s Privacy</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will take steps to delete it promptly.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">11. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-100">12. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">If you have questions about this Privacy Policy, please contact us:</p>
            <div className="bg-slate-50 rounded-2xl p-6 mb-6">
              <p className="text-slate-700 text-lg font-medium mb-1">DevOps SRE Practice</p>
              <p className="text-slate-600 text-base">Email: <a href="mailto:privacy@devopssrepractice.com" className="text-primary-600 hover:text-primary-700 font-medium">privacy@devopssrepractice.com</a></p>
              <p className="text-slate-600 text-base">Website: <a href="https://devopssrepractice.com" className="text-primary-600 hover:text-primary-700 font-medium">devopssrepractice.com</a></p>
            </div>

            {/* Bottom nav */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                Home
              </Link>
              <Link href="/terms-of-service" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Terms of Service
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
