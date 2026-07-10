import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://theskitbit.com"),
  title: "Privacy Policy | Skitbit",
  description: "Skitbit's privacy policy covering data collection, processing, retention, and your rights under GDPR and CCPA.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://theskitbit.com/privacy-policy",
    title: "Privacy Policy | Skitbit",
    description: "Skitbit's privacy policy covering data collection, processing, retention, and your rights under GDPR and CCPA.",
  },
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-[-0.065em] sm:text-5xl">Privacy Policy</h1>
        <p className="mt-6 text-muted-foreground">Last updated: June 27, 2026</p>

        <div className="mt-12 space-y-8 text-base leading-8 text-foreground/80">

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">Overview</h2>
            <p>
              Skitbit International Group operates theskitbit.com and provides 3D product rendering, animation, and performance marketing services. This Privacy Policy describes how we collect, use, disclose, and otherwise handle personal information when you visit our website, contact us, or engage with our services.
            </p>
            <p className="mt-4">
              <strong>Jurisdiction:</strong> All matters relating to this Privacy Policy are governed by Indian law. Any disputes shall be resolved in courts located in India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              <strong>Information You Provide:</strong> When you contact us, request a quote, or engage our services, we collect your name, email address, company name, website URL, phone number, project details, and any other information you voluntarily share via contact forms, email, or WhatsApp.
            </p>
            <p className="mb-4">
              <strong>Information Collected Automatically:</strong> When you visit theskitbit.com, we automatically collect usage data through:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Meta Pixel:</strong> Tracks conversions and user behavior for advertising purposes</li>
              <li><strong>Google Ads Tracking:</strong> Tracks campaign performance and user interactions</li>
              <li><strong>Cookies & Technical Data:</strong> Device type, browser type, IP address, pages visited</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">2. Data Retention</h2>
            <p className="mb-4">We retain personal data according to the following schedule:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact & Project Inquiry Data:</strong> Retained for up to 1 year after project completion, then deleted</li>
              <li><strong>Project Files & Deliverables:</strong> Retained for 2-3 months after project completion unless you request extended storage (additional fees may apply)</li>
              <li><strong>WhatsApp Conversations:</strong> Not actively archived; become irrelevant after project completion</li>
              <li><strong>Meta Pixel & Google Ads Data:</strong> Managed by Meta and Google respectively (typically 90-180+ days)</li>
              <li><strong>Payment Records:</strong> Retained for accounting and tax purposes as required by Indian law (minimum 7 years)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use collected data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deliver 3D creative services and performance marketing consultations</li>
              <li>Communicate with you via email (official channel) or WhatsApp (informal only)</li>
              <li>Process payments and invoice for services rendered</li>
              <li>Improve website functionality and user experience</li>
              <li>Measure advertising effectiveness and optimize campaign performance</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-4">
              <strong>We do NOT:</strong> sell your personal data, share data outside the sub-processors listed below, or use your data for purposes unrelated to our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">4. Third-Party Services</h2>
            <p className="mb-4">Your information may be processed by the following sub-processors:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Vercel:</strong> Website hosting</li>
              <li><strong>Sanity CMS:</strong> Content management (blog)</li>
              <li><strong>Zoho Mail:</strong> Email service</li>
              <li><strong>Meta Pixel & WhatsApp:</strong> Conversion tracking and messaging (owned by Meta Platforms, Inc.)</li>
              <li><strong>Google Ads & Google Tag Manager:</strong> Performance tracking (owned by Google LLC)</li>
            </ul>
            <p className="mt-4">All sub-processors are contractually bound to protect your data and use it only for purposes specified by us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">5. GDPR & CCPA Rights</h2>
            <p className="mb-4">
              <strong>For EU/UK Clients (GDPR):</strong> You have the right to access, correct, or request deletion of your personal data; withdraw consent at any time; and lodge complaints with your local data protection authority. Submit requests to hello@theskitbit.com.
            </p>
            <p className="mb-4">
              <strong>For California Residents (CCPA):</strong> You have the right to know what personal information is collected, request deletion, and opt-out of data sales. Submit requests to hello@theskitbit.com.
            </p>
            <p>
              <strong>Important:</strong> While we honor these rights, all disputes and enforcement are subject to Indian jurisdiction and law. You may need to pursue claims in Indian courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">6. Cookies & Tracking</h2>
            <p className="mb-4">
              We use cookies and tracking pixels to measure advertising performance. You can control your cookie preferences through our cookie banner. You can also opt out of personalized advertising by visiting:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://www.facebook.com/ads/preferences" className="underline hover:opacity-70">Meta Ad Settings</a></li>
              <li><a href="https://myactivity.google.com/activitycontrols" className="underline hover:opacity-70">Google Ad Settings</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> hello@theskitbit.com<br />
              <strong>Website:</strong> theskitbit.com
            </p>
            <p className="mt-4">
              Requests will be addressed within 30 days where legally required.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground mb-4">8. Policy Updates</h2>
            <p>
              We may update this Privacy Policy at any time. Continued use of our website constitutes acceptance of updates.
            </p>
          </section>

        </div>
      </section>

      <Footer />
    </main>
  )
}
